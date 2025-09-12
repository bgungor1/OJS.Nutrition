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

// Products API için yeni tipler
export interface ApiProductsResponse {
  status: "success" | "error"
  data: {
    count: number
    next: string | null
    previous: string | null
    results: ApiProduct[]
  }
}

export interface ApiProduct {
  id: string
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
