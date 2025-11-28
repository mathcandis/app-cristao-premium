'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Crown, Check, Zap, Shield, Sparkles, Star, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SubscriptionsPage() {
  const router = useRouter()

  const plans = [
    {
      id: 'mensal',
      name: 'Premium Mensal',
      price: 19.90,
      period: 'mês',
      popular: false,
      description: 'Perfeito para começar',
      features: [
        'Planos de leitura ilimitados',
        'Lembretes de oração personalizados',
        'Diário espiritual completo',
        'Acesso a todos os recursos premium',
        'Suporte prioritário',
        'Sem anúncios',
        'Sincronização em nuvem'
      ],
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'anual',
      name: 'Premium Anual',
      price: 199.90,
      period: 'ano',
      popular: true,
      description: 'Melhor custo-benefício',
      savings: 'Economize R$ 38,90',
      features: [
        'Todos os recursos do plano mensal',
        '2 meses grátis',
        'Acesso vitalício a novos recursos',
        'Suporte VIP 24/7',
        'Certificado de membro fundador',
        'Conteúdo exclusivo',
        'Comunidade premium',
        'Eventos especiais'
      ],
      color: 'from-amber-500 to-orange-600'
    }
  ]

  const handleSelectPlan = (planId: string) => {
    router.push(`/checkout?plan=${planId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100/50 p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()} 
            className="hover:bg-gray-100 rounded-2xl"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Escolha Seu Plano
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto p-6 pt-12 text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-full font-inter font-semibold mb-6">
          <Sparkles size={20} />
          <span>Desbloqueie Todo o Potencial Espiritual</span>
        </div>
        
        <h2 className="font-serif text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
          Transforme Sua Jornada com Deus
        </h2>
        
        <p className="font-inter text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
          Acesse recursos exclusivos que vão aprofundar sua fé, 
          fortalecer sua vida de oração e acelerar seu crescimento espiritual.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`bg-white/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden ${
                plan.popular ? 'ring-4 ring-amber-400' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-2 rounded-bl-2xl font-inter font-bold flex items-center space-x-2">
                    <Star size={16} />
                    <span>MAIS POPULAR</span>
                  </div>
                </div>
              )}

              <CardHeader className="pb-4 pt-8">
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${plan.color} rounded-3xl flex items-center justify-center shadow-2xl`}>
                    <Crown className="text-white" size={40} />
                  </div>
                </div>

                <CardTitle className="font-serif text-3xl font-bold text-center text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>

                <p className="font-inter text-gray-600 text-center text-lg mb-4">
                  {plan.description}
                </p>

                {plan.savings && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-0 font-inter px-4 py-2 text-sm mx-auto">
                    {plan.savings}
                  </Badge>
                )}

                <div className="flex items-baseline justify-center space-x-2 mt-6">
                  <span className="font-serif text-5xl font-bold text-gray-900">
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="font-inter text-xl text-gray-600">
                    /{plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-6 h-6 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="font-inter text-gray-700 text-lg leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 font-inter font-semibold py-6 text-xl rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 transform`}
                >
                  <Zap className="mr-3" size={24} />
                  Assinar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Garantia e Benefícios */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="font-inter font-bold text-gray-900 text-xl mb-3">
                Garantia de 7 Dias
              </h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="font-inter font-bold text-gray-900 text-xl mb-3">
                Acesso Imediato
              </h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                Comece a usar todos os recursos premium agora mesmo.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Gift className="text-white" size={32} />
              </div>
              <h3 className="font-inter font-bold text-gray-900 text-xl mb-3">
                Cancele Quando Quiser
              </h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                Sem taxas de cancelamento ou multas. Você está no controle.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ ou Informações Adicionais */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white border-0 shadow-2xl">
            <CardContent className="p-12">
              <h3 className="font-serif text-3xl font-bold mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="font-inter text-indigo-100 text-xl mb-8 leading-relaxed">
                Nossa equipe está pronta para ajudar você a escolher o melhor plano 
                para sua jornada espiritual.
              </p>
              <Button
                variant="outline"
                className="bg-white text-indigo-600 hover:bg-gray-100 font-inter font-semibold px-8 py-4 text-lg rounded-2xl shadow-xl border-0"
              >
                Falar com Suporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
