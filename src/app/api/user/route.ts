import { NextResponse } from 'next/server'
import type { User } from '@/app/types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function GET() {
    await delay(300)

    const user: User = {
        name: 'Demo User',
        email: 'demo@example.com',
        membership: 'Premium',
        lastLogin: new Date().toISOString(),
    }

    return NextResponse.json({
        user,
        timestamp: new Date().toISOString(),
    })
}