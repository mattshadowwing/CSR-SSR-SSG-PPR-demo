import Link from 'next/link'
import NetworkMonitor from '@/app/components/NetworkMonitor'
import ProductCard from '@/app/components/ProductCard'
import type { Product, User, Stats } from '@/app/types'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface ServerData {
    products: Product[];
    user: User;
    stats: Stats;
    renderTime: string;
}

// This function runs on EVERY request
async function getServerData(): Promise<ServerData> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // These fetches happen server-side on each request
    const [productsRes, userRes, statsRes] = await Promise.all([
        fetch(`${baseUrl}/api/products`, { cache: 'no-store' }),
        fetch(`${baseUrl}/api/user`, { cache: 'no-store' }),
        fetch(`${baseUrl}/api/stats`, { cache: 'no-store' }),
    ])

    const [productsData, userData, statsData] = await Promise.all([
        productsRes.json(),
        userRes.json(),
        statsRes.json(),
    ])

    return {
        products: productsData.products,
        user: userData.user,
        stats: statsData.stats,
        renderTime: new Date().toISOString(),
    }
}

export default async function SSRDemo() {
    const { products, user, stats, renderTime } = await getServerData()

    return (
        <div className="min-h-screen bg-gray-50">
            <NetworkMonitor />
            <div className="container mx-auto px-4 py-8">
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← Back to Home
                </Link>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">SSR Demo - Server-Side Rendering</h1>
                    <p className="text-gray-700 mb-4">
                        This page is rendered on each request with fresh data from the server.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Rendering Method</div>
                            <div className="font-semibold text-blue-600">Dynamic (SSR)</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Rendered At</div>
                            <div className="font-semibold">{new Date(renderTime).toLocaleString()}</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Server API Calls</div>
                            <div className="font-semibold text-blue-600">3</div>
                        </div>
                    </div>
                </div>

                {/* User Dashboard */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Welcome back, {user.name}!</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-blue-600 text-sm font-medium">Membership Status</div>
                            <div className="text-lg font-bold">{user.membership}</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <div className="text-green-600 text-sm font-medium">Last Login</div>
                            <div className="text-lg font-bold">{new Date(user.lastLogin).toLocaleDateString()}</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <div className="text-purple-600 text-sm font-medium">Account Status</div>
                            <div className="text-lg font-bold">Active</div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
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

                {/* Products */}
                <h2 className="text-2xl font-bold mb-4">Products (Fresh Data)</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-3">Performance Characteristics</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>✅ <strong>Fresh data:</strong> Always up-to-date</li>
                        <li>✅ <strong>Personalized:</strong> Can show user-specific content</li>
                        <li>❌ <strong>Slower initial load:</strong> Server processing required</li>
                        <li>❌ <strong>Higher server load:</strong> Renders on each request</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
