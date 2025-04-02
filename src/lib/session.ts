import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export async function getSession() {
    return await getServerSession(authOptions)
}

export const getSessionDuration = (remember: boolean) => {
    return remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 24 hours
} 