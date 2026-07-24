export interface AdminInquiryRecord {
  id: string;
  submitted_at: string;
  phone?: string;
  country_dial?: string;
  country_iso?: string;
  country_name?: string;
  contact_type: 'email' | 'whatsapp';
  contact?: string | null;
  service_id: string;
  custom_service?: string;
  deadline: string;
  description: string;
  status: 'new' | 'claimed' | 'in_progress' | 'delivered' | 'completed' | 'rejected';
  claimed_by?: string | null;
  claimed_at?: string | null;
  delivered_at?: string | null;
  delivered_by?: string | null;
  delivery_token?: string | null;
  delivery_token_used_at?: string | null;
  completed_at?: string | null;
  notes?: string | null;
  attachments?: Array<{ name: string; url: string; size?: number; type?: string }>;
  feedback_rating?: number | null;
  feedback_text?: string | null;
  feedback_submitted_at?: string | null;
}

export interface AdminInquiryStats {
  total: number;
  newCount: number;
  claimedCount: number;
  inProgressCount: number;
  deliveredCount: number;
  completedCount: number;
  avgRating: number;
  myWorkCount?: number;
  teamCount?: number;
}

export interface AdminInquiriesResponse {
  inquiries: AdminInquiryRecord[];
  stats: AdminInquiryStats;
}
