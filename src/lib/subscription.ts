// Tipos e helpers para sistema de assinatura

export type SubscriptionPlan = 'free' | 'economic' | 'premium'

export interface PlanFeatures {
  name: string
  price: number
  interval: string
  features: string[]
  highlighted?: boolean
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlan, PlanFeatures> = {
  free: {
    name: 'Gratuito',
    price: 0,
    interval: 'para sempre',
    features: [
      'Versículo diário',
      'Leitura bíblica básica',
      'Diário espiritual (5 anotações/mês)',
      'Lembretes de oração',
      'Acesso à comunidade',
      'Anúncios presentes'
    ]
  },
  economic: {
    name: 'Econômico',
    price: 19.99,
    interval: 'por mês',
    features: [
      'Tudo do plano Gratuito',
      'Meditações guiadas exclusivas',
      'Planos de leitura aprofundados',
      'Diário espiritual ilimitado',
      'Anotações e realces na Bíblia',
      'Experiência sem anúncios',
      'Cursos básicos de estudo bíblico'
    ]
  },
  premium: {
    name: 'Premium',
    price: 39.99,
    interval: 'por mês',
    highlighted: true,
    features: [
      'Tudo do plano Econômico',
      'Pregações exclusivas de líderes',
      'Estudos bíblicos avançados',
      'Ferramentas avançadas de estudo',
      'Perfil detalhado personalizado',
      'Acesso prioritário a eventos',
      'Mentoria espiritual mensal',
      'Biblioteca completa de recursos',
      'Suporte prioritário'
    ]
  }
}

export const getPlanFeatures = (plan: SubscriptionPlan): PlanFeatures => {
  return SUBSCRIPTION_PLANS[plan]
}

export const canAccessFeature = (
  userPlan: SubscriptionPlan,
  requiredPlan: SubscriptionPlan
): boolean => {
  const planHierarchy: Record<SubscriptionPlan, number> = {
    free: 0,
    economic: 1,
    premium: 2
  }
  
  return planHierarchy[userPlan] >= planHierarchy[requiredPlan]
}
