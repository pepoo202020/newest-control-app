import React from 'react'
import LogoComponent, { logoSizes } from './logo-component'
import { cn } from '@/lib/utils'

export default function Loading({isLoading}: {isLoading: boolean}) {
  return (
    <div className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-950 backdrop-blur-sm",
        "animate-in fade-in duration-300"
      )}>
        <LogoComponent size={logoSizes.lg} splashScreen={true} />
        <div className="flex text-white flex-col items-center space-y-4">
        <div className="w-16 h-16 relative">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />
          {/* Inner pulsing circle */}
          <div className="absolute inset-2 rounded-full border-4 border-white/30 animate-pulse" />
        </div>
        <p className="text-lg font-medium text-white animate-pulse">
          جاري التحميل...
        </p>
      </div>
    </div>
  )
}
       
