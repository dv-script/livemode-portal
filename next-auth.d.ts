import NextAuth, { type DefaultSession, DefaultJWT } from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string
        first_name: string
        last_name: string
        email: string
        roles: string[]
    }

    interface Session {
        user: {
            roles: string[]
        } & DefaultSession['user']
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        roles: string[]
    }
}