import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { convertRoleArabic } from '@/utils/convert-role-arabic'
import { getRoleImage } from '@/utils/get-role-image'
import { Role, UserRole } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

export default function RoleProfileDialog({role}: {role: Role & {userRoles: UserRole[]}}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="عرض الملف الشخصي"
                >
                    <Image
                        src="/icons/profile.png"
                        alt="عرض الملف الشخصي"
                        width={16}
                        height={16}
                        className="opacity-70"
                    />
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-white dark:bg-gray-800'>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold text-center'>
                        {convertRoleArabic(role.name)}
                    </DialogTitle>
                </DialogHeader>
                <div className='flex items-center gap-5 px-5'>
                    <Image src={getRoleImage(role.name) || ''} alt={role.name} width={100} height={100} />
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm text-gray-500 dark:text-gray-400 space-x-2'>
                            <span>هل يستطيع التحكم بكل الفصول؟</span>
                            <span className={`${role.canAccessAllClasses ? 'bg-green-500' : 'bg-red-500'} text-white rounded-full  px-5`}>{role.canAccessAllClasses ? 'نعم' : 'لا'}</span>
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400 space-x-2'>
                            <span>عدد المستخدمين المعينين لهذا الدور</span>
                            <span className='font-bold'>{role.userRoles.length}</span>
                        </p>
                    </div>
                </div>
                <div className='flex items-center justify-end w-full gap-2'>
                    <Button variant="outline" >تعيين المستخدمين</Button>
                    <Button className='bg-red-500 hover:bg-red-600 text-white' >حذف الدور</Button>
                    <Button className='bg-blue-500 hover:bg-blue-600 text-white' >تعديل الدور</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
