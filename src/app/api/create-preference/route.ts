import { NextRequest, NextResponse } from 'next/server'
import mercadopago from 'mercadopago'

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, price, quantity } = body

    // Criar preferência de pagamento
    const preference = await mercadopago.preferences.create({
      items: [
        {
          title,
          unit_price: price,
          quantity,
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/failure`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pending`,
      },
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_types: [],
        installments: 12,
      },
      statement_descriptor: 'App Cristão Premium',
    })

    return NextResponse.json({ id: preference.body.id })
  } catch (error) {
    console.error('Erro ao criar preferência:', error)
    return NextResponse.json(
      { error: 'Erro ao criar preferência de pagamento' },
      { status: 500 }
    )
  }
}
