import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Product } from '@/types/product';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        nama: '',
        harga: '',
        stok: '',
        deskripsi: '',
    });

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log ("Berhasil");

        try {
            await api.post('/products', {
                nama: form.nama,
                harga: Number(form.harga),
                stok: Number(form.stok),
                deskripsi: form.deskripsi,
            });

            alert('Product berhasil ditambahkan!');

            setForm({
                nama: '',
                harga: '',
                stok: '',
                deskripsi: '',
            });

            window.location.reload();
        } catch (error) {
            console.error('Gagal menambahkan product:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="mb-6 text-3xl font-bold">
                Daftar Product
            </h1>

            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div>
                    <input
                        type="text"
                        name="nama"
                        placeholder="Nama Product"
                        value={form.nama}
                        onChange={handleChange}
                        className="border p-2"
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="harga"
                        placeholder="Harga"
                        value={form.harga}
                        onChange={handleChange}
                        className="border p-2"
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="stok"
                        placeholder="Stok"
                        value={form.stok}
                        onChange={handleChange}
                        className="border p-2"
                    />
                </div>

                <div>
                    <textarea
                        name="deskripsi"
                        placeholder="Deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        className="border p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
                >
                    Tambah Product
                </button>
            </form>

            {products.length === 0 ? (
                <p>Belum ada product</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="mb-4 border p-4"
                        >
                            <h2 className="text-xl font-bold">
                                {product.nama}
                            </h2>

                            <p>Harga: Rp {product.harga}</p>
                            <p>Stok: {product.stok}</p>
                            <p>
                                Deskripsi: {product.deskripsi}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}