import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zdqoxjyicrczlzazgyae.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkcW94anlpY3Jjemx6YXpneWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1Mjk2NDgsImV4cCI6MjA1MDEwNTY0OH0.Uol8ABN6Lwi0MfIKT1M0le-OedVY74Z8HOuqiFer8zg';

let supabase;

if (!globalThis.supabase) {
  globalThis.supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: window.localStorage,
    },
  });
}

supabase = globalThis.supabase;

export { supabase };