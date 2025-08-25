import { FC } from 'react'
import star from '@/assets/yıldız.png'

interface ProductCardProps {
  name: string
  image: string
  description: string
  reviewCount: number
  rating: number
  price: number
  originalPrice?: number
  discountPercentage?: number
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  image,
  description,
  reviewCount,
  rating,
  price,
  originalPrice,
  discountPercentage
}) => {
  return (
    <div className="relative w-full sm:w-auto">
      {/* İndirim Etiketi */}
      {discountPercentage && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
          %{discountPercentage} <span className='block'>İNDİRİM</span>
        </div>
      )}
      
      {/* Ürün Görseli */}
      <img src={image} alt={`${name} görseli`} className="w-full sm:w-auto" />
      
      {/* Ürün Adı */}
      <p className='text-base sm:text-lg font-medium mt-2'>{name}</p>
      
      {/* Ürün Açıklaması */}
      <p className='text-xs sm:text-sm text-muted-foreground mt-1'>
        {description.split('\n').map((line, index) => (
          <span key={index} className="block">{line}</span>
        ))}
      </p>
      
      {/* Yıldız Değerlendirmesi */}
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <img 
            key={index} 
            src={star} 
            alt="yıldız" 
            className={`w-3 h-3 sm:w-4 sm:h-4 ${
              index < rating ? 'opacity-100' : 'opacity-30'
            }`} 
          />
        ))}
      </div>
      
      {/* Yorum Sayısı ve Fiyat */}
      <div className="flex flex-col items-center mt-2">
        <span className="text-xs sm:text-sm text-gray-600">{reviewCount.toLocaleString()} yorum</span>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base sm:text-lg font-bold text-green-600">
            {price.toLocaleString()} TL
          </span>
          
          {originalPrice && (
            <span className="text-sm sm:text-base text-red-400 line-through">
              {originalPrice.toLocaleString()} TL
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
