import { useLoaderData, useSearchParams, Link } from 'react-router-dom'
import ProductCard from '@/components/common/product-card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import type { ApiProduct } from '@/types/api'

interface ProductsLoaderData {
  products: ApiProduct[]
  pagination: {
    count: number
    next: string | null
    previous: string | null
    currentPage: number
    totalPages: number
    limit: number
  }
}

const Products = () => {
  const { products, pagination } = useLoaderData() as ProductsLoaderData
  const [searchParams] = useSearchParams()

  const createPageUrl = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())
    return `?${newSearchParams.toString()}`
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold mb-4'>
          PROTEİN
        </h1>
        <p className='text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
          Vücudun tüm fonksiyonlarını sağlıklı bir şekilde yerine getirmesini sağlayan temel yapı taşlarından biri proteindir. 
          Protein kısaca, bir veya daha fazla amino asit artığından oluşan organik bileşiklerdir.
        </p>
      </div>
      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8'>
        {products.map((product) => {
          // Görsel URL'ini tam URL olarak oluştur
          const imageUrl = `https://fe1111.projects.academy.onlyjs.com${product.photo_src}`
          console.log('🔍 Tam görsel URL:', imageUrl)
          console.log('🔍 Product slug:', product.slug)
          
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={imageUrl}
              description={product.short_explanation}
              reviewCount={product.comment_count}
              rating={product.average_star}
              price={product.price_info.discounted_price || product.price_info.total_price}
              originalPrice={product.price_info.discounted_price ? product.price_info.total_price : undefined}
              discountPercentage={product.price_info.discount_percentage || undefined}
            />
          )
        })}
      </div>

      {/* Shadcn Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination className="mb-8">
          <PaginationContent>
            {/* Önceki Sayfa */}
            {pagination.currentPage > 1 && (
              <PaginationItem>
                <Link to={createPageUrl(pagination.currentPage - 1)}>
                  <PaginationPrevious>
                    Önceki
                  </PaginationPrevious>
                </Link>
              </PaginationItem>
            )}

            {/* Sayfa Numaraları */}
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum: number
              
              if (pagination.totalPages <= 5) {
                pageNum = i + 1
              } else if (pagination.currentPage <= 3) {
                pageNum = i + 1
              } else if (pagination.currentPage >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i
              } else {
                pageNum = pagination.currentPage - 2 + i
              }

              return (
                <PaginationItem key={pageNum}>
                  <Link to={createPageUrl(pageNum)}>
                    <PaginationLink isActive={pageNum === pagination.currentPage}>
                      {pageNum}
                    </PaginationLink>
                  </Link>
                </PaginationItem>
              )
            })}

            {/* Sonraki Sayfa */}
            {pagination.currentPage < pagination.totalPages && (
              <PaginationItem>
                <Link to={createPageUrl(pagination.currentPage + 1)}>
                  <PaginationNext>
                    Sonraki
                  </PaginationNext>
                </Link>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}

      <div className='text-center text-gray-600 dark:text-gray-300'>
        <p>
          Sayfa {pagination.currentPage} / {pagination.totalPages} 
          ({pagination.count} ürün toplam)
        </p>
      </div>
    </div>
  )
}

export default Products
