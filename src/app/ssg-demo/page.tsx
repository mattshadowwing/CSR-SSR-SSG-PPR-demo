import Link from 'next/link'
import ProductCard from '@/app/components/ProductCard'
import type { Product } from '@/app/types'

interface StaticData {
    products: Product[];
    buildTime: string;
}

// This function runs at BUILD TIME only
async function getProducts(): Promise<StaticData> {
    // In a real app, this would fetch from a database or CMS
    // For SSG, this runs during build, not on each request
    return {
        products: [
            { id: 1, name: 'MacBook Pro 16" M3 Max', price: 2499, inStock: true },
            { id: 2, name: 'Logitech MX Master 3S', price: 99, inStock: true },
            { id: 3, name: 'CalDigit TS4 Thunderbolt 4 Dock', price: 379, inStock: false },
            { id: 4, name: 'Keychron K8 Pro Mechanical Keyboard', price: 189, inStock: true },
            { id: 5, name: 'Sony Alpha FX30 Cinema Camera', price: 1799, inStock: true },
            { id: 6, name: 'Dell UltraSharp 32" 4K Monitor', price: 649, inStock: true },
            { id: 7, name: 'iPad Pro 12.9" M2', price: 1099, inStock: true },
            { id: 8, name: 'AirPods Pro (2nd Gen)', price: 249, inStock: false },
        ],
        buildTime: new Date().toISOString(),
    }
}

export default async function SSGDemo() {
    const { products, buildTime } = await getProducts()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← Back to Home
                </Link>

                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">SSG Demo - Static Site Generation</h1>
                    <p className="text-gray-700 mb-4">
                        This page was pre-rendered at build time. All content is static and served instantly.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Rendering Method</div>
                            <div className="font-semibold text-green-600">Static (SSG)</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Generated At</div>
                            <div className="font-semibold">{new Date(buildTime).toLocaleString()}</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">API Calls</div>
                            <div className="font-semibold text-green-600">0 (pre-built)</div>
                        </div>
                    </div>
                </div>

                {/* Store Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Apple Store - Premium Collection</h2>
                            <p className="text-gray-600">Experience the latest Apple products and professional accessories</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Catalog Products</div>
                                <div className="text-2xl font-bold text-green-600">{products.length}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            All Products
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                            Mac
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                            iPad
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                            Accessories
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                            Audio
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-3">Performance Characteristics</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>✅ <strong>Instant load:</strong> HTML is pre-generated</li>
                        <li>✅ <strong>No API calls:</strong> Data fetched at build time</li>
                        <li>✅ <strong>CDN cacheable:</strong> Can be served from edge locations</li>
                        <li>❌ <strong>Static data:</strong> Requires rebuild for updates</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
