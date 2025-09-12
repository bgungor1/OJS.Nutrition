import React from 'react'
import { Button } from "@/components/ui/button"
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react'
import AddAddressModal from '../../components/modals/add-address-modal'

function Addresses() {
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h3 className='text-xl sm:text-2xl font-bold'>Adreslerim</h3>
        <AddAddressModal>
          <Button className="flex items-center gap-2 w-full sm:w-auto">
            <Plus size={16} />
            Yeni Adres Ekle
          </Button>
        </AddAddressModal>
      </div>
      
      <div className="space-y-4">
        {/* Örnek adres kartı */}
        <div className="border dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Ev Adresi</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">Varsayılan</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Edit size={14} />
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 flex-1 sm:flex-none">
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            <p>Ahmet Yılmaz</p>
            <p>Atatürk Mahallesi, Cumhuriyet Caddesi No: 123</p>
            <p>Kadıköy/İstanbul 34710</p>
            <p>Tel: 0555 123 45 67</p>
          </div>
        </div>

        {/* İkinci adres kartı */}
        <div className="border dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">İş Adresi</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Edit size={14} />
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 flex-1 sm:flex-none">
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            <p>Ahmet Yılmaz</p>
            <p>Levent Mahallesi, Büyükdere Caddesi No: 456</p>
            <p>Beşiktaş/İstanbul 34330</p>
            <p>Tel: 0555 987 65 43</p>
          </div>
        </div>

        {/* Adres yoksa gösterilecek mesaj */}
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <MapPin size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <p className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Henüz adres eklenmemiş</p>
          <p className="text-sm">İlk adresinizi eklemek için yukarıdaki butona tıklayın.</p>
        </div>
      </div>
    </div>
  )
}

export default Addresses