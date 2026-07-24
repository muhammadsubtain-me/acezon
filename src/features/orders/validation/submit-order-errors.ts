export const SUBMIT_ORDER_FIELDS = {
  contact: 'contact',
  serviceId: 'serviceId',
  customService: 'customService',
  deadline: 'deadline',
  description: 'description',
  attachments: 'attachments',
} as const;

export type SubmitOrderField = typeof SUBMIT_ORDER_FIELDS[keyof typeof SUBMIT_ORDER_FIELDS];

export interface FieldErrors {
  [field: string]: string;
}

export interface FieldValidationResponse {
  errors: FieldErrors;
  error: string;
}

export function fieldValidationResponse(errors: FieldErrors): FieldValidationResponse | null {
  const entries = Object.entries(errors).filter(([, message]) => message);
  if (entries.length === 0) return null;
  const mapped = Object.fromEntries(entries);
  const first = entries[0][1];
  return { errors: mapped, error: first };
}
