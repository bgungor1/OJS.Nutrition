import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Check, MapPin, Truck, CreditCard } from 'lucide-react'
import {
  savedAddresses, 
  shippingOptions, 
  paymentMethods,
} from '@/data/payment-data'
import { useCartStore } from '@/store/cartStore'

function Payment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id)
  const [selectedShipping, setSelectedShipping] = useState("standard")
  const [selectedPayment, setSelectedPayment] = useState("credit_card")

  const { items, getTotalPrice } = useCartStore()

  const subtotal = getTotalPrice()
  const shippingCost = shippingOptions.find(s => s.id === selectedShipping)?.price || 15
  const taxRate = 0.18 // KDV oranı %18
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  const steps = [
    { id: 1, title: "Adres", icon: MapPin },
    { id: 2, title: "Kargo", icon: Truck },
    { id: 3, title: "Ödeme", icon: CreditCard }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen">
        {/* Sol taraf - Beyaz bölüm */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Ödeme</h1>
            
            {/* Adım göstergesi */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-xs sm:text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Adres Seçimi */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Teslimat Adresi</h2>
                <div className="space-y-4">
                  {savedAddresses.map((address) => (
                    <Card 
                      key={address.id}
                      className={`p-4 cursor-pointer border-2 transition-colors ${
                        selectedAddress === address.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900">{address.fullName}</h3>
                            {address.isDefault && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Varsayılan
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-1">{address.address}</p>
                          <p className="text-gray-600 text-sm">
                            {address.district}, {address.city} {address.postalCode}
                          </p>
                          <p className="text-gray-600 text-sm">{address.phone}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAddress === address.id 
                            ? 'border-blue-600 bg-blue-600' 
                            : 'border-gray-300'
                        }`}>
                          {selectedAddress === address.id && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <Button 
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setCurrentStep(2)}
                >
                  Kargo ile Devam Et
                </Button>
              </div>
            )}

            {/* Kargo Seçimi */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Kargo Seçenekleri</h2>
                <div className="space-y-4">
                  {shippingOptions.map((shipping) => (
                    <Card 
                      key={shipping.id}
                      className={`p-4 cursor-pointer border-2 transition-colors ${
                        selectedShipping === shipping.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedShipping(shipping.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{shipping.name}</h3>
                          <p className="text-sm text-gray-600">{shipping.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-semibold text-gray-900">₺{shipping.price}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedShipping === shipping.id 
                              ? 'border-blue-600 bg-blue-600' 
                              : 'border-gray-300'
                          }`}>
                            {selectedShipping === shipping.id && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setCurrentStep(1)}
                  >
                    Geri
                  </Button>
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setCurrentStep(3)}
                  >
                    Ödeme ile Devam Et
                  </Button>
                </div>
              </div>
            )}

            {/* Ödeme Seçimi */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ödeme Yöntemi</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <Card 
                      key={method.id}
                      className={`p-4 cursor-pointer border-2 transition-colors ${
                        selectedPayment === method.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {method.icon === "CreditCard" && <CreditCard className="w-6 h-6 text-gray-600" />}
                          {method.icon === "Bank" && (
                            <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">₺</span>
                            </div>
                          )}
                          {method.icon === "Cash" && (
                            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">₺</span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium text-gray-900">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id 
                            ? 'border-blue-600 bg-blue-600' 
                            : 'border-gray-300'
                        }`}>
                          {selectedPayment === method.id && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setCurrentStep(2)}
                  >
                    Geri
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      // Ödeme işlemi burada yapılacak
                      alert('Ödeme başarıyla tamamlandı!')
                    }}
                  >
                    Siparişi Tamamla
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sağ taraf - Gri bölüm */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 lg:p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">Sipariş Özeti</h2>
            
            {/* Sepet ürünleri */}
            <div className="space-y-4 mb-6">
              {items.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Sepetiniz boş.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-600 rounded-lg">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs">
                        {item.quantity}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h3>
                      {/* <p className="text-xs text-gray-600 dark:text-gray-300">{item.variant}</p> */}
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                        ₺{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Separator className="my-6" />

            {/* Fiyat özeti */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Ara Toplam</span>
                <span className="text-gray-900 dark:text-white">₺{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Kargo</span>
                <span className="text-gray-900 dark:text-white">₺{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">KDV (%18)</span>
                <span className="text-gray-900 dark:text-white">₺{tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">Toplam</span>
                <span className="text-gray-900 dark:text-white">₺{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment