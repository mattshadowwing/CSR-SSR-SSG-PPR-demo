import { NextResponse } from 'next/server'
import type { Product } from '@/app/types'

// Simulate database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function GET() {
    // Add artificial delay to simulate real API
    await delay(500)

    const products: Product[] = [
        { id: 1, name: 'Premium Laptop', price: 1299, inStock: true },
        { id: 2, name: 'Wireless Mouse', price: 49, inStock: true },
        { id: 3, name: 'USB-C Hub', price: 79, inStock: false },
        { id: 4, name: 'Mechanical Keyboard', price: 159, inStock: true },
        { id: 5, name: '4K Webcam', price: 199, inStock: true },
    ]

    return NextResponse.json({
        products,
        timestamp: new Date().toISOString(),
        requestId: Math.random().toString(36).substring(7),
    })
}