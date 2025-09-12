import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, getRelatedProducts } from '@/data/product-detail-data'
import { bestSellersData } from '@/data/best-sellers-data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ProductCard from '@/components/common/product-card'
import ProductReviews from '@/components/product-reviews'
import { 
  Star, 
  Plus, 
  Minus,
  ChevronDown,
  ShoppingCart,
  Truck,
  Users, 
  CheckCircle
} from 'lucide-react'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [selectedFlavor, setSelectedFlavor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [expandedSections, setExpandedSections] = useState({
    features: false,
    nutrition: false,
    usage: false
  })

  const product = getProductById(Number(id))
  const relatedProducts = getRelatedProducts(6)

  // İlk yüklemede varsayılan seçimleri ayarla
  useEffect(() => {
    if (product) {
      if (product.flavors.length > 0 && !selectedFlavor) {
        setSelectedFlavor(product.selectedFlavor || product.flavors[0].id)
      }
      if (product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.selectedSize || product.sizes[0].id)
      }
    }
  }, [product, selectedFlavor, selectedSize])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Aradığınız ürün mevcut değil.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    )
  }

  const selectedSizeData = product.sizes.find(size => size.id === selectedSize)
  const currentPrice = selectedSizeData?.price || product.price
  const currentOriginalPrice = selectedSizeData?.originalPrice || product.originalPrice

  const handleAddToCart = () => {
    console.log('Sepete eklendi:', { 
      product: product.name, 
      quantity,
      flavor: selectedFlavor,
      size: selectedSize
    })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sol Taraf - Ürün Görseli */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Sağ Taraf - Ürün Bilgileri */}
          <div className="space-y-6">
            {/* Ürün Başlığı ve Değerlendirme */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
              
              {/* Değerlendirme */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                  {product.reviewCount.toLocaleString()} Yorum
                </span>
              </div>
            </div>

            {/* Ürün Etiketleri */}
            <div className="flex space-x-2">
              {product.isVegetarian && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  VEJETARYEN
                </Badge>
              )}
              {product.isGlutenFree && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  GLUTENSİZ
                </Badge>
              )}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>
            {/* Aroma Seçimi */}
            {product.flavors.length > 0 && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">AROMA:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {product.flavors.map((flavor) => {
                    // Her aroma için uygun görsel
                    const getFlavorImage = (flavorId: string) => {
                      const imageMap: { [key: string]: string } = {
                        'biscuit': '/src/assets/flavors/biscuit.webp',
                        'chocolate': '/src/assets/flavors/choc.webp',
                        'banana': '/src/assets/flavors/banana.webp',
                        'caramel': '/src/assets/flavors/salted caramel.webp',
                        'choco-nut': '/src/assets/flavors/choco-nut.webp',
                        'coconut': '/src/assets/flavors/cookie-cream.webp',
                        'raspberry': '/src/assets/flavors/strawberry.webp', // Raspberry cheesecake için strawberry
                        'strawberry': '/src/assets/flavors/strawberry.webp' // Çilek için strawberry
                      }
                      return imageMap[flavorId] || '/src/assets/flavors/strawberry.webp'
                    }

                    return (
                      <button
                        key={flavor.id}
                        onClick={() => setSelectedFlavor(flavor.id)}
                        disabled={!flavor.isAvailable}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedFlavor === flavor.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${!flavor.isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                          <img 
                            src={getFlavorImage(flavor.id)} 
                            alt={flavor.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              // Görsel yüklenemezse emoji göster
                              const emojiMap: { [key: string]: string } = {
                                'biscuit': '',
                                'chocolate': '🍫',
                                'banana': '',
                                'caramel': '',
                                'choco-nut': '',
                                'coconut': '',
                                'raspberry': '🫐',
                                'strawberry': ''
                              }
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling!.textContent = emojiMap[flavor.id] || '🍯'
                            }}
                          />
                          <span className="text-2xl hidden"></span>
                        </div>
                        <div className="text-xs leading-tight text-center">
                          {flavor.name}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Aroma bölümü sonrası çizgi */}
      

            {/* Boyut Seçimi */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">BOYUT:</label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    disabled={!size.isAvailable}
                    className={`relative p-3 sm:p-4 border-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!size.isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {size.discountPercentage && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        %{size.discountPercentage} İNDİRİM
                      </div>
                    )}
                    <div className="font-bold">{size.name}</div>
                    <div className="text-xs text-gray-500">({size.servings} servis)</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fiyat ve Miktar */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {currentPrice.toLocaleString()} TL
                </span>
                {currentOriginalPrice && (
                  <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
                    {currentOriginalPrice.toLocaleString()} TL
                  </span>
                )}
              </div>
              
              {selectedSizeData && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {Math.round(currentPrice / selectedSizeData.servings * 100) / 100} TL/Servis
                </p>
              )}

              {/* Miktar Seçimi */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Miktar:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Sepete Ekle Butonu */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-medium"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                SEPETE EKLE
              </Button>
            </div>

            {/* Güvenlik Rozetleri */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Aynı Gün Ücretsiz Kargo</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="w-6 h-6 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">750.000+ Mutlu Müşteri</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="w-6 h-6 text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">100% Memnuniyet Garantisi</span>
              </div>
            </div>

            {/* Güvenlik rozetleri sonrası çizgi */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

            {/* Son Kullanım Tarihi */}
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Son Kullanım Tarihi: {product.expirationDate}
            </div>

            {/* Açılır Bölümler */}
            <div className="space-y-2">
              <button
                onClick={() => toggleSection('features')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="font-medium text-gray-900 dark:text-white">ÖZELLİKLER</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.features ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.features && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300">• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => toggleSection('nutrition')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="font-medium text-gray-900 dark:text-white">BESİN İÇERİĞİ</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.nutrition ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.nutrition && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div>Kalori: {product.nutritionalInfo.calories}</div>
                    <div>Protein: {product.nutritionalInfo.protein}g</div>
                    <div>Karbonhidrat: {product.nutritionalInfo.carbohydrates}g</div>
                    <div>Yağ: {product.nutritionalInfo.fat}g</div>
                  </div>
                </div>
              )}

              <button
                onClick={() => toggleSection('usage')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="font-medium text-gray-900 dark:text-white">KULLANIM ŞEKLİ</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.usage ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.usage && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{product.usageInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Son Görüntülenen Ürünler */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">SON GÖRÜNTÜLENEN ÜRÜNLER</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 justify-items-center">
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id} 
                  className="cursor-pointer flex justify-center" 
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <ProductCard
                    name={relatedProduct.name}
                    image={relatedProduct.image}
                    description={relatedProduct.description}
                    reviewCount={relatedProduct.reviewCount}
                    rating={relatedProduct.rating}
                    price={relatedProduct.price}
                    originalPrice={relatedProduct.originalPrice}
                    discountPercentage={relatedProduct.discountPercentage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Müşteri Yorumları */}
        <div className='mt-16'>
          <ProductReviews productName={product.name} maxReviews={15} />
        </div>

        {/* En Çok Satanlar */}
        {bestSellersData.length > 0 && (
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">EN ÇOK SATANLAR</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 justify-items-center">
              {bestSellersData.map((bestSeller) => (
                <div 
                  key={bestSeller.id} 
                  className="cursor-pointer flex justify-center" 
                  onClick={() => navigate(`/product/${bestSeller.id}`)}
                >
                  <ProductCard
                    id={bestSeller.id}
                    name={bestSeller.name}
                    image={bestSeller.image}
                    description={bestSeller.description}
                    reviewCount={bestSeller.reviewCount}
                    rating={bestSeller.rating}
                    price={bestSeller.price}
                    originalPrice={bestSeller.originalPrice}
                    discountPercentage={bestSeller.discountPercentage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail