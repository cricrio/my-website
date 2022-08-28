import { createClient } from '@supabase/supabase-js';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const queryClient = new QueryClient();
