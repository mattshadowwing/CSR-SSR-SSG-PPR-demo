import Link from 'next/link'
import { Suspense } from 'react'
import NetworkMonitor from '@/app/components/NetworkMonitor'
import LoadingCard from '@/app/components/LoadingCard'
import ProductCard from '@/app/components/ProductCard'
import type { Product, User, Stats } from '@/app/types'

// Enable PPR (Partial Prerendering)
export const experimental_ppr = true

// Static shell component
function StaticShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <NetworkMonitor />
            <div className="container mx-auto px-4 py-8">
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← Back to Home
                </Link>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">PPR Demo - Partial Prerendering</h1>
                    <p className="text-gray-700 mb-4">
                        This page uses a static shell with dynamic content streamed in.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Rendering Method</div>
                            <div className="font-semibold text-purple-600">Hybrid (PPR)</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Shell</div>
                            <div className="font-semibold">Static (Instant)</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Dynamic Parts</div>
                            <div className="font-semibold text-purple-600">Streamed</div>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

// Dynamic user component
async function UserInfo() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/user`, { cache: 'no-store' })
    const { user }: { user: User } = await res.json()

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Personal Dashboard (Dynamic Content)</h2>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-purple-600 text-sm font-medium">Welcome</div>
                    <div className="text-lg font-bold">{user.name}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-blue-600 text-sm font-medium">Membership</div>
                    <div className="text-lg font-bold">{user.membership}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-green-600 text-sm font-medium">Smart Devices</div>
                    <div className="text-lg font-bold">{Math.floor(Math.random() * 10) + 5} Connected</div>
                </div>
            </div>
        </div>
    )
}

// Dynamic stats component
async function LiveStats() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/stats`, { cache: 'no-store' })
    const { stats }: { stats: Stats } = await res.json()

    return (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-gray-500 text-sm">Total Visits</div>
                <div className="text-2xl font-bold">{stats.totalVisits}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-gray-500 text-sm">Active Users</div>
                <div className="text-2xl font-bold">{stats.activeUsers}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-gray-500 text-sm">Conversion Rate</div>
                <div className="text-2xl font-bold">{stats.conversionRate}</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-gray-500 text-sm">Revenue</div>
                <div className="text-2xl font-bold">{stats.revenue}</div>
            </div>
        </div>
    )
}

// Static products (pre-rendered)
function StaticProducts() {
    // This would normally come from a database at build time
    const products: Product[] = [
        { id: 1, name: 'Amazon Echo Dot (5th Gen)', price: 49, inStock: true },
        { id: 2, name: 'Ring Video Doorbell', price: 99, inStock: true },
        { id: 3, name: 'Philips Hue Smart Bulb Starter Kit', price: 79, inStock: false },
        { id: 4, name: 'Nest Learning Thermostat', price: 249, inStock: true },
        { id: 5, name: 'TP-Link Kasa Smart Plug 4-Pack', price: 29, inStock: true },
        { id: 6, name: 'August Smart Lock Pro', price: 199, inStock: false },
    ]

    return (
        <>
            {/* Store Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">SmartHome Hub - Catalog Items</h2>
                        <p className="text-gray-600">Essential smart home devices (pre-loaded catalog)</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="text-right">
                            <div className="text-sm text-gray-500">Catalog Items</div>
                            <div className="text-2xl font-bold text-purple-600">{products.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        Smart Home
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                        Lighting
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                        Security
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                        Climate
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                        Voice Assistants
                    </span>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Smart Home Products (Static Catalog)</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default function PPRDemo() {
    return (
        <StaticShell>
            {/* User info loads dynamically */}
            <Suspense fallback={
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <LoadingCard />
                </div>
            }>
                <UserInfo />
            </Suspense>

            {/* Stats load dynamically */}
            <Suspense fallback={
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow-md p-4">
                            <LoadingCard />
                        </div>
                    ))}
                </div>
            }>
                <LiveStats />
            </Suspense>

            {/* Products are static */}
            <StaticProducts />

            <div className="mt-8 bg-gray-100 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-3">Performance Characteristics</h2>
                <ul className="space-y-2 text-gray-700">
                    <li>✅ <strong>Fast initial paint:</strong> Static shell loads instantly</li>
                    <li>✅ <strong>Progressive enhancement:</strong> Dynamic content streams in</li>
                    <li>✅ <strong>Selective updates:</strong> Only dynamic parts fetch data</li>
                    <li>✅ <strong>Best UX:</strong> No loading spinner for entire page</li>
                </ul>
            </div>
        </StaticShell>
    )
}
