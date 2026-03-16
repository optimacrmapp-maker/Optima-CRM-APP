import { createClient } from '@supabase/supabase-js';

// No GitHub Pages, o processo .env não funciona igual ao local.
// Substitua as strings abaixo pelas chaves que você encontra no painel do Supabase (Project Settings > API)
const supabaseUrl = 'https://kxmmfewlwfssxsgakzjs.supabase.co';
const supabaseAnonKey = 'sb_publishable_UC2bVAZerx74tajGQp0tFw_qEun8w3P';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erro: Chaves do Supabase não configuradas corretamente.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
