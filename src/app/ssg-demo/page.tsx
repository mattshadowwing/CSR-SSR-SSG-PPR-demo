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
            { id: 1, name: 'Premium Laptop', price: 1299, inStock: true },
            { id: 2, name: 'Wireless Mouse', price: 49, inStock: true },
            { id: 3, name: 'USB-C Hub', price: 79, inStock: false },
            { id: 4, name: 'Mechanical Keyboard', price: 159, inStock: true },
            { id: 5, name: '4K Webcam', price: 199, inStock: true },
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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