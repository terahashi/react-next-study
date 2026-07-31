import { createClient } from '@supabase/supabase-js';

// .env.local から鍵を読み込む
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabaseと通信するためのクライアントを作成してエクスポートする
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
