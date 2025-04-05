import { z } from "zod";

export const newLevelSchema = z.object({
    name: z.string().min(1, { message: 'الاسم مطلوب' }),
    description: z.string().optional(),
})

export type NewLevelSchema = z.infer<typeof newLevelSchema>
