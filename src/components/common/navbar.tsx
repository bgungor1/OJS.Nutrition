import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ShoppingCart, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import logo from "@/assets/LOGO_Siyah.png"

export default function Navbar() {
  return (
    <header className="w-full border-b">
      {/* Üst Menü */}
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
        {/* Logo */}
        <div className="ml-50 p-3 flex items-center">
          <img src={logo} alt="OJS Nutrition Logo" className="h-8" />
        </div>

        {/* Arama Çubuğu */}
        <div className="flex items-center gap-2 w-full max-w-md mx-4">
          <Input placeholder="Aradığınız ürünü yazınız" className="rounded-none" />
          <Button variant="secondary" className="rounded-none">ARA</Button>
        </div>

        {/* Hesap ve Sepet */}
        <div className="flex items-center gap-4">
          {/* Hesap */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 rounded-none">
                <User className="w-4 h-4" /> HESAP
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Giriş Yap</DropdownMenuItem>
              <DropdownMenuItem>Üye Ol</DropdownMenuItem>
              <DropdownMenuItem>Hesap Bilgileri</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sepet */}
          <Button variant="secondary" className="relative rounded-none">
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-1">SEPET</span>
            <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs px-1">0</Badge>
          </Button>
        </div>
      </div>

      {/* Kategori Menüsü */}
      <nav className="bg-black text-white text-sm font-medium">
        <div className="flex justify-center gap-8 px-4 py-2">
          <a href="#" className="mx-10 hover:underline">PROTEİN</a>
          <a href="#" className="mx-10 hover:underline">SPOR GIDALARI</a>
          <a href="#" className="mx-10 hover:underline">SAĞLIK</a>
          <a href="#" className="mx-10 hover:underline">GIDA</a>
          <a href="#" className="mx-10 hover:underline">VİTAMİN</a>
          <a href="#" className="mx-10 hover:underline">TÜM ÜRÜNLER</a>
        </div>
      </nav>

      {/* Bilgilendirme Bandı */}
      <div className="bg-white border-t flex justify-center items-center gap-10 text-xs py-2 text-center">
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
