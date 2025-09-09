import { Link } from 'react-router-dom'
import { User, Package, MapPin } from 'lucide-react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  firstName: z.string().min(2, "En az 2 karakter"),
  lastName: z.string().min(2, "En az 2 karakter"),
  phone: z.string().min(10, "En az 10 karakter"),
  email: z.string().email("Geçerli email"),
})

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values)
}

function Account() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  })

  return (
    <div className='container mx-auto max-w-6xl px-4 py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
        {/* Sol taraf - Menü */}
        <div className='lg:col-span-1'>
          <h2 className='text-2xl font-bold mb-6'>Hesabım</h2>
          <nav className='space-y-2'>
            <Link to="/account/profile" className='flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'>
              <User size={20} />
              <span className='font-medium'>Hesap Bilgilerim</span>
            </Link>
            <Link to="/account/orders" className='flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'>
              <Package size={20} />
              <span className='font-medium'>Siparişlerim</span>
            </Link>
            <Link to="/account/addresses" className='flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200'>
              <MapPin size={20} />
              <span className='font-medium'>Adreslerim</span>
            </Link>
          </nav>
        </div>

        {/* Sağ taraf - Form alanı */}
        <div className='lg:col-span-2'>
          <h3 className='text-2xl font-bold mb-6'>Hesap Bilgileri</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Ad ve Soyad yan yana */}
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad</FormLabel>
                      <FormControl>
                        <Input placeholder="Adınız" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soyad</FormLabel>
                      <FormControl>
                        <Input placeholder="Soyadınız" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Telefon */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="0555 123 45 67" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kaydet butonu sağ kenarda */}
              <div className='flex justify-end pt-4'>
                <Button type="submit" className='px-8 py-2'>
                  Kaydet
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Account