import type { Product } from '@/app/types'

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Generate a random rating for demo purposes
    const rating = Math.floor(Math.random() * 2) + 4 // 4-5 stars
    const reviews = Math.floor(Math.random() * 500) + 50

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Product Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-gray-500 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-400 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="text-sm">Product Image</div>
                </div>
            </div>

            <div className="p-6">
                {/* Product Name */}
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gray-900">${product.price}</div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                    <button
                        disabled={!product.inStock}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            product.inStock
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}
