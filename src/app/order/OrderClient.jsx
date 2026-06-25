'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, Paperclip, X, FileText, Image } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageHero from '@/components/PageHero';
import { domains, services } from '@/lib/data';

// ─── Constants (outside component so they're not recreated on every render) ──

const COUNTRY_CODES = [
  { iso: 'pk', dial: '+92',  name: 'Pakistan'       },
  { iso: 'us', dial: '+1',   name: 'United States'  },
  { iso: 'gb', dial: '+44',  name: 'United Kingdom' },
  { iso: 'ca', dial: '+1',   name: 'Canada'         },
  { iso: 'au', dial: '+61',  name: 'Australia'      },
  { iso: 'ae', dial: '+971', name: 'UAE'            },
  { iso: 'sa', dial: '+966', name: 'Saudi Arabia'   },
  { iso: 'in', dial: '+91',  name: 'India'          },
  { iso: 'de', dial: '+49',  name: 'Germany'        },
  { iso: 'fr', dial: '+33',  name: 'France'         },
  { iso: 'nl', dial: '+31',  name: 'Netherlands'    },
  { iso: 'nz', dial: '+64',  name: 'New Zealand'    },
  { iso: 'za', dial: '+27',  name: 'South Africa'   },
  { iso: 'eg', dial: '+20',  name: 'Egypt'          },
  { iso: 'bd', dial: '+880', name: 'Bangladesh'     },
  { iso: 'lk', dial: '+94',  name: 'Sri Lanka'      },
  { iso: 'it', dial: '+39',  name: 'Italy'          },
  { iso: 'es', dial: '+34',  name: 'Spain'          },
  { iso: 'pt', dial: '+351', name: 'Portugal'       },
  { iso: 'be', dial: '+32',  name: 'Belgium'        },
  { iso: 'ch', dial: '+41',  name: 'Switzerland'    },
  { iso: 'at', dial: '+43',  name: 'Austria'        },
  { iso: 'se', dial: '+46',  name: 'Sweden'         },
  { iso: 'no', dial: '+47',  name: 'Norway'         },
  { iso: 'dk', dial: '+45',  name: 'Denmark'        },
  { iso: 'fi', dial: '+358', name: 'Finland'        },
  { iso: 'pl', dial: '+48',  name: 'Poland'         },
  { iso: 'cz', dial: '+420', name: 'Czech Republic' },
  { iso: 'ro', dial: '+40',  name: 'Romania'        },
  { iso: 'hu', dial: '+36',  name: 'Hungary'        },
  { iso: 'gr', dial: '+30',  name: 'Greece'         },
  { iso: 'ie', dial: '+353', name: 'Ireland'        },
  { iso: 'ru', dial: '+7',   name: 'Russia'         },
  { iso: 'ua', dial: '+380', name: 'Ukraine'        },
  { iso: 'tr', dial: '+90',  name: 'Turkey'         },
  { iso: 'qa', dial: '+974', name: 'Qatar'          },
  { iso: 'kw', dial: '+965', name: 'Kuwait'         },
  { iso: 'bh', dial: '+973', name: 'Bahrain'        },
  { iso: 'om', dial: '+968', name: 'Oman'           },
  { iso: 'jo', dial: '+962', name: 'Jordan'         },
  { iso: 'lb', dial: '+961', name: 'Lebanon'        },
  { iso: 'iq', dial: '+964', name: 'Iraq'           },
  { iso: 'ir', dial: '+98',  name: 'Iran'           },
  { iso: 'il', dial: '+972', name: 'Israel'         },
  { iso: 'cn', dial: '+86',  name: 'China'          },
  { iso: 'jp', dial: '+81',  name: 'Japan'          },
  { iso: 'kr', dial: '+82',  name: 'South Korea'    },
  { iso: 'sg', dial: '+65',  name: 'Singapore'      },
  { iso: 'my', dial: '+60',  name: 'Malaysia'       },
  { iso: 'id', dial: '+62',  name: 'Indonesia'      },
  { iso: 'ph', dial: '+63',  name: 'Philippines'    },
  { iso: 'th', dial: '+66',  name: 'Thailand'       },
  { iso: 'vn', dial: '+84',  name: 'Vietnam'        },
  { iso: 'np', dial: '+977', name: 'Nepal'          },
  { iso: 'af', dial: '+93',  name: 'Afghanistan'    },
  { iso: 'kz', dial: '+7',   name: 'Kazakhstan'     },
  { iso: 'uz', dial: '+998', name: 'Uzbekistan'     },
  { iso: 'hk', dial: '+852', name: 'Hong Kong'      },
  { iso: 'tw', dial: '+886', name: 'Taiwan'         },
  { iso: 'mm', dial: '+95',  name: 'Myanmar'        },
  { iso: 'ng', dial: '+234', name: 'Nigeria'        },
  { iso: 'ke', dial: '+254', name: 'Kenya'          },
  { iso: 'gh', dial: '+233', name: 'Ghana'          },
  { iso: 'tz', dial: '+255', name: 'Tanzania'       },
  { iso: 'ug', dial: '+256', name: 'Uganda'         },
  { iso: 'et', dial: '+251', name: 'Ethiopia'       },
  { iso: 'dz', dial: '+213', name: 'Algeria'        },
  { iso: 'ma', dial: '+212', name: 'Morocco'        },
  { iso: 'tn', dial: '+216', name: 'Tunisia'        },
  { iso: 'sd', dial: '+249', name: 'Sudan'          },
  { iso: 'ly', dial: '+218', name: 'Libya'          },
  { iso: 'mx', dial: '+52',  name: 'Mexico'         },
  { iso: 'br', dial: '+55',  name: 'Brazil'         },
  { iso: 'ar', dial: '+54',  name: 'Argentina'      },
  { iso: 'co', dial: '+57',  name: 'Colombia'       },
  { iso: 'cl', dial: '+56',  name: 'Chile'          },
  { iso: 've', dial: '+58',  name: 'Venezuela'      },
  { iso: 'pe', dial: '+51',  name: 'Peru'           },
  { iso: 'jm', dial: '+1',   name: 'Jamaica'        },
];

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'text/plain', 'text/csv',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES     = 5;

