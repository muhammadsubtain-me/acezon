'use client';

import { useState, useRef, useCallback, useMemo, type DragEvent, type FormEvent } from 'react';
import { Send, Upload, X, FileText, Loader as Loader2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Select } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Progress } from '@/components/ui/progress';
import { createSupabaseBrowserClient } from '@/shared/supabase/browser';
import { countryCodes } from '@/shared/data/countries';
import {
  acceptedFileExtensions,
  maxFiles,
} from '@/features/orders/config/order.config';
import { getFileRejection, toAttachmentUploadMessage } from '@/features/orders/validation/order-file-validation';
import { INQUIRY_FILES_BUCKET } from '@/features/orders/services/inquiry-attachments';
import { siteInfo } from '@/shared/config/site';
import { cn } from '@/lib/utils';

type FieldErrors = Record<string, string>;

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  path: string;
}

const SERVICE_OPTIONS = [
  { value: 'essay', label: 'Essay Writing' },
  { value: 'assignment', label: 'Assignment' },
  { value: 'proofread', label: 'Proofreading & Editing' },
  { value: 'other', label: 'Custom / Other' },
];

function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function OrderForm() {
  const supabase = createSupabaseBrowserClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [contactRaw, setContactRaw] = useState('');
  const [countryIso, setCountryIso] = useState('pk');
  const [serviceId, setServiceId] = useState('');
  const [customService, setCustomService] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const isEmailInput = useMemo(() => contactRaw.includes('@'), [contactRaw]);
  const isOther = serviceId === 'other';
  const countryOptions = useMemo(
    () => countryCodes.map((c) => ({ value: c.iso, label: `${c.dial} ${c.name}` })),
    [],
  );

  const resetForm = useCallback(() => {
    setContactRaw('');
    setServiceId('');
    setCustomService('');
    setDeadline('');
    setDescription('');
    setFiles([]);
    setFieldErrors({});
    setGeneralError(null);
  }, []);

  const handleFileSelect = useCallback(async (selected: FileList | null) => {
    if (!selected || selected.length === 0) return;
    setGeneralError(null);

    const incoming = Array.from(selected);
    const rejections: string[] = [];
    const accepted: File[] = [];

    for (const file of incoming) {
      const reason = getFileRejection({ name: file.name, size: file.size, type: file.type });
      if (reason) rejections.push(reason);
      else accepted.push(file);
    }

    if (rejections.length > 0) {
      setFieldErrors((prev) => ({ ...prev, attachments: rejections.join(', ') }));
    } else {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.attachments;
        return next;
      });
    }

    const room = maxFiles - files.length;
    const toUpload = accepted.slice(0, room);
    if (accepted.length > room) {
      setFieldErrors((prev) => ({
        ...prev,
        attachments: `You can attach up to ${maxFiles} files only.`,
      }));
    }

    if (toUpload.length === 0) return;

    setUploading(true);
    try {
      const res = await fetch('/api/create-upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: toUpload.map((f) => ({ name: f.name, size: f.size, type: f.type })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not prepare file upload.');

      const uploads: { path: string; token: string }[] = data.uploads;
      const completed: UploadedFile[] = [];

      for (let i = 0; i < toUpload.length; i++) {
        const file = toUpload[i];
        const { path, token } = uploads[i];
        const { error: upErr } = await supabase.storage
          .from(INQUIRY_FILES_BUCKET)
          .uploadToSignedUrl(path, token, file);

        if (upErr) throw new Error(toAttachmentUploadMessage(upErr));
        completed.push({ name: file.name, size: file.size, type: file.type, path });
      }

      setFiles((prev) => [...prev, ...completed].slice(0, maxFiles));
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.attachments;
        return next;
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'File upload failed.';
      setFieldErrors((prev) => ({ ...prev, attachments: msg }));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [files.length, supabase]);

  const handleRemoveFile = useCallback(async (path: string) => {
    setFiles((prev) => prev.filter((f) => f.path !== path));
    try {
      await fetch('/api/cleanup-uploads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paths: [path] }),
      });
    } catch {
      // best-effort cleanup
    }
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    if (submitting) return;
    setSubmitting(true);

    try {
      const selectedCountry = countryCodes.find((c) => c.iso === countryIso);
      const contactValue = isEmailInput
        ? contactRaw.trim()
        : `${selectedCountry?.dial || ''} ${contactRaw.trim()}`.trim();

      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_raw: contactValue,
          country_hints: [countryIso],
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          service_id: serviceId,
          custom_service: isOther ? customService.trim() : '',
          deadline,
          description: description.trim(),
          attachments: files.map((f) => f.path),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors as FieldErrors);
          const firstErr = Object.values(data.errors as FieldErrors)[0];
          if (firstErr) setGeneralError(firstErr);
        } else if (data.error) {
          setGeneralError(data.error);
        } else {
          setGeneralError('Something went wrong. Please try again.');
        }
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      resetForm();
    } catch {
      setGeneralError('A connection error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-surface-lvl2 border border-border-lvl2 p-8 sm:p-10 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="mt-5 text-xl font-extrabold text-text-main">Request Submitted!</h3>
        <p className="mt-2 text-sm text-text-muted leading-relaxed max-w-md mx-auto">
          Thank you. Our team has received your request and will reach out shortly
          {isEmailInput ? ' via email' : ' on WhatsApp'} to confirm the details and next steps.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => setSuccess(false)} variant="default">
            Submit Another Request
          </Button>
          <a
            href={`https://wa.me/${siteInfo.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-lvl3 bg-surface-lvl2 text-text-main text-sm font-semibold px-4 h-10 shadow-sm hover:bg-surface-lvl1 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-500" />
            Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const selectedCountry = countryCodes.find((c) => c.iso === countryIso);

  return (
    <div className="rounded-2xl bg-surface-lvl2 border border-border-lvl2 shadow-md overflow-hidden">
      <div className="p-6 sm:p-7 border-b border-border-lvl2 bg-surface-lvl1">
        <h3 className="text-xl font-extrabold text-text-main">Get a Free Quote</h3>
        <p className="mt-1 text-sm text-text-muted">
          Fill in the details below and we will get back to you within minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
        {generalError && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <div>
              <AlertTitle>Please review the form</AlertTitle>
              <AlertDescription>{generalError}</AlertDescription>
            </div>
          </Alert>
        )}

        {/* Contact */}
        <div className="space-y-2">
          <Label htmlFor="contact">Email or WhatsApp Number</Label>
          {isEmailInput ? (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-subtle">
                <Mail className="w-4 h-4" />
              </div>
              <Input
                id="contact"
                type="text"
                placeholder="you@example.com"
                value={contactRaw}
                onChange={(e) => setContactRaw(e.target.value)}
                className="pl-10"
                autoComplete="email"
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="shrink-0 w-36">
                <Select
                  value={countryIso}
                  onValueChange={setCountryIso}
                  options={countryOptions}
                  className="px-2.5 text-sm"
                  aria-label="Country code"
                />
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-subtle">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="300 1234567"
                  value={contactRaw}
                  onChange={(e) => setContactRaw(e.target.value)}
                  className="pl-10"
                  autoComplete="tel-national"
                />
              </div>
            </div>
          )}
          <p className="text-xs text-text-subtle">
            {isEmailInput
              ? 'We will contact you by email.'
              : `We will reach out on WhatsApp at ${selectedCountry?.dial} ${contactRaw || '…'}`}
          </p>
          {fieldErrors.contact && (
            <p className="text-xs font-semibold text-red-600">{fieldErrors.contact}</p>
          )}
        </div>

        {/* Service */}
        <div className="space-y-2">
          <Label htmlFor="service">Service Type</Label>
          <Select
            id="service"
            value={serviceId}
            onValueChange={setServiceId}
            options={SERVICE_OPTIONS}
            placeholder="Select a service..."
            error={!!fieldErrors.serviceId}
          />
          {fieldErrors.serviceId && (
            <p className="text-xs font-semibold text-red-600">{fieldErrors.serviceId}</p>
          )}
        </div>

        {/* Custom service */}
        {isOther && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <Label htmlFor="custom-service">Describe Your Service</Label>
            <Input
              id="custom-service"
              placeholder="e.g. Dissertation chapter, research proposal…"
              value={customService}
              onChange={(e) => setCustomService(e.target.value)}
              error={!!fieldErrors.customService}
            />
            {fieldErrors.customService && (
              <p className="text-xs font-semibold text-red-600">{fieldErrors.customService}</p>
            )}
          </div>
        )}

        {/* Deadline */}
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            id="deadline"
            min={todayISO()}
            value={deadline}
            onValueChange={setDeadline}
            error={!!fieldErrors.deadline}
          />
          {fieldErrors.deadline && (
            <p className="text-xs font-semibold text-red-600">{fieldErrors.deadline}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Assignment Details</Label>
          <Textarea
            id="description"
            placeholder="Describe your assignment — topic, word count, formatting style, key requirements…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            error={!!fieldErrors.description}
          />
          <div className="flex items-center justify-between">
            {fieldErrors.description ? (
              <p className="text-xs font-semibold text-red-600">{fieldErrors.description}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-text-subtle">{description.trim().length} chars</span>
          </div>
        </div>

        {/* File attachments */}
        <div className="space-y-2">
          <Label>Attachments <span className="font-normal text-text-subtle">(optional, up to {maxFiles} files, 10 MB each)</span></Label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-colors',
              dragOver
                ? 'border-primary bg-primary-light/40'
                : 'border-border-lvl3 hover:border-primary/50 hover:bg-surface-lvl1',
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptedFileExtensions}
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-3 py-3 px-4 w-full">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <p className="text-xs font-semibold text-text-muted">Uploading attachment…</p>
                <Progress value={65} className="w-full max-w-xs h-1.5" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 py-2">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-text-main">
                  Click to upload or drag &amp; drop
                </p>
                <p className="text-xs text-text-subtle">PDF, DOC, DOCX, PPT, XLS, JPG, PNG, TXT, CSV</p>
              </div>
            )}
          </div>

          {files.length > 0 && (
            <ul className="space-y-2">
              {files.map((f) => (
                <li
                  key={f.path}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-lvl1 border border-border-lvl2"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-text-main truncate">{f.name}</p>
                    <p className="text-[11px] text-text-subtle">{formatBytes(f.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleRemoveFile(f.path); }}
                    className="p-1.5 rounded-md text-text-subtle hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    aria-label={`Remove ${f.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {fieldErrors.attachments && (
            <p className="text-xs font-semibold text-red-600">{fieldErrors.attachments}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 text-base"
          isLoading={submitting}
          disabled={uploading}
        >
          <Send className="w-4 h-4 mr-1" />
          Submit Request
        </Button>

        <p className="text-center text-xs text-text-subtle">
          By submitting, you agree to be contacted regarding your request. Your details stay private.
        </p>
      </form>
    </div>
  );
}
