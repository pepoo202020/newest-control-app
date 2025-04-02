'use client'
import LogoComponent, { logoSizes } from "@/components/shared/logo-component";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const {data: session, status} = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSlideUp, setIsSlideUp] = useState<boolean>(false)


  useEffect(() => {
    // wait 2 seconds before redirecting to dashboard
    const timer = setTimeout(() => {
      setIsSlideUp(true) 
      setTimeout(() => {
        setIsLoading(false)
        if (status === 'authenticated') {
          router.push('/dashboard')
        } else {
          router.push('/login')
        }
      }, 900) 
    }, 2000)

    return () => clearTimeout(timer)
  },[status, router])
  return (
    <div className={cn("fixed inset-0 bg-blue-950 flex items-center justify-center transition-transform duration-[950ms] ease-in-out",
        isSlideUp && "-translate-y-full")}>
      <LogoComponent size={logoSizes.lg} splashScreen={true} />
      {isLoading && (
          <div className="mt-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin">
            </div>
          </div>
        )}
    </div>
  );
}
