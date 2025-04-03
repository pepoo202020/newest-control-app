import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const userRoles = await prisma.userRole.findMany({
            where: { role: { name: "ADMIN" } },
            include: {
                user: true,
                role: true,
            },
        });
        return NextResponse.json(userRoles)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch admin user roles" }, { status: 500 })
    }
}
