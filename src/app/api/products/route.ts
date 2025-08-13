import { NextResponse } from 'next/server'
import type { Product } from '@/app/types'

// Simulate database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function GET() {
    // Add artificial delay to simulate real API
    await delay(500)

    // Simulate dynamic product inventory with random stock status
    const products: Product[] = [
        { id: 1, name: 'ASUS ROG Strix Gaming Laptop', price: 1899, inStock: Math.random() > 0.2 },
        { id: 2, name: 'Razer DeathAdder V3 Gaming Mouse', price: 89, inStock: Math.random() > 0.1 },
        { id: 3, name: 'Corsair K95 RGB Mechanical Keyboard', price: 179, inStock: Math.random() > 0.3 },
        { id: 4, name: 'NVIDIA GeForce RTX 4070', price: 599, inStock: Math.random() > 0.4 },
        { id: 5, name: 'SteelSeries Arctis 7 Wireless Headset', price: 149, inStock: Math.random() > 0.2 },
        { id: 6, name: 'Elgato Stream Deck', price: 149, inStock: Math.random() > 0.15 },
        { id: 7, name: 'HyperX Cloud Flight Gaming Headset', price: 99, inStock: Math.random() > 0.25 },
        { id: 8, name: 'Logitech C920 HD Pro Webcam', price: 79, inStock: Math.random() > 0.1 },
    ]

    return NextResponse.json({
        products,
        timestamp: new Date().toISOString(),
        requestId: Math.random().toString(36).substring(7),
    })
}
