import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Package, Calendar, Truck, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useOrderStore } from '@/store/orderStore'
import type { Order as OrderType } from '@/types/order'

function Order() {
  const { orders, isLoading, error, fetchOrders } = useOrderStore()
  const [selectedOrder, setSelectedOrder] = React.useState<OrderType | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleOpenDetails = (order: OrderType) => {
    setSelectedOrder(order)
  }

  const handleCloseDetails = (open: boolean) => {
    if (!open) {
      setSelectedOrder(null)
    }
  }

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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => fetchOrders()}>Tekrar Dene</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Package className="w-6 h-6" />
        <h3 className="text-xl sm:text-2xl font-bold">Siparişlerim</h3>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={order.order_no}>
            <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Sipariş Bilgileri */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                        Sipariş #{order.order_no}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {order.cart_detail?.length || 0} ürün
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 lg:mt-0">
                      {getStatusIcon(order.order_status)}
                      <Badge variant={getStatusVariant(order.order_status)}>
                        {getStatusText(order.order_status)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Tarih:</span> {new Date(order.created_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      ₺{order.total_price?.toFixed(2) || '0.00'}
                    </span>

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

            {index < orders.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </div>

      {/* Sipariş yoksa */}
      {orders.length === 0 && (
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

      {/* Sipariş Detay Modal */}
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
                    Sipariş #{selectedOrder.order_no}
                  </h3>
                  <p className="text-muted-foreground">
                    {new Date(selectedOrder.created_at).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedOrder.order_status)}
                  <Badge variant={getStatusVariant(selectedOrder.order_status)}>
                    {getStatusText(selectedOrder.order_status)}
                  </Badge>
                </div>
              </div>

              {/* Ürünler */}
              {selectedOrder.cart_detail && selectedOrder.cart_detail.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                    Ürünler
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.cart_detail.map((item: any) => {
                      console.log('📦 Cart Detail Item:', item)
                      return (
                        <div
                          key={item.variant_id}
                          className="flex items-center gap-4 rounded-md border border-gray-200 dark:border-gray-700 p-3"
                        >
                          {item.photo_src && (
                            <img
                              src={`https://fe1111.projects.academy.onlyjs.com${item.photo_src}`}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </p>
                            {item.variant_name && (
                              <p className="text-xs text-muted-foreground">
                                Seçenek: {item.variant_name}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              Adet: {item.pieces} • Birim Fiyat: ₺{Number(item.unit_price || 0).toFixed(2)}
                            </p>
                          </div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            ₺{Number(item.total_price || 0).toFixed(2)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Özet */}
              <div className="bg-muted/40 dark:bg-muted/10 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Kargo:</span>
                  <span>₺{selectedOrder.shipping_fee?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between font-semibold text-base">
                  <span>Toplam:</span>
                  <span>₺{selectedOrder.total_price?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
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
