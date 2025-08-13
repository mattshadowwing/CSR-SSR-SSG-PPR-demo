import Link from 'next/link'
import ProductCard from '@/app/components/ProductCard'
import type { Product } from '@/app/types'

// Enable ISR with revalidation
export const revalidate = 30 // Revalidate every 30 seconds

interface ISRData {
    products: Product[];
    lastRevalidated: string;
    totalProducts: number;
}

// This function runs at build time AND on revalidation
async function getProducts(): Promise<ISRData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // In a real app, this would fetch from a CMS/database
    const products: Product[] = [
        { id: 1, name: 'Gaming Laptop Pro', price: 1899, inStock: true },
        { id: 2, name: 'Wireless Gaming Mouse', price: 79, inStock: true },
        { id: 3, name: 'RGB Mechanical Keyboard', price: 149, inStock: true },
        { id: 4, name: '32" 4K Monitor', price: 599, inStock: false },
        { id: 5, name: 'Wireless Headset', price: 199, inStock: true },
        { id: 6, name: 'USB-C Docking Station', price: 249, inStock: true },
        // Simulate dynamic inventory changes
        { id: 7, name: 'Graphics Card RTX 4090', price: 1599, inStock: Math.random() > 0.3 },
        { id: 8, name: 'High-Speed SSD 2TB', price: 299, inStock: Math.random() > 0.2 },
    ]
    
    return {
        products,
        lastRevalidated: new Date().toISOString(),
        totalProducts: products.length,
    }
}

export default async function ISRDemo() {
    const { products, lastRevalidated, totalProducts } = await getProducts()
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← Back to Home
                </Link>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">ISR Demo - Incremental Static Regeneration</h1>
                    <p className="text-gray-700 mb-4">
                        This page combines the benefits of SSG and SSR. Pre-rendered at build time, then regenerated in the background.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Rendering Method</div>
                            <div className="font-semibold text-yellow-600">Incremental (ISR)</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Last Revalidated</div>
                            <div className="font-semibold">{new Date(lastRevalidated).toLocaleString()}</div>
                        </div>
                        <div className="bg-white rounded p-3">
                            <div className="text-gray-500">Revalidation</div>
                            <div className="font-semibold text-yellow-600">Every 30s</div>
                        </div>
                    </div>
                </div>

                {/* Store Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">TechStore - Premium Electronics</h2>
                            <p className="text-gray-600">Discover the latest in technology and gaming gear</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Total Products</div>
                                <div className="text-2xl font-bold text-yellow-600">{totalProducts}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                            All Products
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                            Laptops
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                            Accessories
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                            Gaming
                        </span>
                        <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer">
                            Monitors
                        </span>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* ISR Information */}
                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-3">ISR Performance Characteristics</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>✅ <strong>Fast initial load:</strong> Pre-generated like SSG</li>
                        <li>✅ <strong>Fresh content:</strong> Automatically updates in background</li>
                        <li>✅ <strong>Scale-friendly:</strong> Serves cached version while regenerating</li>
                        <li>✅ <strong>SEO optimized:</strong> Content is in initial HTML</li>
                        <li>📝 <strong>Stale-while-revalidate:</strong> Shows cached content while updating</li>
                        <li>⚙️ <strong>Configurable:</strong> Set revalidation time per route</li>
                    </ul>
                    
                    <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
                        <h3 className="font-semibold mb-2">Try This:</h3>
                        <p className="text-sm">
                            Refresh this page multiple times. Notice some products may change stock status due to simulated inventory updates. 
                            The page regenerates every 30 seconds with fresh data while serving the cached version instantly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
