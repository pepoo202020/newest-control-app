
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import DashboardHeader from '@/components/dashboard/shared/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-[100vh] overflow-hidden flex flex-col bg-gray-100 dark:bg-gray-900">
     <DashboardHeader />
     <main className='flex-1'>{children}</main>
     <div>navbar</div>
    </div>
  )
} 