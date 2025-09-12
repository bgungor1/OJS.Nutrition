// API Response interface'leri
export interface ApiBestSellerResponse {
  status: "success" | "error"
  data: ApiBestSellerProduct[]
}

export interface ApiBestSellerProduct {
  name: string
  short_explanation: string
  slug: string
  price_info: {
    profit: number | null
    total_price: number
    discounted_price: number | null
    price_per_servings: number | null
    discount_percentage: number | null
  }
  photo_src: string
  comment_count: number
  average_star: number
}
