import { isValidDeadline } from '@/features/orders/services/deadline';
import { attachmentsAreValid } from '@/features/orders/services/inquiry-attachments';
import { SUBMIT_ORDER_FIELDS as F, FieldErrors } from '@/features/orders/validation/submit-order-errors';

export const ORDER_FORM_MESSAGES = {
  serviceId: 'Please select a service type.',
  customService: 'Please describe your service.',
  deadlineRequired: 'Please choose a deadline.',
  deadlinePast: 'Deadline cannot be in the past.',
  deadlineInvalid: 'Please choose a valid deadline (today or later).',
  description: 'Description must be at least 10 characters.',
  attachments: 'Invalid or unsupported attachments.',
};

interface OrderFormBody {
  service_id?: string;
  custom_service?: string;
  deadline?: string;
  description?: string;
  attachments?: unknown;
  timezone?: string;
}

/** Server-side validation — returns field-keyed errors using SUBMIT_ORDER_FIELDS. */
export function validateOrderFormServer(body: OrderFormBody): FieldErrors {
  const {
    service_id, custom_service,
    deadline, description, attachments,
  } = body;

  const fieldErrors: FieldErrors = {};

  if (!service_id?.trim()) {
    fieldErrors[F.serviceId] = ORDER_FORM_MESSAGES.serviceId;
  } else if (service_id === 'other' && !custom_service?.trim()) {
    fieldErrors[F.customService] = ORDER_FORM_MESSAGES.customService;
  }

  if (!deadline || !isValidDeadline(deadline, body.timezone)) {
    fieldErrors[F.deadline] = ORDER_FORM_MESSAGES.deadlineInvalid;
  }

  if (!description?.trim() || description.trim().length < 10) {
    fieldErrors[F.description] = ORDER_FORM_MESSAGES.description;
  }

  if (!attachmentsAreValid(attachments)) {
    fieldErrors[F.attachments] = ORDER_FORM_MESSAGES.attachments;
  }

  return fieldErrors;
}
