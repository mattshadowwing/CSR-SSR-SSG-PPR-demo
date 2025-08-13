import { NextResponse } from 'next/server'
import type { User } from '@/app/types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function GET() {
    await delay(300)

    // Simulate different user types
    const userTypes = [
        { name: 'Alex Johnson', membership: 'Premium', email: 'alex.j@email.com' },
        { name: 'Sarah Chen', membership: 'Pro Gamer', email: 'sarah.c@email.com' },
        { name: 'Mike Rodriguez', membership: 'Elite', email: 'mike.r@email.com' },
        { name: 'Emma Thompson', membership: 'Standard', email: 'emma.t@email.com' },
    ]

    const randomUser = userTypes[Math.floor(Math.random() * userTypes.length)]

    const user: User = {
        ...randomUser,
        lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Within last week
    }

    return NextResponse.json({
        user,
        timestamp: new Date().toISOString(),
    })
}
