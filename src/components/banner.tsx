import React from 'react'
import banner from '@/assets/banner_slider.jpg'

export default function Banner() {
  return (
   <div className="h-[640px] relative overflow-hidden w-[1920px]">
    <img 
      src={banner} 
      alt="Banner Slider" 
      className='w-full h-full object-cover' 
    />
   </div>
  )
}
