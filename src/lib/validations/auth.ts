import * as z from 'zod'

export const loginSchema = z.object({
    email: z.string().email({message: "يرجى إدخال بريد إلكتروني صحيح"}),
    Password: z.string().min(6, {message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",}),
    isStayLoggedIn: z.boolean().optional(),
})

export type LoginSchema = z.infer<typeof loginSchema>