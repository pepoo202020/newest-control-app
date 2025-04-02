import { AuthOptions } from 'next-auth'
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'

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

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        // Will be overridden in the provider based on isStayLoggedIn
        maxAge: 24 * 60 * 60, // 24 hours by default
        
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "البريد الإلكتروني", type: "email" },
                password: { label: "كلمة المرور", type: "password" },
                remember: { label: "البقاء متصلا", type: "boolean" }
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
                    }

                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        include: { userRoles: { include: { role: true } } }
                    });

                    if (!user) {
                        throw new Error("البريد الإلكتروني غير موجود");
                    }

                    if (!user.isActive) {
                        throw new Error("الحساب غير مفعل");
                    }

                    // const isPasswordValid = await compare(credentials.password, user.password);
                    // if (!isPasswordValid) {
                    //     throw new Error("كلمة المرور غير صحيحة");
                    // }

                    // Set session maxAge based on isStayLoggedIn
                    const sessionMaxAge = credentials?.remember === 'true' 
                        ? 30 * 24 * 60 * 60  // 30 days
                        : 24 * 60 * 60;      // 24 hours

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        roles: user.userRoles.map(ur => ur.role.name),
                        sessionMaxAge
                    };
                } catch (error) {
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.roles = user.roles;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.roles = token.roles;
            }
            return session;
        }
    }
}