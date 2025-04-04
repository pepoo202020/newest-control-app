'use client'
import RolesSelectFilter from '@/components/dashboard/roles/roles-select-filter'
import CustomBreadcrumb from '@/components/dashboard/shared/custom-breadcrumb'
import Error from '@/components/shared/error'
import Loading from '@/components/shared/loading'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { convertRoleArabic } from '@/utils/convert-role-arabic'
import { getRoleImage } from '@/utils/get-role-image'
import { Role, User, UserRole } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import RoleProfileDialog from '@/components/dashboard/roles/role-profile-dialog'
import { useRouter } from 'next/navigation'

interface UserRoleWithUser extends UserRole {
    user: User
    role: Role
}

export interface RolesWithUser extends Role {
    userRoles: UserRoleWithUser[]
}

export default function RolesPage() {
    const [roles, setRoles] = useState<RolesWithUser[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedRole, setSelectedRole] = useState<RolesWithUser | null>(null)
    const router = useRouter()

    const assigUserClickHandler = (id: string) => {
        router.push(`/dashboard/roles/assign-users?roleId=${id}`)
    }

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                setIsLoading(true)
                const response = await fetch("/api/roles/all")
                if (!response.ok) toast.error("Failed to fetch roles")
                const data = await response.json()
                setRoles(data)
            } catch (error) {
                setError(error as string)
            } finally {
                setIsLoading(false)
            }
        }
        fetchRoles()
    }, [])

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

    if (isLoading) return <Loading />
    if (error) return <Error error={error} />

    const filteredRoles = selectedRole ? roles.filter((role) => role.name === selectedRole.name) : roles

    return (
        <div className='flex flex-col gap-4'>
            <CustomBreadcrumb>
                <RolesSelectFilter roles={roles} setSelectedRole={setSelectedRole} selectedRole={selectedRole} />
            </CustomBreadcrumb>

            <div className=' p-2 h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-5 flex-1'>
                {filteredRoles.map((role: RolesWithUser) => (
                    <Card
                        key={role.id}
                        className={cn(
                            "group relative overflow-hidden transition-all duration-300",
                            "hover:shadow-lg hover:scale-[1.02]",
                            "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
                            "border-gray-200 dark:border-gray-700"
                        )}
                    >
                        <CardContent className="flex flex-col items-center justify-center p-4">
                            <div className="relative mb-4">
                                <Image
                                    src={getRoleImage(role.name) || ''}
                                    alt={`${convertRoleArabic(role.name)} role`}
                                    width={80}
                                    height={80}
                                    className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-blue-950 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {
                                        role.userRoles.length
                                    }
                                </div>
                            </div>

                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                                {convertRoleArabic(role.name)}
                            </h2>

                            <div className="flex items-center mt-2">
                                <RoleProfileDialog router={router} role={role} assigUserClickHandler={assigUserClickHandler} />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    title="تعيين المستخدمين"
                                    onClick={() => assigUserClickHandler(role.id)}
                                >
                                    <Image
                                        src="/icons/seminar.png"
                                        alt="تعيين المستخدمين"
                                        width={16}
                                        height={16}
                                        className="opacity-70"
                                    />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    title="تعديل"
                                >
                                    <Image
                                        src="/icons/user.png"
                                        alt="تعديل"
                                        width={16}
                                        height={16}
                                        className="opacity-70"
                                    />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400"
                                    title="حذف"
                                    onClick={() => handleDeleteRole(role.id)}
                                >
                                    <Image
                                        src="/icons/recycle-bin.png"
                                        alt="حذف"
                                        width={16}
                                        height={16}
                                        className="opacity-70"
                                    />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <Card
                    className={cn(
                        "group cursor-pointer transition-all duration-300",
                        "hover:shadow-lg hover:scale-[1.02]",
                        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
                        "border-gray-200 dark:border-gray-700",
                        "border-2 border-dashed"
                    )}
                    onClick={() => { router.push('/dashboard/roles/new') }}
                >
                    <CardContent className="flex h-full w-full items-center justify-center p-4">
                        <div className="flex flex-col items-center gap-2">
                            <Image
                                src="/icons/plus.png"
                                alt="إضافة دور جديد"
                                width={40}
                                height={40}
                                className="opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                إضافة دور جديد
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
