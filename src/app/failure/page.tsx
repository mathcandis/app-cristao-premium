'use client'

import { useRouter } from 'next/navigation'
import { XCircle, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function FailurePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 flex items-center justify-center p-6">
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl max-w-2xl w-full">
        <CardContent className="p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <XCircle className="text-white" size={56} />
          </div>

          <h1 className="font-serif text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Pagamento Não Aprovado
          </h1>

          <p className="font-inter text-gray-600 text-xl mb-8 leading-relaxed">
            Infelizmente não conseguimos processar seu pagamento. 
            Isso pode ter acontecido por diversos motivos, como dados incorretos ou saldo insuficiente.
          </p>

          <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl mb-8">
            <p className="font-inter text-amber-800 font-semibold mb-2">
              💡 Dicas para tentar novamente:
            </p>
            <ul className="font-inter text-amber-700 text-left space-y-2">
              <li>• Verifique os dados do seu cartão</li>
              <li>• Confirme se há saldo disponível</li>
              <li>• Tente outro método de pagamento</li>
              <li>• Entre em contato com seu banco</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => router.push('/checkout')}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-inter font-semibold py-6 text-xl rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 transform"
            >
              <ArrowLeft className="mr-3" size={24} />
              Tentar Novamente
            </Button>

            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="w-full font-inter font-semibold py-6 text-lg rounded-2xl border-2 border-gray-200 hover:bg-gray-50"
            >
              <Home className="mr-3" size={20} />
              Voltar ao Início
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <p className="font-inter text-gray-500 text-sm">
              Precisa de ajuda? Entre em contato com nosso suporte.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
