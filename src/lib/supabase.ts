import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export type User = {
  id: string
  email: string
  name?: string
  subscription_type?: 'free' | 'premium_monthly' | 'premium_annual'
  subscription_status?: 'active' | 'inactive' | 'cancelled'
  subscription_start_date?: string
  subscription_end_date?: string
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  user_id: string
  amount: number
  currency: string
  payment_method?: string
  payment_status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  mercadopago_payment_id?: string
  mercadopago_preference_id?: string
  created_at: string
  updated_at: string
}

export type Donation = {
  id: string
  user_id?: string
  amount: number
  message?: string
  is_anonymous: boolean
  created_at: string
}
