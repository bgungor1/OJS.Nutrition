import ProductCard from './common/product-card'
import type { ApiBestSellerProduct } from '@/types/api'

interface BestSellersProps {
  products?: ApiBestSellerProduct[]
}

export default function BestSellers({products}: BestSellersProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">EN ÇOK SATANLAR</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Ürünler yükleniyor...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">EN ÇOK SATANLAR</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Müşterilerimizin en çok tercih ettiği ürünler</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 items-stretch">
          {products.map((product) => {
            // Görsel URL'ini test edelim
            const imageUrl = `https://fe1111.projects.academy.onlyjs.com${product.photo_src}`
            console.log('🔍 Tam görsel URL:', imageUrl)
            console.log('🔍 Product slug:', product.slug)
            
            return (
                <ProductCard
                  key={product.slug}
                  id={product.slug}
                  name={product.name}
                image={imageUrl}
                description={product.short_explanation}
                reviewCount={product.comment_count}
                rating={product.average_star}
                price={product.price_info.total_price}
                originalPrice={product.price_info.discounted_price || undefined}
                discountPercentage={product.price_info.discount_percentage || undefined}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}