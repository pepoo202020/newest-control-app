'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { newLevelSchema } from '@/lib/validations/new-levle'
import { useForm } from 'react-hook-form'
import { NewLevelSchema } from '@/lib/validations/new-levle'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import Loading from '@/components/shared/loading'
import Error from '@/components/shared/error'

export default function NewLevel() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const form = useForm<NewLevelSchema>({
        resolver: zodResolver(newLevelSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })
    const onSubmit = async (data: NewLevelSchema) => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/levels/new-level', {
                method: 'POST',
                body: JSON.stringify(data),
            })
            const resData = await response.json()
            if (response.ok) {
                toast.success(resData.message)
                router.push('/dashboard/levels')
            } else {
                toast.error(resData.message)
                setError(resData.message)
            }

        } catch (error) {
            console.log(error)
            setError('حدث خطأ')
        } finally {
            setIsLoading(false)
            setError(null)
        }
    }

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error error={error} />
    }

    return (
        <Card className='max-w-2xl mx-auto mt-2 bg-white dark:bg-gray-800'>
            <CardHeader className='flex items-center gap-2'>
                <ChevronLeft className='w-6 h-6 text-gray-500 cursor-pointer' onClick={() => router.back()} />
                <CardTitle className='text-2xl font-bold'>
                    ادخال مستوى جديد
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الاسم</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='أدخل اسم المستوى' required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الوصف</FormLabel>
                                    <FormControl>
                                        <div >
                                            <Textarea {...field} placeholder='أدخل الوصف' />
                                            <p className="mt-1 text-xs text-muted-foreground" role="region" aria-live="polite">
                                                يرجى إدخال جميع التفاصيل الممكنة
                                            </p>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} type='submit' className='w-full bg-blue-950 hover:bg-blue-950/90 text-white'>
                            إنشاء
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
