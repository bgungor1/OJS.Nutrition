import { Order, OrderDetail } from "@/types/order"

export const ordersData: Order[] = [
  {
    id: "1",
    orderNumber: "427795",
    productName: "DEEP SLEEP",
    productImage: "/src/assets/creatine.png", // Geçici olarak mevcut bir resim
    orderDate: "31 Mart 2023",
    status: "delivered",
    price: 299.99,
    quantity: 1,
    trackingNumber: "TRK427795",
    deliveryDate: "5 Nisan 2023"
  },
  {
    id: "2", 
    orderNumber: "290405",
    productName: "MELATONIN - GÜNLÜK VİTAMİN PAKETİ - BROMELAIN",
    productImage: "/src/assets/gunluk-vitamin-paketi.png",
    orderDate: "14 Aralık 2022",
    status: "delivered",
    price: 189.99,
    quantity: 1,
    trackingNumber: "TRK290405",
    deliveryDate: "20 Aralık 2022"
  },
  {
    id: "3",
    orderNumber: "255564", 
    productName: "GAMER HACK - DETOX PAKETİ",
    productImage: "/src/assets/fitness-paketi.png",
    orderDate: "19 Kasım 2022",
    status: "delivered",
    price: 149.99,
    quantity: 1,
    trackingNumber: "TRK255564",
    deliveryDate: "25 Kasım 2022"
  },
  {
    id: "4",
    orderNumber: "190462",
    productName: "CREAM OF RICE", 
    productImage: "/src/assets/rice-of-cream.png",
    orderDate: "1 Ekim 2022",
    status: "delivered",
    price: 79.99,
    quantity: 2,
    trackingNumber: "TRK190462",
    deliveryDate: "7 Ekim 2022"
  },
  {
    id: "5",
    orderNumber: "500123",
    productName: "WHEY PROTEIN - ÇİKOLATA",
    productImage: "/src/assets/whey-protein.jpg",
    orderDate: "15 Ocak 2024",
    status: "shipped",
    price: 399.99,
    quantity: 1,
    trackingNumber: "TRK500123"
  },
  {
    id: "6",
    orderNumber: "500124",
    productName: "CREATINE MONOHYDRATE",
    productImage: "/src/assets/creatine.png",
    orderDate: "20 Ocak 2024",
    status: "processing",
    price: 199.99,
    quantity: 1
  }
]

export const orderDetailsData: OrderDetail[] = [
  {
    id: "1",
    orderNumber: "427795",
    productName: "DEEP SLEEP",
    productImage: "/src/assets/creatine.png",
    orderDate: "31 Mart 2023",
    status: "delivered",
    price: 299.99,
    quantity: 1,
    trackingNumber: "TRK427795",
    deliveryDate: "5 Nisan 2023",
    shippingAddress: {
      fullName: "Ahmet Yılmaz",
      address: "Atatürk Mahallesi, Cumhuriyet Caddesi No: 45 Daire: 8",
      city: "İstanbul",
      district: "Kadıköy",
      postalCode: "34710",
      phone: "0555 123 45 67"
    },
    paymentMethod: {
      type: "credit_card",
      lastFourDigits: "1234",
      cardHolderName: "Ahmet Yılmaz"
    },
    items: [
      {
        id: "item1",
        productId: "prod1",
        productName: "DEEP SLEEP",
        productImage: "/src/assets/creatine.png",
        quantity: 1,
        unitPrice: 299.99,
        totalPrice: 299.99,
        variant: "60 Kapsül"
      }
    ],
    subtotal: 299.99,
    shippingCost: 0,
    tax: 0,
    total: 299.99,
    notes: "Hızlı teslimat için teşekkürler!"
  },
  {
    id: "2",
    orderNumber: "290405",
    productName: "MELATONIN - GÜNLÜK VİTAMİN PAKETİ - BROMELAIN",
    productImage: "/src/assets/gunluk-vitamin-paketi.png",
    orderDate: "14 Aralık 2022",
    status: "delivered",
    price: 189.99,
    quantity: 1,
    trackingNumber: "TRK290405",
    deliveryDate: "20 Aralık 2022",
    shippingAddress: {
      fullName: "Ahmet Yılmaz",
      address: "Atatürk Mahallesi, Cumhuriyet Caddesi No: 45 Daire: 8",
      city: "İstanbul",
      district: "Kadıköy",
      postalCode: "34710",
      phone: "0555 123 45 67"
    },
    paymentMethod: {
      type: "credit_card",
      lastFourDigits: "1234",
      cardHolderName: "Ahmet Yılmaz"
    },
    items: [
      {
        id: "item2",
        productId: "prod2",
        productName: "MELATONIN - GÜNLÜK VİTAMİN PAKETİ - BROMELAIN",
        productImage: "/src/assets/gunluk-vitamin-paketi.png",
        quantity: 1,
        unitPrice: 189.99,
        totalPrice: 189.99,
        variant: "30 Günlük Paket"
      }
    ],
    subtotal: 189.99,
    shippingCost: 0,
    tax: 0,
    total: 189.99
  }
]
