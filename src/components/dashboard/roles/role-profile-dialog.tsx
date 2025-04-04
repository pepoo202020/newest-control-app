'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { convertRoleArabic } from '@/utils/convert-role-arabic'
import { getRoleImage } from '@/utils/get-role-image'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { RolesWithUser } from '@/app/(dashboard)/dashboard/roles/page'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'



export default function RoleProfileDialog({ role, assigUserClickHandler, router }: { role: RolesWithUser , assigUserClickHandler: (id: string) => void,  router: AppRouterInstance }) {
    const [openState, setOpenState] = useState<boolean>(false)
    const handleDeleteUserRole = async (id: string) => {
        try {
            const res = await fetch(`/api/user-roles/de-assign-user-role`, {
                method: 'DELETE',
                body: JSON.stringify({ id })
            })
            if (res.ok) {
                toast.success('تم حذف الدور بنجاح')
                
            }
        } catch (error) {
            toast.error('حدث خطأ ما')
        } finally {
            setOpenState(false)
            location.reload()
        }
    }
    const handleDeleteRole = async (id: string) => {
        try {
            const res = await fetch(`/api/roles/delete-role`, {
                method: 'DELETE',
                body: JSON.stringify({ id })
            })
            if (res.ok) {
                toast.success('تم حذف الدور بنجاح')
            }
        } catch (error) {
            toast.error('حدث خطأ ما')
        } finally {
            location.reload()
        }
    }

    return (
        <Dialog open={openState} onOpenChange={setOpenState}>
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
                {
                    role.userRoles.length > 0 && (
                        <>
                            <div className='w-full h-[1px] bg-gray-200 dark:bg-gray-700 mt-1' />
                            <div className='flex flex-col items-start justify-start'>
                                <h3 className='text-sm font-bold text-gray-500 dark:text-gray-400'>المستخدمين المعينين لهذا الدور</h3>
                                <div className='flex flex-col gap-2 w-full overflow-y-auto max-h-[200px]'>
                                    {role.userRoles.map((ur, index) => (
                                        <>
                                            <div key={ur.id} className='flex items-center justify-between w-full border border-gray-200 dark:border-gray-700 rounded-md p-2'>
                                                <p className='text-xs text-gray-500 dark:text-gray-400'>{ur.user.name}</p>
                                                <TrashIcon className='w-4 h-4 text-red-500 dark:text-red-400 cursor-pointer' onClick={() => handleDeleteUserRole(ur.id)} />
                                            </div>
                                            {index !== role.userRoles.length - 1 && (
                                                <div className='w-full h-[1px] bg-gray-200 dark:bg-gray-700 mt-1' />
                                            )}
                                        </>

                                    ))}
                                </div>
                            </div></>
                    )
                }
                <div className='flex items-center justify-end w-full gap-2'>
                    <Button variant="outline" size="sm" onClick={() => assigUserClickHandler(role.id)}>تعيين المستخدمين</Button>
                    <Button size="sm" className='bg-red-500 hover:bg-red-600 text-white' onClick={() => handleDeleteRole(role.id)}>حذف الدور</Button>
                    <Button size="sm" className='bg-blue-500 hover:bg-blue-600 text-white' >تعديل الدور</Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}
