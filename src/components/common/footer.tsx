import { Separator } from "@/components/ui/separator"
import logo from "@/assets/LOGO_Beyaz.png"

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 px-6 md:px-16 py-12">
      <div className=" gap-1 max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Logo & Genel Bilgiler */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-6 leading-tight">
            <img src={logo} alt="OJS Nutrition Logo" className="h-8" />
          </h2>
          <ul className="space-y-5 p-5 text-sm">
            <li>İletişim</li>
            <li>Hakkımızda</li>
            <li>Sıkça Sorulan Sorular</li>
            <li>KVKK</li>
            <li>Çalışma İlkelerimiz</li>
            <li>Satış Sözleşmesi</li>
            <li>Garanti ve İade Koşulları</li>
            <li>Gerçek Müşteri Yorumları</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Kategoriler */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Kategoriler</h3>
          <ul className="space-y-5 p-5 text-sm">
            <li>Protein</li>
            <li>Spor Gıdaları</li>
            <li>Sağlık</li>
            <li>Gıda</li>
            <li>Vitamin</li>
            <li>Aksesuar</li>
            <li>Tüm Ürünler</li>
            <li>Paketler</li>
            <li>Lansmana Özel Fırsatlar</li>
          </ul>
        </div>

        {/* Popüler Ürünler */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Popüler Ürünler</h3>
          <ul className="space-y-5 p-5text-sm">
            <li>Whey Protein</li>
            <li>Cream of Rice</li>
            <li>Creatine</li>
            <li>BCAA+</li>
            <li>Pre-Workout</li>
            <li>Fitness Paketi</li>
            <li>Collagen</li>
            <li>Günlük Vitamin Paketi</li>
            <li>ZMA</li>
          </ul>
        </div>
      </div>

      <Separator className="my-10 bg-neutral-700" />

      <div className="text-center text-xs text-neutral-500">
        Copyright © {new Date().getFullYear()} - Tüm Hakları Saklıdır.
      </div>
    </footer>
  )
}

export default Footer
