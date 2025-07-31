export interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

export interface User {
    name: string;
    email: string;
    membership: string;
    lastLogin: string;
}

export interface Stats {
    totalVisits: number;
    activeUsers: number;
    conversionRate: string;
    revenue: string;
}

export interface ApiResponse<T> {
    timestamp: string;
    requestId?: string;
}

export interface ProductsResponse extends ApiResponse<Product[]> {
    products: Product[];
}

export interface UserResponse extends ApiResponse<User> {
    user: User;
}

export interface StatsResponse extends ApiResponse<Stats> {
    stats: Stats;
}