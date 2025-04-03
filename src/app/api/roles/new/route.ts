import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json()
        let accessAllClasses : boolean = false;
        // check if the role already exists
        const role = await prisma.role.findUnique({
            where: {
                name: name
            }
        })
        if (role) {
            return NextResponse.json({ message: 'Role already exists' }, { status: 400 })
        }
        // check if the role is admin
        if (name === "ADMIN") {
            accessAllClasses = true;
        }
        // create the role
        const newRole = await prisma.role.create({
            data: { name , canAccessAllClasses: accessAllClasses }
        })
        return NextResponse.json({ message: 'Role created successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Failed to create role' }, { status: 500 })
    }
}