'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import NetworkMonitor from '@/app/components/NetworkMonitor'
import LoadingCard from '@/app/components/LoadingCard'
import ProductCard from '@/app/components/ProductCard'
import type { Product, User, Stats } from '@/app/types'

export default function CSRDemo() {
    const [products, setProducts] = useState<Product[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [loadTime, setLoadTime] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate initial page load delay
                await new Promise(resolve => setTimeout(resolve, 100))

                // Fetch all data client-side
                const [productsRes, userRes, statsRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/user'),
                    fetch('/api/stats'),
                ])

                const [productsData, userData, statsData] = await Promise.all([
                    productsRes.json(),
                    userRes.json(),
                    statsRes.json(),
                ])

                setProducts(productsData.products)
                setUser(userData.user)
                setStats(statsData.stats)
                setLoadTime(new Date().toISOString())
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <NetworkMonitor />
            <div className="container mx-auto px-4 py-8">
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← Back to Home
                </Link>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">CSR Demo - Client-Side Rendering</h1>
                    <p className="text-gray-700 mb-4">
                        This page loads a minimal HTML shell, then fetches all data in the browser.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Rendering Method</div>
                            <div className="font-semibold text-orange-600">Client-Side (CSR)</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Data Loaded At</div>
                            <div className="font-semibold">
                                {loadTime ? new Date(loadTime).toLocaleString() : 'Loading...'}
                            </div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Client API Calls</div>
                            <div className="font-semibold text-orange-600">3</div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <>
                        {/* Loading skeleton */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <LoadingCard />
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-md p-4">
                                    <LoadingCard />
                                </div>
                            ))}
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                                    <LoadingCard />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* User Dashboard */}
                        {user && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-xl font-bold mb-4">Gaming Dashboard - {user.name}</h2>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-orange-50 rounded-lg p-4">
                                        <div className="text-orange-600 text-sm font-medium">Gamer Level</div>
                                        <div className="text-lg font-bold">{user.membership}</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4">
                                        <div className="text-purple-600 text-sm font-medium">Games Owned</div>
                                        <div className="text-lg font-bold">{Math.floor(Math.random() * 50) + 25}</div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="text-green-600 text-sm font-medium">Hours Played</div>
                                        <div className="text-lg font-bold">{Math.floor(Math.random() * 500) + 100}h</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Stats */}
                        {stats && (
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
                        )}

                        {/* Products */}
                        <h2 className="text-2xl font-bold mb-4">Products</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products?.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                )}

                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-3">Performance Characteristics</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>✅ <strong>Minimal server load:</strong> Only serves static files</li>
                        <li>✅ <strong>Rich interactivity:</strong> Full client-side capabilities</li>
                        <li>✅ <strong>Code splitting:</strong> Can lazy load components</li>
                        <li>❌ <strong>Slow initial paint:</strong> Shows loading state first</li>
                        <li>❌ <strong>SEO challenges:</strong> Content not in initial HTML</li>
                        <li>❌ <strong>Requires JavaScript:</strong> Wont work without JS enabled</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
