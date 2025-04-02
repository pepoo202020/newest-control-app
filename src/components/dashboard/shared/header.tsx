import LogoComponent, { logoSizes } from '@/components/shared/logo-component'
import React from 'react'

export default function DashboardHeader() {
  return (
    <div className='sticky inset-0 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-5 px-5 lg:px-10 flex items-center justify-between'>
        {/* LOGO */}
        <LogoComponent size={logoSizes.sm} />
        {/* USER MAIN ROLE HEADER */}
        <h1 className="hidden lg:block text-2xl font-semibold capitalize">
            لوحة تحكم المدير
        </h1>
        {/* ROLES CHANGER  */}
        {/* USER NOTIFICATIONS  */}
        {/* USER PROFILE  */}
        {/* THEME SWITCHER  */}
    </div>
  )
}
