import type { FC } from 'react'
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
    <div className="relative w-full flex flex-col items-center">
      {/* İndirim Etiketi */}
      {discountPercentage && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
          %{discountPercentage} <span className='block'>İNDİRİM</span>
        </div>
      )}
      
      {/* Ürün Görseli */}
      <img src={image} alt={`${name} görseli`} className="w-full h-auto object-contain" />
      
      {/* Ürün Adı */}
      <p className='text-sm sm:text-base font-medium mt-2 text-center'>{name}</p>
      
      {/* Ürün Açıklaması */}
      <div className='text-xs text-muted-foreground mt-1 text-center'>
        {description.split('\n').map((line, index) => (
          <p key={index} className="block">{line}</p>
        ))}
      </div>
      
      {/* Yıldız Değerlendirmesi */}
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <img 
            key={index} 
            src={star} 
            alt="yıldız" 
            className={`w-3 h-3 ${
              index < rating ? 'opacity-100' : 'opacity-30'
            }`} 
          />
        ))}
      </div>
      
      {/* Yorum Sayısı ve Fiyat */}
      <div className="flex flex-col items-center mt-2">
        <span className="text-xs text-gray-600">{reviewCount.toLocaleString()} yorum</span>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-green-600">
            {price.toLocaleString()} TL
          </span>
          
          {originalPrice && (
            <span className="text-xs text-red-400 line-through">
              {originalPrice.toLocaleString()} TL
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
