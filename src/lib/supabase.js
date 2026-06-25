import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nlxsgwwlvztbndwnjnhp.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5seHNnd3dsdnp0Ym5kd25qbmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMzA0MDgsImV4cCI6MjA5NzkwNjQwOH0.2yGeOvu40cDP7Em4wvSQgYePKO1Qp1K6Uop6B5uVfNo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
