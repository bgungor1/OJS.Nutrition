import { productsApi } from '@/services/products'

export const productsLoader = async ({ request }: { request: Request }) => {
  try {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '12')
    
    const productsData = await productsApi.getProducts({ page, limit })
    
    return {
      products: productsData.data.results,
      pagination: {
        count: productsData.data.count,
        next: productsData.data.next,
        previous: productsData.data.previous,
        currentPage: page,
        totalPages: Math.ceil(productsData.data.count / limit),
        limit
      }
    }
  } catch (error) {
    console.error('Products loader hatası:', error)
    throw new Error('Ürünler yüklenemedi')
  }
}