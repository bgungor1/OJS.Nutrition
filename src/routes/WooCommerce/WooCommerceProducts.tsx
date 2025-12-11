import { useState, useEffect } from 'react';
import WooCommerceRest from "@woocommerce/woocommerce-rest-api";
import type { WooCommerceProduct } from '../../types/api';

// 1. WooCommerce Bağlantı Ayarları
const api = new WooCommerceRest({
    url: import.meta.env.VITE_WOOCOMMERCE_URL,
    consumerKey: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: import.meta.env.VITE_WOOCOMMERCE_CONSUMER_SECRET,
    version: "wc/v3"
});

function WooCommerceProducts() {
  const [products, setProducts] = useState<WooCommerceProduct[]>([]);

  useEffect(() => {
    // 2. Ürünleri Çekme Fonksiyonu
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get("products", {
      per_page: 20, // 20 ürün getir
    })
    .then((response) => {
      if (response.status === 200) {
        setProducts(response.data);
      }
    })
    .catch((error) => {
      console.log("Hata oluştu:", error);
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">WooCommerce Ürünleri</h1>
      
      <div className="flex flex-wrap gap-5">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 w-52 shadow-sm hover:shadow-md transition-shadow">
            {/* Ürün görseli varsa göster */}
            {product.images.length > 0 && (
              <img src={product.images[0].src} alt={product.name} className="w-full h-40 object-cover mb-2 rounded-md" />
            )}
            <h3>{product.name}</h3>
            
            {/* HTML etiketlerini temizleyerek fiyatı göster */}
            <div dangerouslySetInnerHTML={{ __html: product.price_html }} />
            
            <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Sepete Ekle</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WooCommerceProducts;
