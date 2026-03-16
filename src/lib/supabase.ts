import { createClient } from '@supabase/supabase-js';

// No GitHub Pages, o processo .env não funciona igual ao local.
// Substitua as strings abaixo pelas chaves que você encontra no painel do Supabase (Project Settings > API)
const supabaseUrl = 'https://SUA_URL_AQUI.supabase.co';
const supabaseAnonKey = 'SUA_CHAVE_ANON_AQUI';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erro: Chaves do Supabase não configuradas corretamente.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
