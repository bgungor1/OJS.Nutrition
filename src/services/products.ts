import { apiClient } from './api'
import type { ApiProductsResponse, ApiProductDetailResponse } from '@/types/api'

export interface ProductsParams {
  page?: number
  limit?: number
}

export const productsApi = {
  getProducts: async (params: ProductsParams = {}): Promise<ApiProductsResponse> => {
    try {
      const { page = 1, limit =12 } = params
      const offset = (page - 1) * limit
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      })
      
      const response = await apiClient.get<ApiProductsResponse>(`/products?${queryParams}`)
      return response
    } catch (error) {
      console.error('Products API hatası:', error)
      throw error
    }
  },

  getProductBySlug: async (slug: string): Promise<ApiProductDetailResponse> => {
    try {
      const response = await apiClient.get<ApiProductDetailResponse>(`/products/${slug}`)
      return response
    } catch (error) {
      console.error('Product detail API hatası:', error)
      throw error
    }
  }
}
