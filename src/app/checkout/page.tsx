'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Check, Crown, Sparkles, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

declare global {
  interface Window {
    MercadoPago: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'mensal'
  const [loading, setLoading] = useState(false)
  const [mp, setMp] = useState<any>(null)

  const plans = {
    mensal: {
      name: 'Premium Mensal',
      price: 19.90,
      period: 'mês',
      description: 'Acesso completo por 1 mês',
      features: [
        'Planos de leitura ilimitados',
        'Lembretes de oração personalizados',
        'Diário espiritual completo',
        'Acesso a todos os recursos premium',
        'Suporte prioritário'
      ]
    },
    anual: {
      name: 'Premium Anual',
      price: 199.90,
      period: 'ano',
      description: 'Economize 17% no plano anual',
      features: [
        'Todos os recursos do plano mensal',
        '2 meses grátis',
        'Acesso vitalício a novos recursos',
        'Suporte VIP',
        'Certificado de membro fundador'
      ]
    }
  }

  const selectedPlan = plans[plan as keyof typeof plans] || plans.mensal

  useEffect(() => {
    // Carregar SDK do Mercado Pago
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    script.onload = () => {
      const mercadopago = new window.MercadoPago(
        process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY,
        {
          locale: 'pt-BR'
        }
      )
      setMp(mercadopago)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleCheckout = async () => {
    if (!mp) {
      alert('Aguarde o carregamento do sistema de pagamento...')
      return
    }

    setLoading(true)

    try {
      // Criar preferência de pagamento
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: selectedPlan.name,
          price: selectedPlan.price,
          quantity: 1,
        }),
      })

      const preference = await response.json()

      // Redirecionar para o checkout do Mercado Pago
      mp.checkout({
        preference: {
          id: preference.id,
        },
        autoOpen: true,
      })
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-100/50 p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()} 
            className="hover:bg-gray-100 rounded-2xl"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="font-serif text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Finalizar Assinatura
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Plano Selecionado */}
        <Card className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white border-0 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Crown size={28} className="text-white" />
                </div>
                <div>
                  <CardTitle className="font-serif text-3xl font-bold text-white">
                    {selectedPlan.name}
                  </CardTitle>
                  <p className="font-inter text-amber-100 text-lg">
                    {selectedPlan.description}
                  </p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-0 font-inter px-4 py-2 text-lg backdrop-blur-sm">
                {plan === 'anual' && '🔥 Melhor Oferta'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2 mb-6">
              <span className="font-serif text-6xl font-bold">
                R$ {selectedPlan.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="font-inter text-2xl text-amber-100">
                /{selectedPlan.period}
              </span>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {selectedPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="font-inter text-white text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resumo do Pedido */}
        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="font-serif text-2xl flex items-center">
              <Shield className="mr-3 text-indigo-600" size={24} />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Resumo do Pedido
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <span className="font-inter font-semibold text-gray-900 text-lg">
                {selectedPlan.name}
              </span>
              <span className="font-inter font-bold text-gray-900 text-xl">
                R$ {selectedPlan.price.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <div className="border-t-2 border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-6">
                <span className="font-inter font-bold text-gray-900 text-2xl">Total</span>
                <span className="font-serif font-bold text-amber-600 text-3xl">
                  R$ {selectedPlan.price.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={loading || !mp}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 font-inter font-semibold py-6 text-xl rounded-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Zap className="mr-3" size={24} />
                    Pagar com Mercado Pago
                  </>
                )}
              </Button>
            </div>

            {/* Garantia */}
            <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-2xl">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-inter font-bold text-emerald-900 text-lg mb-2">
                    Garantia de 7 dias
                  </p>
                  <p className="font-inter text-emerald-700 leading-relaxed">
                    Se você não ficar satisfeito com a assinatura, devolvemos 100% do seu dinheiro nos primeiros 7 dias.
                  </p>
                </div>
              </div>
            </div>

            {/* Segurança */}
            <div className="flex items-center justify-center space-x-4 text-gray-500">
              <Shield size={20} />
              <span className="font-inter text-sm">Pagamento 100% seguro via Mercado Pago</span>
            </div>
          </CardContent>
        </Card>

        {/* Benefícios Extras */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="font-inter font-bold text-gray-900 text-lg mb-2">
                Acesso Imediato
              </h3>
              <p className="font-inter text-gray-600">
                Comece a usar todos os recursos premium agora mesmo
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="font-inter font-bold text-gray-900 text-lg mb-2">
                Pagamento Seguro
              </h3>
              <p className="font-inter text-gray-600">
                Seus dados protegidos com criptografia de ponta
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="font-inter font-bold text-gray-900 text-lg mb-2">
                Cancele Quando Quiser
              </h3>
              <p className="font-inter text-gray-600">
                Sem taxas de cancelamento ou multas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
