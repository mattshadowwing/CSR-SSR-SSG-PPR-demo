'use client'

import { useEffect, useState } from 'react'

export default function NetworkMonitor() {
    const [requests, setRequests] = useState(0)

    useEffect(() => {
        const originalFetch = window.fetch
        let requestCount = 0

        window.fetch = function(...args) {
            const url = args[0]
            if (typeof url === 'string' && url.includes('/api/')) {
                requestCount++
                setRequests(requestCount)
            }
            return originalFetch.apply(this, args)
        }

        return () => {
            window.fetch = originalFetch
        }
    }, [])

    return (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200 z-50">
            <div className="text-sm font-semibold text-gray-600">Network Requests</div>
            <div className="text-2xl font-bold text-blue-600">{requests}</div>
        </div>
    )
}