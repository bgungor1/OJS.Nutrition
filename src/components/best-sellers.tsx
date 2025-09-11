import ProductCard from './common/product-card'
import { bestSellersData } from '@/data/best-sellers-data'

export default function BestSellers() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">EN ÇOK SATANLAR</h2>
          <p className="text-lg text-gray-600">Müşterilerimizin en çok tercih ettiği ürünler</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {bestSellersData.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id} // ID'yi ekledik
              name={product.name}
              image={product.image}
              description={product.description}
              reviewCount={product.reviewCount}
              rating={product.rating}
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercentage={product.discountPercentage}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
