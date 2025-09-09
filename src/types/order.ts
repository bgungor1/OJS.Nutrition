export interface Order {
  id: string
  orderNumber: string
  productName: string
  productImage: string
  orderDate: string
  status: OrderStatus
  price?: number
  quantity?: number
  trackingNumber?: string
  deliveryDate?: string
}

export type OrderStatus = 
  | "pending" // Beklemede
  | "processing" // Hazırlanıyor
  | "shipped" // Kargoya Verildi
  | "delivered" // Teslim Edildi
  | "cancelled" // İptal Edildi
  | "returned" // İade Edildi

export interface OrderDetail extends Order {
  shippingAddress: {
    fullName: string
    address: string
    city: string
    district: string
    postalCode: string
    phone: string
  }
  billingAddress?: {
    fullName: string
    address: string
    city: string
    district: string
    postalCode: string
    phone: string
  }
  paymentMethod: {
    type: "credit_card" | "bank_transfer" | "cash_on_delivery"
    lastFourDigits?: string
    cardHolderName?: string
  }
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  notes?: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  quantity: number
  unitPrice: number
  totalPrice: number
  variant?: string
}
