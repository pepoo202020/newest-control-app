import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {   
        const { id } = await request.json()
        await prisma.role.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: 'Role deleted successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete role' }, { status: 500 })
    }
}
