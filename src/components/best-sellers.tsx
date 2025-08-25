import ProductCard from './common/product-card'
import { bestSellersData } from '@/data/best-sellers-data'

export default function BestSellers() {
  return (
    <div className='mt-5 justify-items-center text-center px-2 sm:px-4'>
      <h1 className="mb-2 text-base sm:text-lg font-semibold">ÇOK SATANLAR</h1>
      <div className='mb-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 justify-items-center'>
        {bestSellersData.map((product) => (
          <ProductCard
            key={product.id}
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
  )
}
