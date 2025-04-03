import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
            return NextResponse.json(
                { error: 'Role not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(role)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
