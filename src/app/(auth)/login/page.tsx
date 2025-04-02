'use client'

import { loginSchema, LoginSchema } from "@/lib/validations/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import  {signIn} from 'next-auth/react'
import { toast } from "sonner"

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            Password: "",
            isStayLoggedIn: false
        }
    })

    async function onSubmit(data: LoginSchema) {
        setIsLoading(true)
        const signInResult = await signIn("credentials", {
            email: data.email,
            password: data.Password,
            redirect: false,
            callbackUrl: searchParams.get('callbackUrl') || "/dashboard"
        })
        setIsLoading(false)
        if(signInResult?.error){
            toast.error("خطأ في البريد الإلكتروني أو كلمة المرور")
            return 
        }
        router.push(signInResult?.url || "/dashboard")
    }
    return  <>login</>
}
