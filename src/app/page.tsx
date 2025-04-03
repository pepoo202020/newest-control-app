'use client'

import LogoComponent, { logoSizes } from "@/components/shared/logo-component";
import Loading from "@/components/shared/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return

    if (session) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [session, status, router])

  return (
    <div className="fixed inset-0 bg-blue-950 flex flex-col items-center justify-center">
      <LogoComponent size={logoSizes.lg} splashScreen={true} />
      <Loading />
    </div>
  );
}