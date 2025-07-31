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
            <h2 className="text-xl font-bold mb-3">User Information (Dynamic)</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <span className="text-gray-500">Name:</span>
                    <span className="ml-2 font-semibold">{user.name}</span>
                </div>
                <div>
                    <span className="text-gray-500">Membership:</span>
                    <span className="ml-2 font-semibold text-purple-600">{user.membership}</span>
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
        { id: 1, name: 'Premium Laptop', price: 1299, inStock: true },
        { id: 2, name: 'Wireless Mouse', price: 49, inStock: true },
        { id: 3, name: 'USB-C Hub', price: 79, inStock: false },
    ]

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Products (Static)</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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