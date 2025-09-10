import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from "@/schemas/auth"

export function  Login() {
    const [isLogin, setIsLogin] = useState(true)
    
    // Login form
    const loginForm = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: '',
        password: ''
      }
    })
    
    // Register form
    const registerForm = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    })
    
    // Form submit handlers
    const onLoginSubmit = (data: LoginFormData) => {
      console.log('Login data:', data)
      // Burada login API çağrısı yapılacak
    }
    
    const onRegisterSubmit = (data: RegisterFormData) => {
      console.log('Register data:', data)
      // Burada register API çağrısı yapılacak
    }
    
    // Tab değiştiğinde formları temizle
    const handleTabChange = (login: boolean) => {
      setIsLogin(login)
      loginForm.reset()
      registerForm.reset()
    }
    
  return (
    <div className="w-full max-w-sm">
      {/* Tab Butonları - Card'ın DIŞINDA */}
      <div className="flex mb-4 bg-muted rounded-lg p-1">
        <Button 
          variant={isLogin ? "default" : "ghost"} 
          className="flex-1"
          onClick={() => handleTabChange(true)}
        >
          Giriş Yap
        </Button>
        <Button 
          variant={!isLogin ? "default" : "ghost"} 
          className="flex-1"
          onClick={() => handleTabChange(false)}
        >
          Üye Ol
        </Button>
      </div>

    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{isLogin ? "Hesabınıza Giriş Yapın" : "Yeni Hesap Oluşturun"}</CardTitle>
        <CardDescription>
            {isLogin ? "Giriş Yapmak İçin Email ve Şifrenizi Giriniz" : "Hesap oluşturmak için bilgilerinizi girin"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...loginForm.register('email')}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Şifre</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Şifremi Unuttum?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  {...loginForm.register('password')}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Ad</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  {...registerForm.register('firstName')}
                />
                {registerForm.formState.errors.firstName && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.firstName.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Soyad</Label>
                <Input 
                  id="lastName" 
                  type="text" 
                  {...registerForm.register('lastName')}
                />
                {registerForm.formState.errors.lastName && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.lastName.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...registerForm.register('email')}
                />
                {registerForm.formState.errors.email && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Şifre</Label>
                <Input 
                  id="password" 
                  type="password" 
                  {...registerForm.register('password')}
                />
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  {...registerForm.register('confirmPassword')}
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {isLogin ? (
          <>
            <Button 
              type="submit" 
              className="w-full"
              onClick={loginForm.handleSubmit(onLoginSubmit)}
            >
              Giriş Yap
            </Button>
            <Button variant="outline" className="w-full">
              Google ile Giriş Yap
            </Button>
          </>
        ) : (
          <>
            <Button 
              type="submit" 
              className="w-full"
              onClick={registerForm.handleSubmit(onRegisterSubmit)}
            >
              Hesap Oluştur
            </Button>
            <Button variant="outline" className="w-full">
              Google ile Hesap Oluştur
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
    </div>
  )
}
