'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu'
import { 
  LogOut, 
  User, 
  Settings, 
  Key, 
  Moon, 
  Sun,
  Laptop 
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UserProfileProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    roles?: string[]
  } | undefined
  logout: () => void
}

export default function UserProfile({ user, logout }: UserProfileProps) {
  const { setTheme, theme } = useTheme()
  
  const userInitials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || '??'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 transition-all">
            {user?.image ? (
              <AvatarImage
                src={user.image}
                alt={user?.name || 'صورة المستخدم'}
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="text-xs font-medium">
                {userInitials}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 dark:bg-gray-900 bg-white" 
        align="start"
        sideOffset={2}
      >
        <DropdownMenuLabel className="flex items-center justify-between gap-3 px-3 py-2">
          <Avatar className="h-10 w-10">
            {user?.image ? (
              <AvatarImage
                src={user.image}
                alt={user?.name || 'صورة المستخدم'}
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="text-sm font-medium">
                {userInitials}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex min-w-0 flex-col px-5">
            <span className="truncate text-sm font-medium">
              {user?.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {user?.email}
            </span>
            {user?.roles && user.roles.length > 0 && (
              <span className="mt-1 text-xs font-medium text-primary">
                {user.roles[0]}
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-3 px-3 py-2">
            <User className="h-4 w-4" />
            <span>الملف الشخصي</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3 px-3 py-2">
            <Settings className="h-4 w-4" />
            <span>الإعدادات</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-xs font-medium">
            المظهر
          </DropdownMenuLabel>
          <DropdownMenuItem 
            className="gap-3 px-3 py-2"
            onClick={() => setTheme('light')}
          >
            <Sun className={cn("h-4 w-4", theme === 'light' && "text-primary")} />
            <span>فاتح</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="gap-3 px-3 py-2"
            onClick={() => setTheme('dark')}
          >
            <Moon className={cn("h-4 w-4", theme === 'dark' && "text-primary")} />
            <span>داكن</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="gap-3 px-3 py-2"
            onClick={() => setTheme('system')}
          >
            <Laptop className={cn("h-4 w-4", theme === 'system' && "text-primary")} />
            <span>تلقائي</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="gap-3 px-3 py-2 text-destructive focus:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          <span>تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
