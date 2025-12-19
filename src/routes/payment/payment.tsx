import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, MapPin, Truck, CreditCard, Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useOrderStore } from '@/store/orderStore'
import { useAddressStore } from '@/store/addressStore'

function Payment() {
  const navigate = useNavigate()

  const { items, getTotalPrice, clearCart } = useCartStore()
  const { completeShopping, fetchShipmentFee, shipmentFee, isLoading } = useOrderStore()
  const { addresses, fetchAddresses } = useAddressStore()

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAddress, setSelectedAddress] = useState('')

  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardType, setCardType] = useState<'VISA' | 'MASTERCARD'>('VISA')

  // Sayfa yüklendiğinde adresleri ve kargo ücretini çek
  useEffect(() => {
    fetchAddresses()
    fetchShipmentFee()
  }, [fetchAddresses, fetchShipmentFee])

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0].id)
    }
  }, [addresses, selectedAddress])

  const subtotal = getTotalPrice()
  const shippingCost = shipmentFee?.fee || 15
  const taxRate = 0.18
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  const steps = [
    { id: 1, title: "Adres", icon: MapPin },
    { id: 2, title: "Kargo", icon: Truck },
    { id: 3, title: "Ödeme", icon: CreditCard }
  ]

  const handleCompleteShopping = async () => {
    if (!selectedAddress || !cardNumber || !cardExpiry || !cardCvv) {
      alert('Lütfen tüm alanları doldurun')
      return
    }

    const success = await completeShopping({
      address_id: selectedAddress,
      payment_type: 'credit_cart',
      card_digits: cardNumber.replace(/\s/g, ''),
      card_expiration_date: cardExpiry,
      card_security_code: cardCvv,
      card_type: cardType
    })

    if (success) {
      clearCart()
      alert('Siparişiniz başarıyla oluşturuldu!')
      navigate('/account/order')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-1 xl:grid-cols-2 min-h-screen">
        {/* Sol taraf */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Ödeme</h1>

            {/* Adım göstergesi */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-400'
                    }`}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-xs sm:text-sm font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                      }`} />
                  )}
                </div>
              ))}
            </div>

            {/* ADIM 1: Adres Seçimi */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Teslimat Adresi</h2>

                {addresses.length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-gray-500 mb-4">Kayıtlı adresiniz yok</p>
                    <Button onClick={() => navigate('/account/addresses')}>
                      Adres Ekle
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <Card
                        key={address.id}
                        className={`p-4 cursor-pointer border-2 transition-colors ${selectedAddress === address.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-600'
                          }`}
                        onClick={() => setSelectedAddress(address.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {address.first_name} {address.last_name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{address.full_address}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{address.phone_number}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedAddress === address.id
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
                )}

                <Button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedAddress}
                >
                  Kargo ile Devam Et
                </Button>
              </div>
            )}

            {/* ADIM 2: Kargo Bilgisi */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Kargo Bilgisi</h2>
                <Card className="p-4 border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Standart Kargo</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">2-3 iş günü içinde teslim</p>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      ₺{shippingCost.toFixed(2)}
                    </span>
                  </div>
                </Card>

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

            {/* ADIM 3: Ödeme Bilgileri */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Kart Bilgileri</h2>

                {/* Kart Tipi Seçimi */}
                <div className="flex gap-4 mb-4">
                  <Button
                    variant={cardType === 'VISA' ? 'default' : 'outline'}
                    onClick={() => setCardType('VISA')}
                    className="flex-1"
                  >
                    VISA
                  </Button>
                  <Button
                    variant={cardType === 'MASTERCARD' ? 'default' : 'outline'}
                    onClick={() => setCardType('MASTERCARD')}
                    className="flex-1"
                  >
                    MASTERCARD
                  </Button>
                </div>

                {/* Kart Numarası */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="cardNumber">Kart Numarası</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>

                {/* Son Kullanma ve CVV */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Son Kullanma</Label>
                    <Input
                      id="expiry"
                      placeholder="MM-YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={3}
                      type="password"
                    />
                  </div>
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
                    onClick={handleCompleteShopping}
                    disabled={isLoading || !cardNumber || !cardExpiry || !cardCvv}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        İşleniyor...
                      </>
                    ) : (
                      'Siparişi Tamamla'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sağ taraf - Sipariş Özeti */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 lg:p-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">Sipariş Özeti</h2>

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
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                        ₺{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Separator className="my-6" />

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