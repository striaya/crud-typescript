export interface Product {
    id: number;
    nama: string;
    harga: number;
    stok: number;
    deskripsi: string;
    created_at: string;
    updated_at: string;
}

export interface ProductResponse {
    nama: string;
    harga: number;
    stok: number;
    deskripsi: string;
}