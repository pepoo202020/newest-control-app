import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { convertRoleArabic } from '@/utils/convert-role-arabic'
import { Role } from '@prisma/client'
import React from 'react'

export default function RolesSelectFilter({roles, setSelectedRole, selectedRole}: {roles: Role[], setSelectedRole: (role: Role | null) => void, selectedRole: Role | null}) {
  return (
    <Select onValueChange={(value) => setSelectedRole(roles.find((role) => role.id === value) || null)} defaultValue={selectedRole?.id || 'all'}>
        <SelectTrigger>
            <SelectValue placeholder='اختار دور معين' />
        </SelectTrigger>
        <SelectContent className='bg-white dark:bg-gray-900 text-center'>
            <SelectItem value='all'>كل الادوار</SelectItem>
            {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>{convertRoleArabic(role.name)}</SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}
