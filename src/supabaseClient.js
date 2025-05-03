// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rpeffhjbyxrvqznpahdz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwZWZmaGpieXhydnF6bnBhaGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNDM3MjMsImV4cCI6MjA2MTYxOTcyM30.xcpMJI5k6ZLLiIAkvtJEQuCxRsQgjGdSMlMV66nfy2Q';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; // Default export
