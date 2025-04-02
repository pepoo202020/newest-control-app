import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create roles
  const adminRole = await prisma.role.create({
    data: {
      name: "ADMIN",
      canAccessAllClasses: true,
    },
  })

  const controllerRole = await prisma.role.create({
    data: {
      name: "CONTROLLER",
      canAccessAllClasses: true,
    },
  })

  const teacherRole = await prisma.role.create({
    data: {
      name: "TEACHER",
      canAccessAllClasses: false,
    },
  })

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      name: "مدير النظام",
      email: "admin@example.com",
      password: await hash("password123", 10),
      isActive: true,
      userRoles: {
        create: {
          roleId: adminRole.id,
        },
      },
    },
  })

  // Create a test controller
  const controllerUser = await prisma.user.create({
    data: {
      name: "مشرف",
      email: "controller@example.com",
      password: await hash("password123", 10),
      isActive: true,
      userRoles: {
        create: {
          roleId: controllerRole.id,
        },
      },
    },
  })

  // Create a test teacher
  const teacherUser = await prisma.user.create({
    data: {
      name: "معلم",
      email: "teacher@example.com",
      password: await hash("password123", 10),
      isActive: true,
      userRoles: {
        create: {
          roleId: teacherRole.id,
        },
      },
    },
  })

  console.log({ adminRole, controllerRole, teacherRole })
  console.log({ adminUser, controllerUser, teacherUser })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })