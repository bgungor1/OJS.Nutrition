import React from 'react'
import protein from '@/assets/protein.png'
import vitaminler from '@/assets/vitaminler.png'
import saglık from '@/assets/saglık.png'
import sGıdaları from '@/assets/spor-gıdaları.png'
import gıda from '@/assets/gıda.png'
import tumu from '@/assets/tum-urunler.png'
import whey from '@/assets/whey-protein.jpg'
import star from '@/assets/yıldız.png'
import fitness from '@/assets/fitness-paketi.png'
import gVitamin from '@/assets/gunluk-vitamin-paketi.png'
import preworkout from '@/assets/preworkout.png'
import cream from '@/assets/rice-of-cream.png'
import creatine from '@/assets/creatine.png'
import ojsBanner from '@/assets/ojs-nutrition-banner.png'

export default function HomeProduct() {
  return (
    <>
    <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto mt-8 px-4">
      <div className="p-2">
        <img 
          className="w-full h-[157px] object-cover rounded-lg" 
          src={protein} 
          alt="protein görseli" 
        />
      </div>
      <div className="p-2">
        <img 
          className="w-full h-[157px] object-cover rounded-lg" 
          src={vitaminler} 
          alt="vitaminler görseli" 
        />
      </div>
      <div className="p-2">
        <img 
          className="w-full h-[157px] object-cover rounded-lg" 
          src={saglık} 
          alt="sağlık ürünleri görseli" 
        />
      </div>
      <div className="p-2">
        <img 
          className="w-full h-[157px] object-cover rounded-lg" 
          src={sGıdaları} 
          alt="Spor gıdaları ürünlerinin görseli" 
        />
      </div>
      <div className="p-2">
        <img 
          className="w-full h-[157px] object-cover rounded-lg" 
          src={gıda} 
          alt="Gıda görseli" 
        />
      </div>
      <div className="p-2">
        <img 
          className="w-full h-[157px] object-cover rounded-lg" 
          src={tumu} 
          alt="tüm ürünler görseli" 
        />
      </div>
    </div>
    
    <div className='mt-5 justify-items-center text-center'>
  <h3 className="mb-2 font-semibold">ÇOK SATANLAR</h3>
  <div className='mb-2 flex flex-row flex-wrap justify-between gap-4'>

    {/* 1 - WHEY PROTEIN (İNDİRİM YOK) */}
    <div className="relative">
      <img src={whey} alt="whey protein görseli" />
      <p className='text-lg font-medium'>WHEY PROTEIN</p>
      <p className='text-sm text-muted-foreground'>EN ÇOK TERCİH EDİLEN <br /> PROTEİN TAKVİYESİ</p>
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <img key={index} src={star} alt="yıldız" className="w-4 h-4" />
        ))}
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-sm text-gray-600">10869 yorum</span>
        <span className="text-lg font-bold text-green-600 mt-1">549 TL</span>
      </div>
    </div>

    {/* 2 - FITNESS PAKETİ (İNDİRİM VAR) */}
    <div className="relative">
      <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
        %29<br />İNDİRİM
      </div>
      <img src={fitness} alt="fitness paketi görseli" />
      <p className='text-lg font-medium'>FITNESS PAKETİ</p>
      <p className='text-sm text-muted-foreground'>EN POPÜLER ÜRÜNLER BİR <br /> ARADA</p>
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <img key={index} src={star} alt="yıldız" className="w-4 h-4" />
        ))}
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-sm text-gray-600">7650 yorum</span>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-green-600">799 TL</span>
          <span className="text-base text-red-400 line-through">1126 TL</span>
        </div>
      </div>
    </div>

    {/* 3 - GÜNLÜK VİTAMİN PAKETİ (İNDİRİM VAR) */}
    <div className="relative">
      <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
        %15<br />İNDİRİM
      </div>
      <img src={gVitamin} alt="günlük vitamin paketi görseli" />
      <p className='text-lg font-medium'>GÜNLÜK VİTAMİN <br /> PAKETİ</p>
      <p className='text-sm text-muted-foreground'>EN SIK TÜKETİLEN TAKVİYELER</p>
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <img key={index} src={star} alt="yıldız" className="w-4 h-4" />
        ))}
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-sm text-gray-600">5013 yorum</span>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-green-600">549 TL</span>
          <span className="text-base text-red-400 line-through">747 TL</span>
        </div>
      </div>
    </div>

    {/* 4 - WHEY PROTEIN (TEMİZ) */}
    <div>
      <img src={preworkout} alt="preworkout  görseli" />
      <p className='text-lg font-medium'>PRE-WORKOUT <br /> SUPREME</p>
      <p className='text-sm text-muted-foreground'>ANTRENMAN ÖNCESİ<br />TAKVİYE</p>
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <img key={index} src={star} alt="yıldız" className="w-4 h-4" />
        ))}
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-sm text-gray-600">6738 yorum</span>
        <span className="text-lg font-bold text-green-600 mt-1">399 TL</span>
      </div>
    </div>

    {/* 5 - WHEY PROTEIN (TEMİZ) */}
    <div>
      <img src={cream} alt="cream of rice görseli" />
      <p className='text-lg font-medium'>CREAM OF RICE</p>
      <p className='text-sm text-muted-foreground'>EN LEZZETLİ PİRİNÇ KREMASI</p>
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <img key={index} src={star} alt="yıldız" className="w-4 h-4" />
        ))}
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-sm text-gray-600">5216 yorum</span>
        <span className="text-lg font-bold text-green-600 mt-1">239 TL</span>
      </div>
    </div>

    {/* 6 - WHEY PROTEIN (TEMİZ) */}
    <div>
      <img src={creatine} alt="creatine görseli" />
      <p className='text-lg font-medium'>CREATINE</p>
      <p className='text-sm text-muted-foreground'>EN POPÜLER SPORCU <br /> TAKVİYESİ</p>
      <div className="flex justify-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <img key={index} src={star} alt="yıldız" className="w-4 h-4" />
        ))}
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-sm text-gray-600">8558 yorum</span>
        <span className="text-lg font-bold text-green-600 mt-1">239 TL</span>
      </div>
    </div>
  </div>
</div>

{/* OJS Nutrition Banner - En altta */}
<div className="mt-16 mb-8">
  <div className="w-full">
    <img 
      src={ojsBanner} 
      alt="OJS Nutrition Banner" 
      className="w-full h-full object-cover shadow-lg"
      style={{ display: 'block', margin: 0, padding: 0 }}
    />
  </div>
</div>

  
    </>
  )
}
