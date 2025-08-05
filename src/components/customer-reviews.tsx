import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CustomerReviews() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 mt-10 mb-20">
      {/* Üst Başlık */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-6">
        <h2 className="text-lg font-semibold text-gray-700">GERÇEK MÜŞTERİ YORUMLARI</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {/* Yıldızlar */}
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" stroke="none" />
            ))}
          </div>
          <span className="text-xs font-semibold">198453 Yorum</span>
          {/* Oklar */}
          <ChevronLeft size={16} className="cursor-pointer" />
          <ChevronRight size={16} className="cursor-pointer" />
        </div>
      </div>

      {/* Yorum Kartları */}
      <div className="mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <p className="text-[11px] text-gray-500">03/05/24</p>
            <h3 className="font-semibold text-base mt-1">Beğendim gayet güzeldi</h3>
            <p className="text-[11px] text-gray-500 mt-1 mb-10 leading-snug">
              Ürün gayet güzel ama ekşiliği <br />bi süreden sonra bayabiliyor insanı <br />teşekkürler.
            </p >
          </div>
        ))}
      </div>
    </div>
  );
}
