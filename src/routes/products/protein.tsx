import React from 'react'
import { proteinData } from '@/data/protein-data'
import ProductCard from '@/components/common/product-card'
const Protein = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
   <div className='text-center mb-8'>
    <h1 className='text-4xl font-bold mb-4'>
      PROTEİN
    </h1>
       <p className='text-gray-600 max-w-3xl mx-auto'>
       Vücudun tüm fonksiyonlarını sağlıklı bir şekilde yerine getirmesini sağlayan temel yapı taşlarından biri proteindir. 
       Protein kısaca, bir veya daha fazla amino asit artığından oluşan organik bileşiklerdir.
       </p>
   </div>
   <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8'>
    {proteinData.map((product) =>(
      <ProductCard
       key={product.id}
       id={product.id}
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

   <div className='text-center text-gray-600'>
    <p className=''>Toplam {proteinData.length} ürün görüntüleniyor</p>
   </div>
    </div>
  )
}

export default Protein
