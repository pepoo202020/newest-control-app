import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(request: NextRequest) {
    try {
        const levels = await prisma.level.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                classes: true
            }
        })
        return NextResponse.json(levels)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch levels' }, { status: 500 })
    }
}
