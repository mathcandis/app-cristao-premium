'use client'

import { useState } from 'react'
import { CreditCard, Lock, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SubscriptionPlan } from '@/lib/subscription'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: SubscriptionPlan
  planName: string
  price: number
  onConfirmPayment: () => void
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  plan, 
  planName, 
  price,
  onConfirmPayment 
}: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    const formatted = numbers.match(/.{1,4}/g)?.join(' ') || numbers
    return formatted.substring(0, 19) // 16 dígitos + 3 espaços
  }

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length >= 2) {
      return `${numbers.substring(0, 2)}/${numbers.substring(2, 4)}`
    }
    return numbers
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value))
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = e.target.value.replace(/\D/g, '')
    setCvv(numbers.substring(0, 4))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsProcessing(false)
    onConfirmPayment()
    onClose()
    
    // Resetar formulário
    setCardNumber('')
    setCardName('')
    setExpiryDate('')
    setCvv('')
  }

  const isFormValid = 
    cardNumber.replace(/\s/g, '').length === 16 &&
    cardName.trim().length > 0 &&
    expiryDate.length === 5 &&
    cvv.length >= 3

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-3xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-serif text-2xl font-bold">Pagamento Seguro</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-2xl"
            >
              <X size={24} />
            </Button>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-white/90">
            <Lock size={16} />
            <span className="font-inter text-sm">Seus dados estão protegidos com criptografia SSL</span>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Resumo do Plano */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-inter font-semibold text-gray-700">Plano {planName}</span>
              <span className="font-inter font-bold text-2xl text-indigo-600">
                R$ {price.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <p className="font-inter text-gray-600 text-sm">Cobrança mensal recorrente</p>
          </div>

          {/* Dados do Cartão */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber" className="font-inter font-semibold text-gray-900 mb-2 block">
                Número do Cartão
              </Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="font-inter text-lg pl-12 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                  required
                />
                <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <Label htmlFor="cardName" className="font-inter font-semibold text-gray-900 mb-2 block">
                Nome no Cartão
              </Label>
              <Input
                id="cardName"
                type="text"
                placeholder="Nome como está no cartão"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
                className="font-inter text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="font-inter font-semibold text-gray-900 mb-2 block">
                  Validade
                </Label>
                <Input
                  id="expiryDate"
                  type="text"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  className="font-inter text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cvv" className="font-inter font-semibold text-gray-900 mb-2 block">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="000"
                  value={cvv}
                  onChange={handleCvvChange}
                  className="font-inter text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Informações de Segurança */}
          <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-100">
            <div className="flex items-start space-x-3">
              <Lock className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-inter font-semibold text-emerald-900 mb-1">Pagamento 100% Seguro</p>
                <p className="font-inter text-emerald-700 text-sm">
                  Seus dados são criptografados e nunca armazenados em nossos servidores.
                </p>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 font-inter font-semibold py-6 rounded-2xl border-2 border-gray-200 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isProcessing}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-inter font-semibold py-6 rounded-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processando...</span>
                </span>
              ) : (
                `Confirmar Pagamento`
              )}
            </Button>
          </div>

          <p className="font-inter text-gray-500 text-xs text-center">
            Ao confirmar, você concorda com nossos Termos de Serviço e Política de Privacidade.
            Você pode cancelar sua assinatura a qualquer momento.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
