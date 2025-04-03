import { z } from "zod";

export const usersAssignRoleValidation = z.object({
    users: z.array(z.string()),
    roleId: z.string(),
})

export type UsersAssignRoleValidation = z.infer<typeof usersAssignRoleValidation>
