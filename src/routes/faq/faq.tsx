import React from 'react'
import FAQ from '@/components/faq'

function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <FAQ 
        title="Sıkça Sorulan Sorular" 
        subtitle="Size yardımcı olmak için en sık sorulan soruları derledik." 
      />
    </div>
  )
}

export default FAQPage