const INITIAL_FORM = {
  name: '', countryIso: 'pk', phone: '',
  domainId: '', serviceId: '', customService: '',
  subject: '', description: '',
};

// ─── Select wrapper (styled native select) ───────────────────────────────────

function Select({ className = '', children, ...props }) {
  return (
    <div className="relative w-full">
      <select
        className={`flex w-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 pr-10 text-sm text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-border-focus)] disabled:cursor-not-allowed disabled:opacity-50 rounded-xl appearance-none cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-text-muted)]">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}

// ─── Inner form component (uses useSearchParams) ──────────────────────────────

function OrderForm() {
  const searchParams    = useSearchParams();
  const serviceQuery    = searchParams.get('service');
  const domainQuery     = searchParams.get('domain');

  const [formData,     setFormData]     = useState(INITIAL_FORM);
  const [dialSearch,   setDialSearch]   = useState('');
  const [dialOpen,     setDialOpen]     = useState(false);
  const [attachments,  setAttachments]  = useState([]);
  const [dragOver,     setDragOver]     = useState(false);
  const [fileError,    setFileError]    = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);
  const [submitError,  setSubmitError]  = useState('');
  const [errors,       setErrors]       = useState({});

  const fileInputRef = useRef(null);
  const dialRef      = useRef(null);

  const selectedCountry   = COUNTRY_CODES.find(c => c.iso === formData.countryIso) ?? COUNTRY_CODES[0];
  const filteredCountries = COUNTRY_CODES
    .filter(c =>
      c.name.toLowerCase().includes(dialSearch.toLowerCase()) ||
      c.dial.includes(dialSearch)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  // Close dial dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dialRef.current && !dialRef.current.contains(e.target)) setDialOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Sync URL query params → form fields
  useEffect(() => {
    if (serviceQuery) {
      const s = services.find(x => x.id === serviceQuery);
      if (s) setFormData(prev => ({ ...prev, serviceId: s.id }));
    }
    if (domainQuery) {
      const d = domains.find(x => x.id === domainQuery);
      if (d) setFormData(prev => ({ ...prev, domainId: d.id }));
    }
  }, [serviceQuery, domainQuery]);

  // ─── File handling ──────────────────────────────────────────────────────────

  const processFiles = (incoming) => {
    setFileError('');
    const valid = [];
    for (const file of incoming) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setFileError(`"${file.name}" is not a supported file type.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`"${file.name}" exceeds the 10 MB limit.`);
        continue;
      }
      valid.push(file);
    }
    setAttachments(prev => {
      const combined = [...prev, ...valid];
      if (combined.length > MAX_FILES) {
        setFileError(`You can attach up to ${MAX_FILES} files only.`);
        return combined.slice(0, MAX_FILES);
      }
      return combined;
    });
  };

  const handleFileInput = (e) => processFiles(Array.from(e.target.files));
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(Array.from(e.dataTransfer.files));
  };
  const removeFile  = (idx) => setAttachments(prev => prev.filter((_, i) => i !== idx));
  const formatBytes = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // ─── Validation & submit ────────────────────────────────────────────────────

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2)
      errs.name = 'Name must be at least 2 characters.';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 6)
      errs.phone = 'Please enter a valid phone / WhatsApp number.';
    if (!formData.domainId)
      errs.domainId = 'Please select your academic domain.';
    if (!formData.serviceId) {
      errs.serviceId = 'Please select a service type.';
    } else if (formData.serviceId === 'other' && !formData.customService.trim()) {
      errs.customService = 'Please describe your service.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 2)
      errs.subject = 'Please enter your subject / course name.';
    if (!formData.description.trim() || formData.description.trim().length < 10)
      errs.description = 'Description must be at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      // 1. Upload attachments to Supabase storage
      const uploadedUrls = [];
      for (const file of attachments) {
        const ext      = file.name.split('.').pop();
        const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('inquiry-files')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from('inquiry-files')
          .getPublicUrl(filePath);
        uploadedUrls.push(urlData.publicUrl);
      }

      // 2. Insert inquiry with attachment URLs
      const { error } = await supabase.from('inquiries').insert({
        submitted_at:   new Date().toISOString(),
        name:           formData.name.trim(),
        phone:          formData.phone.trim(),
        country_dial:   selectedCountry.dial,
        country_iso:    formData.countryIso,
        country_name:   selectedCountry.name,
        domain_id:      formData.domainId,
        service_id:     formData.serviceId,
        custom_service: formData.customService.trim(),
        subject:        formData.subject.trim(),
        description:    formData.description.trim(),
        status:         'new',
        claimed_by:     null,
        claimed_at:     null,
        completed_at:   null,
        notes:          '',
        attachments:    uploadedUrls,
      });
      if (error) throw error;
      setIsSubmitted(true);
      setAttachments([]);
    } catch (err) {
      console.error('Order submit error:', err);
      setSubmitError('Something went wrong while submitting your request. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData(INITIAL_FORM);
    setAttachments([]);
    setFileError('');
    setSubmitError('');
    setErrors({});
  };

  const selectedServiceObj = services.find(s => s.id === formData.serviceId);

  return (
    <Card className="p-5 md:p-7 lg:p-8 xl:p-10 3xl:p-12 bg-[var(--color-surface-2)] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">

      {/* ── Success state ── */}
      {isSubmitted ? (
        <div className="text-center py-10 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
            ✓
          </div>
          <h3 className="font-display text-2xl font-bold mb-3 text-[var(--color-text-heading)]">
            Order Request Received!
          </h3>
          <p className="text-[var(--color-text-muted)] text-[15px] leading-relaxed max-w-md mx-auto mb-8">
            Thank you, <strong className="text-white">{formData.name}</strong>. Our expert support team has received your request for <strong className="text-white">{formData.subject}</strong> ({formData.serviceId === 'other' ? formData.customService : (selectedServiceObj?.name || 'General Help')}) and is matching you with a specialist.
          </p>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[var(--color-text-faint)] max-w-sm mx-auto mb-8">
            We will reach out to you on <span className="text-white font-semibold">{selectedCountry.dial} {formData.phone}</span> within 15 minutes.
          </div>
          <Button onClick={resetForm}>Place Another Order</Button>
        </div>

      ) : (

        /* ── Form ── */
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="flex flex-col gap-1.5">
              <Input
                required
                placeholder="Name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                }}
                className={errors.name ? 'border-red-500/50 focus:border-red-500' : ''}
              />
              {errors.name && <span className="text-xs text-red-400 pl-1">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className={`flex rounded-xl border transition-all overflow-visible ${
                errors.phone ? 'border-red-500/50' : 'border-[var(--color-border)] focus-within:border-[var(--color-border-focus)]'
              }`}>
                {/* Country Code Dropdown */}
                <div ref={dialRef} className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setDialOpen(o => !o)}
                    className="h-full flex items-center gap-2 pl-3 pr-2 bg-white/[0.04] border-r border-[var(--color-border)] rounded-l-xl hover:bg-white/[0.07] transition-colors cursor-pointer"
                  >
                    <img
                      src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`}
                      srcSet={`https://flagcdn.com/w40/${selectedCountry.iso}.png 2x`}
                      width="20" height="14"
                      alt={selectedCountry.name}
                      className="rounded-[2px] object-cover"
                    />
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">{selectedCountry.dial}</span>
                    <ChevronDown className={`w-3 h-3 text-[var(--color-text-muted)] transition-transform ${dialOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dialOpen && (
                    <div className="absolute top-full left-0 mt-1 z-50 w-56 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
                      <div className="p-2 border-b border-[var(--color-border)]">
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search country..."
                          value={dialSearch}
                          onChange={(e) => setDialSearch(e.target.value)}
                          className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-xs text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)]"
                        />
                      </div>
                      <div className="overflow-y-auto max-h-52 py-1">
                        {filteredCountries.length === 0 && (
                          <p className="text-xs text-[var(--color-text-faint)] text-center py-3">No results</p>
                        )}
                        {filteredCountries.map((c) => (
                          <button
                            key={c.iso}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, countryIso: c.iso }));
                              setDialOpen(false);
                              setDialSearch('');
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors hover:bg-white/[0.06] ${
                              formData.countryIso === c.iso ? 'bg-white/[0.08]' : ''
                            }`}
                          >
                            <img
                              src={`https://flagcdn.com/w20/${c.iso}.png`}
                              srcSet={`https://flagcdn.com/w40/${c.iso}.png 2x`}
                              width="20" height="14"
                              alt={c.name}
                              className="rounded-[2px] object-cover shrink-0"
                            />
                            <span className="flex-1 text-[var(--color-text)] truncate">{c.name}</span>
                            <span className="text-xs text-[var(--color-text-muted)] font-mono shrink-0">{c.dial}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp / Phone Number"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                  }}
                  className="flex-1 min-w-0 bg-[var(--color-surface-2)] px-3 py-3 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] rounded-r-xl"
                />
              </div>
              {errors.phone && <span className="text-xs text-red-400 pl-1">{errors.phone}</span>}
            </div>
          </div>

          {/* Academic Domain + Service Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="flex flex-col gap-1.5">
              <Select
                value={formData.domainId}
                onChange={(e) => {
                  setFormData({ ...formData, domainId: e.target.value });
                  if (errors.domainId) setErrors(prev => ({ ...prev, domainId: null }));
                }}
                className={errors.domainId ? 'border-red-500/50 focus:border-red-500' : ''}
              >
                <option value="">Select Academic Domain</option>
                {domains.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[var(--color-surface)] text-[var(--color-text)]">
                    {d.name}
                  </option>
                ))}
                <option value="other" className="bg-[var(--color-surface)] text-[var(--color-text)]">Other</option>
              </Select>
              {errors.domainId && <span className="text-xs text-red-400 pl-1">{errors.domainId}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Select
                value={formData.serviceId}
                onChange={(e) => {
                  setFormData({ ...formData, serviceId: e.target.value, customService: '' });
                  if (errors.serviceId) setErrors(prev => ({ ...prev, serviceId: null, customService: null }));
                }}
                className={errors.serviceId ? 'border-red-500/50 focus:border-red-500' : ''}
              >
                <option value="">Select Service Needed</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[var(--color-surface)] text-[var(--color-text)]">
                    {s.name}
                  </option>
                ))}
                <option value="other" className="bg-[var(--color-surface)] text-[var(--color-text)]">Other / Custom Service</option>
              </Select>
              {errors.serviceId && <span className="text-xs text-red-400 pl-1">{errors.serviceId}</span>}
              {formData.serviceId === 'other' && (
                <div className="mt-1">
                  <Input
                    required
                    placeholder="Describe the service you need"
                    value={formData.customService}
                    onChange={(e) => {
                      setFormData({ ...formData, customService: e.target.value });
                      if (errors.customService) setErrors(prev => ({ ...prev, customService: null }));
                    }}
                    className={errors.customService ? 'border-red-500/50 focus:border-red-500' : ''}
                  />
                  {errors.customService && <span className="text-xs text-red-400 pl-1">{errors.customService}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Subject / Course */}
          <div className="flex flex-col gap-1.5">
            <Input
              required
              placeholder="Subject / Course (e.g., Thermodynamics, DSA, Circuit Analysis)"
              value={formData.subject}
              onChange={(e) => {
                setFormData({ ...formData, subject: e.target.value });
                if (errors.subject) setErrors(prev => ({ ...prev, subject: null }));
              }}
              className={errors.subject ? 'border-red-500/50 focus:border-red-500' : ''}
            />
            {errors.subject && <span className="text-xs text-red-400 pl-1">{errors.subject}</span>}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Textarea
              required
              rows={3}
              placeholder="Briefly describe your assignment details or requirements..."
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors(prev => ({ ...prev, description: null }));
              }}
              className={`resize-y min-h-[90px] ${errors.description ? 'border-red-500/50 focus:border-red-500' : ''}`}
            />
            {errors.description && <span className="text-xs text-red-400 pl-1">{errors.description}</span>}
          </div>

          {/* File Attachment */}
          <div className="flex flex-col gap-2">
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 cursor-pointer transition-all duration-200 ${
                dragOver
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                  : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)] bg-transparent hover:bg-white/[0.02]'
              }`}
            >
              <Paperclip className="w-5 h-5 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-muted)] text-center">
                <span className="text-[var(--color-accent)] font-medium">Click to attach</span> or drag &amp; drop files here
              </p>
              <p className="text-xs text-[var(--color-text-faint)]">
                 Max 10 MB each · up to 5 files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.webp,.txt,.csv"
                className="hidden"
                onChange={handleFileInput}
              />
            </div>

            {fileError && <span className="text-xs text-red-400 pl-1">{fileError}</span>}

            {attachments.length > 0 && (
              <ul className="flex flex-col gap-1.5 mt-1">
                {attachments.map((file, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 bg-white/[0.03] border border-white/[0.06] text-sm"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {file.type.startsWith('image/') ? (
                        <Image className="w-4 h-4 shrink-0 text-[var(--color-accent-muted)]" />
                      ) : (
                        <FileText className="w-4 h-4 shrink-0 text-[var(--color-accent-muted)]" />
                      )}
                      <span className="truncate text-[var(--color-text)]">{file.name}</span>
                      <span className="shrink-0 text-xs text-[var(--color-text-faint)]">{formatBytes(file.size)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="shrink-0 text-[var(--color-text-faint)] hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-3 pt-2">
            {submitError && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2.5 text-center leading-relaxed">
                {submitError}
              </p>
            )}
            <div className="flex justify-start">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto md:w-auto px-8 md:px-10 self-start"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Request'}
              </Button>
            </div>
          </div>

        </form>
      )}
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderClient() {
  return (
    <div className="min-h-screen">
      <PageHero title="Hire Expert" subtitle="Submit your requirements below and get a free quote within 15 minutes." />
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-3xl xl:max-w-4xl 3xl:max-w-5xl mx-auto px-4 md:px-6 xl:px-8">
          <Suspense fallback={<div className="h-96 flex items-center justify-center text-[var(--color-text-muted)]">Loading form...</div>}>
            <OrderForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
