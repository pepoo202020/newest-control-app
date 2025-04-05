'use client'
import LogoComponent, { logoSizes } from '@/components/shared/logo-component'
import { useRole } from '@/providers/role-provider'
import { convertRoleArabic } from '@/utils/convert-role-arabic'
import { signOut, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import RolesChanger from '../header/roles-changer'
import UserNotification from '../header/user-notification'
import UserProfile from '../header/user-profile'
import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function DashboardHeader() {
    const router = useRouter()
    const [notifications, setNotifications] = useState<number>(0)
    const { data: session } = useSession()
    const { selectedRole, setSelectedRole } = useRole()
    const filteredRoles = session?.user.roles.filter((role: string) => role !== selectedRole)


    const logout = () => {
        signOut()
        router.push('/login')
    }

  return (
    <div className='sticky inset-0 z-50 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-5 px-5 lg:px-10 flex items-center justify-between'>
        {/* LOGO */}
        <LogoComponent size={logoSizes.sm} />
        {/* USER MAIN ROLE HEADER */}
        <h1 className="hidden lg:block text-2xl font-semibold capitalize">
            {selectedRole && `لوحة تحكم ${convertRoleArabic(selectedRole as string)}`}
        </h1>
        <div className='flex items-center gap-x-5'>
            {/* ROLES CHANGER  */}
        {
            filteredRoles!.length > 0 && (
                <RolesChanger roles={filteredRoles as string[]} selectRole={setSelectedRole} />
            )
        }
        {/* USER NOTIFICATIONS  */}
        {notifications > 0 ? (
            <UserNotification notifications={notifications} />
          ) : (
            <Bell className="h-7 w-7 dark:fill-[#1D253B] fill-white" />
          )}
        {/* USER PROFILE  */}
        <UserProfile user={session?.user} logout={logout} />
       
        </div>
    </div>
  )
}
