import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { name, description } = await request.json()

        const existingLevel = await prisma.level.findUnique({
            where: {
                name,
            }
        })
        if (existingLevel) {
            return NextResponse.json({ message: 'المستوى موجود بالفعل' }, { status: 400 })
        }
        const level = await prisma.level.create({
            data: {
                name,
                description,
            }
        })
        return NextResponse.json({ message: 'تم إنشاء المستوى بنجاح', level }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 })
    }
}
