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

// Ürün detay API için yeni tipler
export interface ApiProductDetailResponse {
  status: "success" | "error"
  data: ApiProductDetail
}

export interface ApiProductDetail {
  id: string
  name: string
  slug: string
  short_explanation: string
  explanation: {
    usage: string
    features: string
    description: string
    nutritional_content: {
      ingredients: Array<{
        aroma: string
        value: string
      }>
      nutrition_facts: {
        ingredients: Array<{
          name: string
          amounts: string[]
        }>
        portion_sizes: string[]
      }
      amino_acid_facts: {
        ingredients: Array<{
          name: string
          amounts: string[]
        }>
        portion_sizes: string[]
      }
    }
  }
  main_category_id: string
  sub_category_id: string
  tags: string[]
  variants: ApiProductVariant[]
  comment_count: number
  average_star: number
}

export interface ApiProductVariant {
  id: string
  size: {
    gram: number
    pieces: number
    total_services: number
  }
  aroma: string
  price: {
    profit: number | null
    total_price: number
    discounted_price: number | null
    price_per_servings: number
    discount_percentage: number | null
  }
  photo_src: string
  is_available: boolean
}
