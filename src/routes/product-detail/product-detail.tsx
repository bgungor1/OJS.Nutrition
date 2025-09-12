import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productsApi } from '@/services/products'
import { bestSellersApi } from '@/services/best-sellers'
import { transformApiProductToProductDetail } from '@/utils/productTransform'
import type { ProductDetail as ProductDetailType } from '@/types/product'
import type { ApiBestSellerProduct } from '@/types/api'
import { getRelatedProducts } from '@/data/product-detail-data'
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
  const [product, setProduct] = useState<ProductDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedFlavor, setSelectedFlavor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [expandedSections, setExpandedSections] = useState({
    features: false,
    nutrition: false,
    usage: false
  })
  const [bestSellers, setBestSellers] = useState<ApiBestSellerProduct[]>([])
  const [bestSellersLoading, setBestSellersLoading] = useState(false)
  const [bestSellersError, setBestSellersError] = useState<string | null>(null)

  const relatedProducts = getRelatedProducts(6)

  // API'den gelen best seller verilerini ProductCard formatına dönüştür
  const transformBestSellerToProductCard = (bestSeller: ApiBestSellerProduct) => ({
    id: bestSeller.slug,
    name: bestSeller.name,
    image: bestSeller.photo_src ? `https://fe1111.projects.academy.onlyjs.com${bestSeller.photo_src}` : '/src/assets/whey-protein.jpg',
    description: bestSeller.short_explanation,
    reviewCount: bestSeller.comment_count,
    rating: bestSeller.average_star,
    price: bestSeller.price_info.discounted_price || bestSeller.price_info.total_price,
    originalPrice: bestSeller.price_info.discounted_price ? bestSeller.price_info.total_price : undefined,
    discountPercentage: bestSeller.price_info.discount_percentage || undefined
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Slug'ı id'ye çevir (eğer gerekirse)
        const slug = id || 'whey-protein'
        
        const response = await productsApi.getProductBySlug(slug)
        
        if (response.status === 'success') {
          const transformedProduct = transformApiProductToProductDetail(response.data)
          setProduct(transformedProduct)
          
          // İlk yüklemede varsayılan seçimleri ayarla
          if (transformedProduct.flavors.length > 0) {
            setSelectedFlavor(transformedProduct.flavors[0].id)
          }
          if (transformedProduct.sizes.length > 0) {
            setSelectedSize(transformedProduct.sizes[0].id)
          }
        } else {
          setError('Ürün bulunamadı')
        }
      } catch (err) {
        console.error('Ürün yükleme hatası:', err)
        setError('Ürün yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setBestSellersLoading(true)
        setBestSellersError(null)
        
        const response = await bestSellersApi.getBestSellers()
        
        if (response.status === 'success') {
          setBestSellers(response.data)
        } else {
          setBestSellersError('En çok satanlar yüklenemedi')
        }
      } catch (err) {
        console.error('En çok satanlar yükleme hatası:', err)
        setBestSellersError('En çok satanlar yüklenirken bir hata oluştu')
      } finally {
        setBestSellersLoading(false)
      }
    }

    fetchBestSellers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ürün yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-6">{error || 'Aradığınız ürün mevcut değil.'}</p>
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
                        'raspberry': '/src/assets/flavors/strawberry.webp',
                        'strawberry': '/src/assets/flavors/strawberry.webp'
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
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">EN ÇOK SATANLAR</h3>
          
          {bestSellersLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2 text-gray-600">En çok satanlar yükleniyor...</span>
            </div>
          ) : bestSellersError ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{bestSellersError}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                size="sm"
              >
                Tekrar Dene
              </Button>
            </div>
          ) : bestSellers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 justify-items-center">
              {bestSellers.map((bestSeller) => {
                const productCardData = transformBestSellerToProductCard(bestSeller)
                return (
                  <div 
                    key={bestSeller.slug} 
                    className="cursor-pointer flex justify-center" 
                    onClick={() => navigate(`/product/${bestSeller.slug}`)}
                  >
                    <ProductCard
                      id={productCardData.id}
                      name={productCardData.name}
                      image={productCardData.image}
                      description={productCardData.description}
                      reviewCount={productCardData.reviewCount}
                      rating={productCardData.rating}
                      price={productCardData.price}
                      originalPrice={productCardData.originalPrice}
                      discountPercentage={productCardData.discountPercentage}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">En çok satanlar bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail