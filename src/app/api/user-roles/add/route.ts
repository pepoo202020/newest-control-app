import { prisma } from "@/lib/prisma";
import { convertRoleArabic } from "@/utils/convert-role-arabic";
import { NextRequest, NextResponse } from "next/server";

// get the role id from the request
// check if the role exists
// get all users with the role id
// filter the users that have not the role id
// check if the user is already in the role
// if not, add the user to the role
// return the users that have been added to the role

export async function POST(request: NextRequest) {
    try {
        
        const { users, roleId } = await request.json()
        const usersId = users.map((user: any) => user)
        const role = await prisma.role.findUnique({
            where: { id: roleId }
        })
        if (!role) {
            return NextResponse.json({ message: 'Role not found' }, { status: 404 })
        }
        for (const ui of usersId) {
            const user = await prisma.user.findUnique({
                where: { id: ui },
                include: {
                    userRoles: {
                        include: {
                            role: true,
                        },
                    },
                    
                }

            })
            if (!user) {
                return NextResponse.json({ message: `User not found` }, { status: 404 })
            }
            if(user.userRoles.some(ur => ur.role.name === "ADMIN")) {
                return NextResponse.json({ message: `لا يمكن اضافة المستخدم لديه دور مدير الى الدور ${convertRoleArabic(role.name)}` }, { status: 400 })
            }
           
            await prisma.userRole.create({
                data: { userId: user.id, roleId },
                include: {
                    role: true,
                }
            })
            return NextResponse.json({ message: `User added to role` }, { status: 200 })
            
        }
        
        return NextResponse.json({ message: `المستخدمين تم اضافتهم الى الدور ${convertRoleArabic(role.name)}` }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Error adding user to role' }, { status: 500 })
    }
}