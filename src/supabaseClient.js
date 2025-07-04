import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zamwbrehwkdivlgcjodl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbXdicmVod2tkaXZsZ2Nqb2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MjkzMTgsImV4cCI6MjA2NzIwNTMxOH0.26-QfL29UFSOyz2bhIOcEL7ZmjFdOZcJA6KOTFXrP00';
export const supabase = createClient(supabaseUrl, supabaseKey);