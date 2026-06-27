import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../api/products';
import axios from 'axios';

interface ProductsContextType {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    selectedProduct: Product | null;
    nameFilter: string;
    totalItems: number | null;
    setNameFilter: (name: string) => void;
    fetchProducts: () => void;
    setSelectedProduct: (product: Product | null) => void;
    filteredProducts: Product[];
}

const ProductsCtx = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalItems, setTotalItems] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [nameFilter, setNameFilter] = useState('');
    
    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getProducts();
            setProducts(data.products);
            setTotalItems(data.total);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            setError('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const filteredProducts = useMemo(() => {
        const q = nameFilter.toLowerCase();
        if (!q) return products;
        return products.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tags.some(t => t.includes(q))
        );
    }, [nameFilter, products]);
    
    return (
        <ProductsCtx.Provider value={{ products, isLoading, error, selectedProduct, nameFilter, totalItems, setNameFilter, fetchProducts, setSelectedProduct, filteredProducts}}>
            {children}
        </ProductsCtx.Provider>
    );
};

export const useProductsContext = () => {
    const ctx = useContext(ProductsCtx);
    if (!ctx) throw new Error('useProductsContext must be used inside ProductsProvider');
    return ctx;
};
