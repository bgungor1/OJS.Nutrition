import { type Order, type OrderDetail } from "@/types/order"

export const ordersData: Order[] = [
  {
    id: "1",
    orderNumber: "427795",
    productName: "DEEP SLEEP",
    productImage: "/src/assets/order/1071d4920ccb378e947ad27c8fb333b1c39f9ba4.jpg",
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
    productImage: "/src/assets/order/4e89226adabe52f9accd071d9601b34b1f6378c9.jpg",
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
    productImage: "/src/assets/order/820ce10366f959283b14b4c6ab04680623066ae9.jpg",
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
    productImage: "/src/assets/order/b87a02f9cfa93fee17a80f31d4ff368f6d67c410.jpg",
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
    productImage: "/src/assets/order/1071d4920ccb378e947ad27c8fb333b1c39f9ba4.jpg",
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
        productImage: "/src/assets/order/1071d4920ccb378e947ad27c8fb333b1c39f9ba4.jpg",
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
    productImage: "/src/assets/order/4e89226adabe52f9accd071d9601b34b1f6378c9.jpg",
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
        productImage: "/src/assets/order/4e89226adabe52f9accd071d9601b34b1f6378c9.jpg",
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
