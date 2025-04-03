'use client'
import Error from '@/components/shared/error'
import Loading from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { MultiSelectCombobox } from '@/components/ui/multi-select-combobox'
import { usersAssignRoleValidation } from '@/lib/validations/users-assign-role'
import { UsersAssignRoleValidation } from '@/lib/validations/users-assign-role'
import { convertRoleArabic } from '@/utils/convert-role-arabic'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, UserRole } from '@prisma/client'
import { Role } from '@prisma/client'
import { ChevronLeftIcon } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'


interface UserWithRoles extends UserRole {
    user: User
    role: Role
}
interface AdminUserWithRoles extends User {
    userRoles: UserRole[]
}

export default function AssignUsersPage() {
    // get the role id from the url
    const searchParams = useSearchParams()
    const roleId = searchParams.get('roleId')
    const [role, setRole] = useState<Role | null>(null)
    const [users, setUsers] = useState<UserWithRoles[]>([])
    const [adminUsers, setAdminUsers] = useState<AdminUserWithRoles[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const form = useForm<UsersAssignRoleValidation>({
        resolver: zodResolver(usersAssignRoleValidation),
        defaultValues: {
            users: [],
            roleId: roleId || '',
        },
    })
    // Validate roleId presence
    useEffect(() => {
        if (!roleId) {
            toast.error('معرف الدور مطلوب')
            router.push('/dashboard/roles')
            return
        }
    }, [roleId, router])


   // Fetch data
   useEffect(() => {
    const fetchData = async () => {
        try {
            setIsLoading(true)
            setError(null)

            // Parallel fetch for better performance
            const [roleResponse, usersResponse, adminUsersResponse] = await Promise.all([
                fetch(`/api/roles/get-specific?roleId=${roleId}`),
                fetch('/api/user-roles/get-admin-user-roles'),
                fetch('/api/users/all')
            ])

            if (!roleResponse.ok) {
                throw  Error({error: 'فشل في تحميل بيانات الدور'})
            }

            if (!usersResponse.ok) {
                throw  Error({error: 'فشل في تحميل بيانات المستخدمين'})
            }

            const [roleData, usersData, adminUsersData] = await Promise.all([
                roleResponse.json(),
                usersResponse.json(),
                adminUsersResponse.json()
            ])

            setRole(roleData)
            setUsers(usersData)
            setAdminUsers(adminUsersData)
        } catch (error) {
            const errorMessage = error instanceof Error ? error : 'حدث خطأ غير متوقع'
            setError(errorMessage as string)
            toast.error(errorMessage as string)
        } finally {
            setIsLoading(false)
        }
    }

    if (roleId) {
        fetchData()
    }
}, [roleId])


// Memoized filtered users
const availableUsers = useMemo(() => {
    if (!users.length || !roleId) return []
    
    return users.filter(user => 
        user.role.id !== roleId && !adminUsers.some(admin => admin.id === user.user.id)
    )
}, [users, roleId])


const options = useMemo(() => 
    availableUsers.map((user) => ({
        label: user.user.name || user.user.email || "مستخدم غير معروف",
        value: user.id
    }))
, [availableUsers])


    const handleUserSelection = (selectedValues: string[]) => {
        setSelectedUsers(selectedValues)
        form.setValue('users', selectedValues)
    }


    const onSubmit = async (data: UsersAssignRoleValidation) => {
        try {
            if (!data.users.length) {
                toast.error('الرجاء اختيار مستخدم واحد على الأقل')
                return
            }

            setIsLoading(true)
            const response = await fetch('/api/user-roles/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })

            const res = await response.json()

            if (response.ok) {
                toast.success(res.message)
                router.push('/dashboard/roles')
            } else {
                throw Error(res.message)
            }
        } catch (error : any) {
            
            const errorMessage = error instanceof Error ? error : 'فشل في تعيين المستخدمين'
            console.log(error)
            toast.error(errorMessage as string)
        } finally {
            setIsLoading(false)
        }
    }
    if (isLoading) <Loading />
    if (error) <Error error={error} />
    if (!role) return <div className="text-center p-4">لم يتم العثور على الدور</div>

    return (
        <Card className='max-w-2xl mx-auto bg-white dark:bg-gray-800/80 backdrop-blur-sm'>
            <CardHeader className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-2'>
                    <ChevronLeftIcon
                        className='w-5 h-5 cursor-pointer hover:text-primary transition-colors'
                        onClick={() => router.back()}
                    />
                    <CardTitle>تعيين مستخدمين لدور {convertRoleArabic(role?.name || '')}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <MultiSelectCombobox
                            label='اختر المستخدمين'
                            renderItem={(option) => <div>{option.label}</div>}
                            renderSelectedItem={(value) => <div>{value.length > 0 ? value.map(v => users.find(u => u.id === v)?.user.name || users.find(u => u.id === v)?.user.email || "مستخدم غير معروف").join(', ') : 'لا يوجد مستخدمين لتعيينهم لهذا الدور'}</div>}
                            options={options}
                            value={selectedUsers}
                            onChange={handleUserSelection}
                            noFoundLabel='لا يوجد مستخدمين لتعيينهم لهذا الدور'
                        />
                        <Button type='submit' className='w-full mt-4 bg-blue-950 text-white hover:bg-blue-950/90 transition-colors'>تعيين</Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}