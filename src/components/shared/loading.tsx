import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 text-white bg-blue-950 flex items-center justify-center backdrop-blur-sm">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative">
          {/* Outer spinning circle */}
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
          {/* Inner pulsing circle */}
          <div className="absolute inset-0 m-2 rounded-full border-4 border-white/30 animate-pulse" />
          {/* Loading text */}
          <div className="absolute top-20 right-1/2 translate-x-1/2 whitespace-nowrap">
            <p className="text-sm text-muted-foreground">جاري التحميل...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
       
