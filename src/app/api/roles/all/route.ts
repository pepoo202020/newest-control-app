import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const roles = await prisma.role.findMany({
        include: {
            userRoles: {
                include: {
                    user: true,
                    role: true
                }
            }
        }
    })
    return NextResponse.json(roles)
}
