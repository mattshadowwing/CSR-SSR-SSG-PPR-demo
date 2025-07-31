import { NextResponse } from 'next/server'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function GET() {
    await delay(400)

    return NextResponse.json({
        stats: {
            totalVisits: Math.floor(Math.random() * 10000) + 5000,
            activeUsers: Math.floor(Math.random() * 100) + 50,
            conversionRate: (Math.random() * 5 + 2).toFixed(2) + '%',
            revenue: '$' + (Math.floor(Math.random() * 50000) + 10000).toLocaleString(),
        },
        timestamp: new Date().toISOString(),
    })
}