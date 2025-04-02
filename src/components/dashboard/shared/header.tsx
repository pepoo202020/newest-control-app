'use client'
import LogoComponent, { logoSizes } from '@/components/shared/logo-component'
import { useRole } from '@/providers/role-provider'
import { convertRoleArabic } from '@/utils/convert-role-arabic'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import RolesChanger from '../header/roles-changer'
import UserNotification from '../header/user-notification'

export default function DashboardHeader() {
    const [notifications, setNotifications] = useState<number>(0)
    const { data: session } = useSession()
    const { selectedRole, setSelectedRole } = useRole()
    const filteredRoles = session?.user.roles.filter((role: string) => role !== selectedRole)


  return (
    <div className='sticky inset-0 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-5 px-5 lg:px-10 flex items-center justify-between'>
        {/* LOGO */}
        <LogoComponent size={logoSizes.sm} />
        {/* USER MAIN ROLE HEADER */}
        <h1 className="hidden lg:block text-2xl font-semibold capitalize">
            لوحة تحكم {convertRoleArabic(selectedRole as string)}
        </h1>
        {/* ROLES CHANGER  */}
        {
            filteredRoles!.length > 0 && (
                <RolesChanger roles={filteredRoles as string[]} selectRole={setSelectedRole} />
            )
        }
        {/* USER NOTIFICATIONS  */}
        <UserNotification notifications={notifications} />
        {/* USER PROFILE  */}
        {/* THEME SWITCHER  */}
    </div>
  )
}
