'use client'

import { loginSchema, LoginSchema } from "@/lib/validations/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { toast } from "sonner"
import LogoComponent, { logoSizes } from "@/components/shared/logo-component"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Loading from "@/components/shared/loading"
import { useSession } from "next-auth/react"
export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {data: session} = useSession()

    useEffect(() => {
        if(session?.user) {
            router.push("/dashboard")   
        }
    },[session])

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            Password: "",
            isStayLoggedIn: false
        }
    })

    async function onSubmit(data: LoginSchema) {
        try {
          setIsLoading(true)
          

          const result = await signIn("credentials", {
            email: data.email,
            password: data.Password,
            remember: data.isStayLoggedIn,
            redirect: false,
          })
    
          if (result?.error) {
            toast.error(result.error || "خطأ في البريد الإلكتروني أو كلمة المرور")
            return
          }
    
          if (result?.ok) {
            

            toast.success("تم تسجيل الدخول بنجاح")
            router.push(searchParams?.get("callbackUrl") || "/dashboard")
            router.refresh()
          }
        } catch (error) {
          toast.error("حدث خطأ أثناء تسجيل الدخول")
        } finally {
          setIsLoading(false)
        }
      }
       
      if (isLoading) {
        return <Loading  />
      }
    return <div className="flex flex-col h-screen w-screen items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <LogoComponent size={logoSizes.lg} />
        <Card className="w-[60%] lg:w-[45%] mt-5 bg-white dark:bg-gray-900">
            <CardHeader>
                <CardTitle className="w-full text-center">تسجيل الدخول</CardTitle>
                <CardDescription className="w-full text-center">
                يرجى تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور الخاصة بك للتمكن من الوصول الى مميزات البرنامج
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>البريد الإلكتروني</FormLabel>
                                    <FormControl>
                                        <Input dir="ltr" placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>كلمة المرور</FormLabel>
                                    <FormControl>
                                        <Input dir="ltr" type="password" placeholder="*************" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                         />
                         <FormField
                            control={form.control}
                            name="isStayLoggedIn"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-x-reverse">
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel className="text-sm font-medium leading-none">البقاء متصلاً</FormLabel>
                                </FormItem>
                            )}
                         />
                         <Button className="w-full bg-blue-950 hover:bg-blue-900 dark:bg-blue-500 dark:hover:bg-blue-400 text-white dark:text-white" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "تسجيل الدخول"}
                         </Button>
                    </form>
                </Form>
            </CardContent>
            
        </Card>
    </div>
}

