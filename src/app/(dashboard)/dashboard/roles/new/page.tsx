'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NewRoleSchema } from '@/lib/validations/new-role'
import { newRoleSchema } from '@/lib/validations/new-role'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Loading from '@/components/shared/loading'
import { convertRoleEnglish } from '@/utils/convert-role-english'
export default function NewRolePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<NewRoleSchema>({
        resolver: zodResolver(newRoleSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = async (data: NewRoleSchema) => {
        const englishName = convertRoleEnglish(data.name)
        try {
            setIsLoading(true)
            const response = await fetch('/api/roles/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data, name: englishName}),
            })

            if (!response.ok) {
                throw new Error('Failed to create role')
            }

            toast.success('تم إنشاء الدور بنجاح')
            router.push('/dashboard/roles')
        } catch (error) {
            setIsLoading(false)
            toast.error('فشل في إنشاء الدور')
        } finally {
            setIsLoading(false)
            form.reset()
        }
    }

    if (isLoading) <Loading />

    return (
        <Card className='max-w-2xl mx-auto bg-white dark:bg-gray-800/80 backdrop-blur-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-2'>
                    <ChevronLeftIcon 
                        className='w-5 h-5 cursor-pointer hover:text-primary transition-colors' 
                        onClick={() => router.back()} 
                    />
                    <CardTitle>إنشاء دور جديد</CardTitle>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>الاسم</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        placeholder="أدخل اسم الدور"
                                        className="bg-white/50 dark:bg-gray-900/50"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button 
                        type='submit' 
                        className='w-full bg-blue-950 hover:bg-blue-950/90 text-white'
                        disabled={isLoading}
                    >
                        {'إنشاء'}
                    </Button>
                </form>
                </Form>
            </CardContent>
        </Card>
    )
}
