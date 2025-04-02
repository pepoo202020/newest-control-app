import { AuthOptions } from 'next-auth'
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare} from 'bcryptjs'

const prisma = new PrismaClient()

declare module "next-auth" {
    interface User {
        roles: string[]
    }
    interface Session {
        user: User & {
            roles: string[]
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        roles: string[]
    }
}

export const authOptions : AuthOptions = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "تسجيل الدخول",
            credentials: {
                email: {label: "البريد الإلكتروني", type:"email"},
                password: {label: "كلمة المرور", type:"password"},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {email: credentials.email},
                    include: {userRoles: {include: {role: true}}}
                })
                if (!user || !user.isActive) {
                    return null;
                }
                const isPasswordValid = await compare(credentials.password, user.password)
                if (!isPasswordValid) {
                    return null;
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    roles: user.userRoles.map(ur => ur.role.name)
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.roles = user.roles;
            }
            return token;
        },
        async session({session, token}) {
            if(token) {
                session.user.roles = token.roles;
            }
            return session;
        }
    }
}