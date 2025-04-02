'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Loading from '@/components/shared/loading'
import DashboardHeader from '@/components/dashboard/shared/header'
import { RoleProvider } from '@/providers/role-provider'
import MenuNavbar from '@/components/dashboard/menu-navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const userRoles = session?.user.roles as string[]
 
 
  const router = useRouter()

  // Show loading state while checking session
  if (status === "loading") {
    return <Loading />
  }

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    router.push('/login')
    return <Loading />
  }

  return (
    <RoleProvider initialRole={userRoles[0]}>
      <main
        className={cn(
          "w-screen h-screen overflow-hidden flex flex-col dark:bg-[#1D253B50] dark:text-white bg-neutral-200 text-[#1D253B]"
        )}
      >
        <DashboardHeader />
        <div className="flex-1 p-5">{children}</div>
        <MenuNavbar />
      </main>
    </RoleProvider>
  )
} 