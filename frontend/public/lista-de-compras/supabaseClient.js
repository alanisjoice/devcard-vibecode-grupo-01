// Importa a função de criação do client Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Cria o client com a URL e a chave fornecidas
export const supabase = createClient(
  'https://lcahdvoskgqmzzxpoqgt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYWhkdm9za2dxbXp6eHBvcWd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTE4MzUsImV4cCI6MjA4NzY4NzgzNX0.6ryGqexCgUzMtngW01t1eAQp0Jo9N5Wn4VNPVLOnWJQ'
)