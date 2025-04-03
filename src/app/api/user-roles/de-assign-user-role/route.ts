import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json()
        
        // check if the user role exists
        const userRole = await prisma.userRole.findUnique({
            where: {
                id
            }
        })
        if (!userRole) {
            return NextResponse.json({ message: 'User role not found' }, { status: 404 })
        }
        //delete the user role
        await prisma.userRole.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: 'User role de-assigned' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Failed to de-assign user role' }, { status: 500 })
    }
}
