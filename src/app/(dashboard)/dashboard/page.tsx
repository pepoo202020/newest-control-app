'use client'
import { Button } from "@/components/ui/button"
import { useRole } from "@/providers/role-provider"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
    const { selectedRole } = useRole()
    const router = useRouter()

    const handleLogout = () => {
        signOut()
        router.push('/')
    }

    if (!selectedRole) {
        return <div className="w-screen h-screen bg-blue-950 text-white dark:bg-black absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-2">لا يوجد صلاحيات</h1>
            <p className="text-lg mb-2">يرجى التوجه إلى المسئول لتعيين الصلاحيات</p>
            <Button onClick={handleLogout} className="bg-white text-blue-950 hover:bg-blue-950 hover:text-white transition-all duration-300 cursor-pointer">تسجيل الخروج</Button>
        </div>
    }
    return <>Dashboard</>
}
