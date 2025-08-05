import Banner from '@/components/banner'
import HomeProduct from '@/components/home-product'
import CustomerReviews from '@/components/customer-reviews'
import TrustGuarantee from '@/components/trust-guarantee'

export default function Home() {
  return (
    <div>
      <Banner/>
      <HomeProduct/>
      <CustomerReviews/>
      <TrustGuarantee/>
    </div>
  )
}
