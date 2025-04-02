import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Bell } from 'lucide-react'
import React from 'react'

export default function UserNotification({notifications} : {notifications: number}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <Bell className="h-7 w-7 dark:fill-[#1D253B] fill-white" />
          <div
            className={cn(
              "h-5 w-5 rounded-full text-xs absolute -top-2 -right-1 flex items-center justify-center border-2 border-white dark:bg-white dark:text-[#1D253B] bg-[#1D253B] text-white"
            )}
          >
            {notifications}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="text-xs px-2">Notifications</PopoverContent>
    </Popover>
  )
}
