import NextAuth, { type DefaultSession, DefaultJWT } from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string
        first_name: string
        last_name: string
        company: string
        roles: string[]
    }

    interface Session {
        user: {
            first_name: string
            last_name: string
            company: string
            roles: string[]
        } & DefaultSession['user']
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        first_name: string
        last_name: string
        company: string
        roles: string[]
    }
}