import type { Product } from '@/app/types'

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-3">${product.price}</p>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
            }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
        </div>
    )
}