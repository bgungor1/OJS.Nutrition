import React from 'react'
import { ordersData, orderDetailsData } from '@/data/order-data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Package, Calendar, Truck, CheckCircle, Clock, XCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import type { Order } from '@/types/order'

function Order() {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null)

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleCloseDetails = (open: boolean) => {
    if (!open) {
      setSelectedOrder(null)
    }
  }

  const selectedOrderDetail = React.useMemo(() => {
    if (!selectedOrder) return null
    return orderDetailsData.find(
      (detail) => detail.orderNumber === selectedOrder.orderNumber
    )
  }, [selectedOrder])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-600" />
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Teslim Edildi'
      case 'shipped':
        return 'Kargoya Verildi'
      case 'processing':
        return 'Hazırlanıyor'
      case 'cancelled':
        return 'İptal Edildi'
      case 'returned':
        return 'İade Edildi'
      default:
        return 'Beklemede'
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default'
      case 'shipped':
        return 'secondary'
      case 'processing':
        return 'outline'
      case 'cancelled':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Package className="w-6 h-6" />
        <h3 className="text-xl sm:text-2xl font-bold">Siparişlerim</h3>
      </div>

      <div className="space-y-4">
        {ordersData.map((order, index) => (
          <div key={order.id}>
            <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Ürün Resmi */}
                <div className="flex-shrink-0">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Sipariş Bilgileri */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                        {order.productName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Sipariş No: {order.orderNumber}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 lg:mt-0">
                      {getStatusIcon(order.status)}
                      <Badge variant={getStatusVariant(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Sipariş Tarihi:</span> {order.orderDate}
                      </span>
                    </div>
                    
                    {order.deliveryDate && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Teslim Tarihi:</span> {order.deliveryDate}
                        </span>
                      </div>
                    )}
                    
                    {order.trackingNumber && (
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Takip No:</span> {order.trackingNumber}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      {order.quantity && (
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">Adet:</span> {order.quantity}
                        </span>
                      )}
                      {order.price && (
                        <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                          ₺{order.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full lg:w-auto"
                      onClick={() => handleOpenDetails(order)}
                    >
                      Detayı Görüntüle
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Son sipariş değilse çizgi ekle */}
            {index < ordersData.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </div>

      {/* Sipariş yoksa */}
      {ordersData.length === 0 && (
        <Card className="p-12 text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
          <Package className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Henüz siparişiniz yok
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            İlk siparişinizi vermek için ürünlerimizi inceleyin
          </p>
          <Button>
            Alışverişe Başla
          </Button>
        </Card>
      )}

      <Dialog open={!!selectedOrder} onOpenChange={handleCloseDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Sipariş Detayı</DialogTitle>
            <DialogDescription>
              Siparişinizin özet bilgilerini aşağıda bulabilirsiniz.
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedOrder.productName}
                  </h3>
                  <p className="text-muted-foreground">
                    Sipariş No: {selectedOrder.orderNumber}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedOrder.status)}
                  <Badge variant={getStatusVariant(selectedOrder.status)}>
                    {getStatusText(selectedOrder.status)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/40 dark:bg-muted/10 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="font-medium text-gray-900 dark:text-white">
                    Sipariş Bilgileri
                  </div>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Sipariş Tarihi:</span> {selectedOrder.orderDate}
                  </p>
                  {selectedOrder.deliveryDate && (
                    <p className="text-muted-foreground">
                      <span className="font-medium">Teslim Tarihi:</span> {selectedOrder.deliveryDate}
                    </p>
                  )}
                  {selectedOrder.trackingNumber && (
                    <p className="text-muted-foreground">
                      <span className="font-medium">Takip No:</span> {selectedOrder.trackingNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="font-medium text-gray-900 dark:text-white">
                    Ödeme Özeti
                  </div>
                  {selectedOrderDetail ? (
                    <>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Ara Toplam:</span> ₺{selectedOrderDetail.subtotal.toFixed(2)}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Kargo:</span> ₺{selectedOrderDetail.shippingCost.toFixed(2)}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">Vergi:</span> ₺{selectedOrderDetail.tax.toFixed(2)}
                      </p>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        Toplam: ₺{selectedOrderDetail.total.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">
                      <span className="font-medium">Toplam:</span> ₺{selectedOrder.price?.toFixed(2) ?? '—'}
                    </p>
                  )}
                </div>
              </div>

              {selectedOrderDetail && (
                <>
                  <div className="space-y-3">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                      Ürünler
                    </h4>
                    <div className="space-y-3">
                      {selectedOrderDetail.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 rounded-md border border-gray-200 dark:border-gray-700 p-3"
                        >
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {item.productName}
                            </p>
                            {item.variant && (
                              <p className="text-xs text-muted-foreground">
                                Seçenek: {item.variant}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Adet: {item.quantity} • Birim Fiyat: ₺{item.unitPrice.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            ₺{item.totalPrice.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-2">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                        Teslimat Adresi
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrderDetail.shippingAddress.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrderDetail.shippingAddress.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrderDetail.shippingAddress.district}, {selectedOrderDetail.shippingAddress.city} {selectedOrderDetail.shippingAddress.postalCode}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tel: {selectedOrderDetail.shippingAddress.phone}
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-2">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                        Ödeme Yöntemi
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrderDetail.paymentMethod.type === 'credit_card'
                          ? `Kredi Kartı • **** ${selectedOrderDetail.paymentMethod.lastFourDigits}`
                          : selectedOrderDetail.paymentMethod.type === 'bank_transfer'
                          ? 'Havale / EFT'
                          : 'Kapıda Ödeme'}
                      </p>
                      {selectedOrderDetail.paymentMethod.cardHolderName && (
                        <p className="text-sm text-muted-foreground">
                          Kart Sahibi: {selectedOrderDetail.paymentMethod.cardHolderName}
                        </p>
                      )}
                    </div>
                  </div>

                  {selectedOrderDetail.notes && (
                    <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-4 bg-muted/40 dark:bg-muted/10">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                        Notlar
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        “{selectedOrderDetail.notes}”
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Order