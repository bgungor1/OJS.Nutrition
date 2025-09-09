import { Link } from 'react-router-dom'
import { User, Package, MapPin } from 'lucide-react'

interface AccountSidebarProps {
  title?: string
  className?: string
}

export default function AccountSidebar({ 
  title = "Hesabım", 
  className = "" 
}: AccountSidebarProps) {
  return (
    <div className={`lg:col-span-1 ${className}`}>
      <h2 className='text-2xl font-bold mb-6'>{title}</h2>
      <nav className='space-y-2'>
        <Link 
          to="/account/profile" 
          className='flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'
        >
          <User size={20} />
          <span className='font-medium'>Hesap Bilgilerim</span>
        </Link>
        <Link 
          to="/account/orders" 
          className='flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'
        >
          <Package size={20} />
          <span className='font-medium'>Siparişlerim</span>
        </Link>
        <Link 
          to="/account/addresses" 
          className='flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'
        >
          <MapPin size={20} />
          <span className='font-medium'>Adreslerim</span>
        </Link>
      </nav>
    </div>
  )
}