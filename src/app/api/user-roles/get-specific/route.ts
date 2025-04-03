import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// get the role id from the request
// check if the role exists
// get all users with the role id
// return the users

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const roleId = searchParams.get('roleId');
        if (!roleId) {
            return NextResponse.json(
                { error: 'Role ID is required' },
                { status: 400 }
            );
        }
        const role = await prisma.role.findUnique({
            where: { id: roleId }
        })
        if (!role) {
            return NextResponse.json({ message: 'Role not found' }, { status: 404 })
        }
        const users = await prisma.userRole.findMany({
            where: { roleId },
            include: {
                user: true
            }
        })
        return NextResponse.json({ users }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error getting users with role' }, { status: 500 })
    }
}

