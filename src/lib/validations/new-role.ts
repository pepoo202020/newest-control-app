import * as z from 'zod'

export const newRoleSchema = z.object({
    name: z.string().min(1, {message: "الاسم مطلوب"}),
})

export type NewRoleSchema = z.infer<typeof newRoleSchema>