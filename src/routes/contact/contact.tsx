
import ContactForm from '@/components/contact-form'

function Contact() {
  return (
    <div className="container text-center items-center mx-auto px-4 py-8">
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold mb-4'>Bize Ulaşın</h1>
        <p className='text-lg  text-muted-foreground'>
          Bize aşağıdaki iletişim formu ile ulaşabilirsiniz.
        </p>
      </div>
      
      <div className='max-w-2xl mx-auto'>
        <ContactForm />
      </div>

      <div className='text-center mt-8'>
      <p>*Aynı gün kargo hafta içi 16:00, Cumartesi ise 11.00'a kadar verilen siparişler için geçerlidir.</p>
      <p>Siparişler Kargoya verilince e-posta ve sms ile bilgilendirme yapılır.</p>

      <p className= 'mt-19' > Telefon ile <strong>0850 305 29 89</strong> numarasını arayarak bizlere sesli mesaj bırakabilirsiniz. <span className='block'>Sesli mesajlarınıza hafta içi saat <strong>09:00-17.00</strong> arasında dönüş sağlanmaktadır.</span></p>
      </div>
    </div>
  )
}

export default Contact