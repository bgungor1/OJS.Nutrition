import React from 'react'
import star from '@/assets/yıldız.png'

export default function TrustGuarantee() {
  return (
    <div className="bg-neutral-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Trust Elements */}
          <div className="text-white">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, index) => (
                <img key={index} src={star} alt="yıldız" className="w-6 h-6" />
              ))}
              <span className="text-yellow-400 font-medium">(140.000+)</span>
            </div>
            
            {/* Trust Statements */}
            <div className="space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold">
                LABORATUVAR TESTLİ ÜRÜNLER
              </h3>
              <h3 className="text-2xl lg:text-3xl font-bold">
                AYNI GÜN & ÜCRETSİZ KARGO
              </h3>
              <h3 className="text-2xl lg:text-3xl font-bold">
                MEMNUNİYET GARANTİSİ
              </h3>
            </div>
          </div>
          
          {/* Right Column - Description */}
          <div className="text-white">
            <p className="text-lg leading-relaxed">
              200.000'den fazla ürün yorumumuza dayanarak, ürünlerimizi seveceğinize eminiz. 
              Eğer herhangi bir sebeple memnun kalmazsan, bizimle iletişime geçtiğinde 
              çözüme kavuşturacağız.
            </p>
            
            {/* Additional trust indicators */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-500">200K+</div>
                <div className="text-sm text-neutral-300">Müşteri Yorumu</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-500">%99</div>
                <div className="text-sm text-neutral-300">Memnuniyet Oranı</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 