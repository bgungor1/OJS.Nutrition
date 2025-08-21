import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import logo from "@/assets/LOGO_Siyah.png"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full border-b overflow-x-hidden">
      {/* Üst Menü */}
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 py-2 bg-white shadow-sm">
        {/* Logo ve Mobil Menü Butonu */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="p-3 flex items-center">
            <img src={logo} alt="OJS Nutrition Logo" className="h-8" />
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
              <DropdownMenuItem>Giriş Yap</DropdownMenuItem>
              <DropdownMenuItem>Üye Ol</DropdownMenuItem>
              <DropdownMenuItem>Hesap Bilgileri</DropdownMenuItem>
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
            0
          </Badge>
        </Button>
      </SheetTrigger>

      {/* Açılacak kısım (sol taraf) */}
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sepet</SheetTitle>
          <SheetDescription>
           Sepetinze eklediğiniz ürünler burada gözükmekte.
          </SheetDescription>
        </SheetHeader>
        <div className="flex m-2 flex-col gap-2 mt-4">

          <div className="flex justify-between items-center">
            <span>Ürün Adı</span>
            <span>10000₺ Fiyat</span>
          </div>
        </div>

        <div className="mt-auto m-2 pt-4 border-t flex flex-col gap-3">
          <input type="text" placeholder="İndirim Kodu" className="border p-2 rounded"/>

          <div className="flex m-2 justify-between font-bold">
            <span>Toplam</span>
            <span>10005₺</span>

          </div>
          <Button className="w-full">TAMAMLA</Button>
        </div>
        {/* Buraya sepet itemlerini listeleyeceksin */}
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
      <div className="bg-white border-t flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10 text-xs py-2 text-center px-4">
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
