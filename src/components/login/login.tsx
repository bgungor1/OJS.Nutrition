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

export function  Login() {
    const [isLogin, setIsLogin] = useState(true)
  return (
    <div className="w-full max-w-sm">
      {/* Tab Butonları - Card'ın DIŞINDA */}
      <div className="flex mb-4 bg-muted rounded-lg p-1">
        <Button 
          variant={isLogin ? "default" : "ghost"} 
          className="flex-1"
          onClick={() => setIsLogin(true)}
        >
          Giriş Yap
        </Button>
        <Button 
          variant={!isLogin ? "default" : "ghost"} 
          className="flex-1"
          onClick={() => setIsLogin(false)}
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
        <form>
          <div className="flex flex-col gap-6">
            {!isLogin && (
                <>
             <div className="grid gap-2">
             <Label htmlFor="firstName">Ad</Label>
             <Input id="firstName" type="text" required />
           </div>
           <div className="grid gap-2">
            <Label htmlFor="lastName">Soyad</Label>
            <Input id="lastName" type="text" required />
          </div>
                </>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                          <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                )}
          
              </div>
              <Input id="password" type="password" required />
            </div>
            {!isLogin && (
                        <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                        <Input id="confirmPassword" type="password" required />
                      </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
        </Button>
        <Button variant="outline" className="w-full">
          {isLogin ? "Google ile Giriş Yap" : "Google ile Hesap Oluştur"}
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
