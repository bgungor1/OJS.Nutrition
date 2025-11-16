import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, Menu, X, MinusCircle, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "@/components/use-theme"
import logoBlack from "@/assets/LOGO_Siyah.png"
import logoWhite from "@/assets/LOGO_Beyaz.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { useCartStore } from "@/store/cartStore"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme } = useTheme()
  const navigate = useNavigate()
  const { items, getTotalItems, getTotalPrice, removeItem, updateItemQuantity } = useCartStore()

  // Sepet hesaplamaları
  const subtotal = getTotalPrice()
  const shippingCost = 15 // Varsayılan kargo ücreti
  const taxRate = 0.18 // KDV oranı %18
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax
  
  // Tema durumuna göre logo seçimi
  const currentLogo = theme === "dark" ? logoWhite : logoBlack

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateItemQuantity(id, newQuantity);
  };

  return (
    <header className="w-full border-b overflow-x-hidden">
      {/* Üst Menü */}
      <div className="flex flex-col lg:flex-row justify-around items-center px-4 py-2 bg-white dark:bg-gray-800 shadow-sm">
        {/* Logo ve Mobil Menü Butonu */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="p-3 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src={currentLogo} alt="OJS Nutrition Logo" className="h-8" />
          </div>
          
          {/* Mobil Menü Butonu */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Arama Çubuğu - Mobilde tam genişlik */}
        <div className="relative flex items-center gap-2 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-4 mt-4 lg:mt-0">
          <Input 
            placeholder="Aradığınız ürünü yazınız" 
            className="rounded-none pr-12 h-10 sm:h-11 text-sm sm:text-base" 
          />
          <Button variant="secondary" className="rounded-none absolute right-0 h-10 sm:h-11 px-3 sm:px-4 text-sm sm:text-base">ARA</Button>
        </div>

        {/* Hesap, Sepet ve Tema Toggle */}
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          {/* Tema Toggle */}
          <ModeToggle />
          
          {/* Hesap */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 rounded-none">
                <User className="w-4 h-4" /> 
                <span className="hidden sm:inline">HESAP</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate('/login')}>Giriş Yap</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/login')}>Üye Ol</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/account')}>Hesap Bilgileri</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sepet */}
           <Sheet>
      {/* Senin buton → trigger */}
      <SheetTrigger asChild>
        <Button variant="secondary" className="relative rounded-none">
          <ShoppingCart className="w-5 h-5" />
          <span className="ml-1 hidden sm:inline">SEPET</span>
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 text-xs px-1"
          >
            {getTotalItems()}
          </Badge>
        </Button>
      </SheetTrigger>

      {/* Açılacak kısım (sol taraf) */}
      <SheetContent side="right" className="flex flex-col w-[400px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Sipariş Özeti</SheetTitle>
          <SheetDescription>
            Sepetinizdeki ürünler ve fiyat detayları
          </SheetDescription>
        </SheetHeader>
        
        {/* Sepet ürünleri */}
        <div className="flex-1 overflow-y-auto space-y-4 mt-4 px-2">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Sepetiniz boş.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h3>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                    ₺{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeItem(item.id)}
                      className="ml-auto"
                    >
                      Kaldır
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Separator className="my-4" />

        {/* Fiyat özeti */}
        <div className="space-y-3 mb-6 px-2">
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

        {/* İndirim kodu ve tamamla butonu */}
        <div className="space-y-3 px-2 pb-4">
          <input 
            type="text" 
            placeholder="İndirim Kodu" 
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 rounded-md text-sm"
          />
          <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3" onClick={() => navigate('/payment')}>
            SEPETİ TAMAMLA
          </Button>
        </div>
      </SheetContent>
    </Sheet>
        </div>
      </div>

      {/* Kategori Menüsü - Mobilde hamburger menü */}
      <nav className={`bg-black text-white text-sm font-medium transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-8 px-4 py-2">
          <a href="#" className="py-2 lg:py-0 lg:mx-10 hover:underline text-center lg:text-left">PROTEİN</a>
          <a href="#" className="py-2 lg:py-0 lg:mx-10 hover:underline text-center lg:text-left">SPOR GIDALARI</a>
          <a href="#" className="py-2 lg:py-0 lg:mx-10 hover:underline text-center lg:text-left">SAĞLIK</a>
          <a href="#" className="py-2 lg:py-0 lg:mx-10 hover:underline text-center lg:text-left">GIDA</a>
          <a href="#" className="py-2 lg:py-0 lg:mx-10 hover:underline text-center lg:text-left">VİTAMİN</a>
          <a href="#" className="py-2 lg:py-0 lg:mx-10 hover:underline text-center lg:text-left">TÜM ÜRÜNLER</a>
        </div>
      </nav>

      {/* Bilgilendirme Bandı - Mobilde dikey düzen */}
      <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10 text-xs py-2 text-center px-4">
        <div className="flex items-center gap-1">
          📦 <strong>AYNI GÜN KARGO</strong> - 16:00'dan önceki siparişlerde
        </div>
        <div className="flex items-center gap-1">
          😀 <strong>ÜCRETSİZ KARGO</strong> - 100 TL üzeri siparişlerde
        </div>
        <div className="flex items-center gap-1">
          🛡️ <strong>GÜVENLİ ALIŞVERİŞ</strong> - 1.000.000+ mutlu müşteri
        </div>
      </div>
    </header>
  )
}
