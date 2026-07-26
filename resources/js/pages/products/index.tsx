import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Product } from '@/types/product';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await api.get('/products');

                setProducts(response.data.data);
            } catch (error) {
                console.error('Gagal mengambil data product:', error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="mb-6 text-3xl font-bold">
                Daftar Product
            </h1>

            {products.length === 0 ? (
                <p>Belum ada product</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <div key={product.id}>
                            <h2>{product.nama}</h2>
                            <p>Harga: Rp {product.harga}</p>
                            <p>Stok: {product.stok}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}