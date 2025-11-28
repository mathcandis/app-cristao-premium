'use client'

import { Check, Crown, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { PlanFeatures, SubscriptionPlan } from '@/lib/subscription'

interface PricingCardProps {
  plan: SubscriptionPlan
  planData: PlanFeatures
  currentPlan: SubscriptionPlan
  onSelectPlan: (plan: SubscriptionPlan) => void
}

export default function PricingCard({ plan, planData, currentPlan, onSelectPlan }: PricingCardProps) {
  const isCurrentPlan = currentPlan === plan
  const isFree = plan === 'free'
  const isEconomic = plan === 'economic'
  const isPremium = planData.highlighted

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-500 hover:scale-105 transform ${
        isPremium 
          ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white border-0 shadow-2xl hover:shadow-amber-500/25' 
          : 'bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl'
      }`}
    >
      {isPremium && (
        <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-bl-2xl">
          <div className="flex items-center space-x-2">
            <Crown size={16} className="text-white" />
            <span className="font-inter font-bold text-sm text-white">Mais Popular</span>
          </div>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
            isPremium ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-indigo-500 to-purple-600'
          }`}>
            {isPremium ? (
              <Crown size={28} className="text-white" />
            ) : isFree ? (
              <Sparkles size={28} className="text-white" />
            ) : (
              <Check size={28} className="text-white" />
            )}
          </div>
          {isCurrentPlan && (
            <Badge className={isPremium ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}>
              Plano Atual
            </Badge>
          )}
        </div>

        <h3 className={`font-serif text-3xl font-bold mb-2 ${
          isPremium ? 'text-white' : 'text-gray-900'
        }`}>
          {planData.name}
        </h3>

        <div className="flex items-baseline space-x-2">
          <span className={`font-inter text-5xl font-bold ${
            isPremium ? 'text-white' : 'text-gray-900'
          }`}>
            {isFree ? 'R$ 0' : `R$ ${planData.price.toFixed(2).replace('.', ',')}`}
          </span>
          <span className={`font-inter text-lg ${
            isPremium ? 'text-white/80' : 'text-gray-600'
          }`}>
            /{planData.interval}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          {planData.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                isPremium ? 'bg-white/20' : 'bg-emerald-100'
              }`}>
                <Check size={14} className={isPremium ? 'text-white' : 'text-emerald-600'} />
              </div>
              <span className={`font-inter text-base leading-relaxed ${
                isPremium ? 'text-white/95' : 'text-gray-700'
              }`}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        <Button
          onClick={() => onSelectPlan(plan)}
          disabled={isCurrentPlan}
          className={`w-full font-inter font-semibold py-6 rounded-2xl shadow-xl transition-all duration-300 ${
            isPremium
              ? 'bg-white text-amber-600 hover:bg-gray-100'
              : isCurrentPlan
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-indigo-500/25'
          }`}
        >
          {isCurrentPlan ? 'Plano Atual' : isFree ? 'Continuar Gratuito' : isEconomic ? 'Recomendado' : 'Assinar Agora'}
        </Button>
      </CardContent>
    </Card>
  )
}
