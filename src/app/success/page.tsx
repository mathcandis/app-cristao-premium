'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Home, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id')
  const status = searchParams.get('status')

  useEffect(() => {
    // Aqui você pode fazer uma chamada para sua API para confirmar o pagamento
    // e ativar a assinatura do usuário
    if (paymentId && status === 'approved') {
      console.log('Pagamento aprovado:', paymentId)
      // TODO: Ativar assinatura premium do usuário
    }
  }, [paymentId, status])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce">
            <CheckCircle className="text-white" size={56} />
          </div>

          <h1 className="font-serif text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Pagamento Confirmado!
          </h1>

          <p className="font-inter text-gray-600 text-xl mb-8 leading-relaxed">
            Parabéns! Sua assinatura Premium foi ativada com sucesso. 
            Agora você tem acesso completo a todos os recursos exclusivos.
          </p>

          {paymentId && (
            <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-2xl mb-8">
              <p className="font-inter text-emerald-800 text-sm">
                <span className="font-bold">ID do Pagamento:</span> {paymentId}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={() => router.push('/')}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 font-inter font-semibold py-6 text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 transform"
            >
              <Home className="mr-3" size={24} />
              Voltar ao Início
            </Button>

            <Button
              onClick={() => router.push('/profile')}
              variant="outline"
              className="w-full font-inter font-semibold py-6 text-lg rounded-2xl border-2 border-gray-200 hover:bg-gray-50"
            >
              Ver Meu Perfil
              <ArrowRight className="ml-3" size={20} />
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <p className="font-inter text-gray-500 text-sm">
              Um email de confirmação foi enviado para você com todos os detalhes da sua assinatura.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
