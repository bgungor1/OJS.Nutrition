import { apiClient } from './api'
import type { ApiBestSellerResponse } from '@/types/api'

export const bestSellersApi = {
  getBestSellers: async (): Promise<ApiBestSellerResponse> => {
    try {
      const response = await apiClient.get<ApiBestSellerResponse>('/products/best-sellers')
      return response
    } catch (error) {
      console.error('Best sellers API hatası:', error)
      throw error
    }
  }
}
