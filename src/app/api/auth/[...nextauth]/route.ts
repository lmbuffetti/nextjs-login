import bcrypt from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { getUser } from '@/api/controllers/backend/user-db'
import connectDB from '@/api/lib/connect-db'
import { User } from '@/api/Models/Users'

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error('Missing username or password')
        }
        await connectDB()

        const users = await User.find({ email: email }).exec()

        const user = users[0]

        if (!user) {
          throw new Error('User not found')
        }

        const passCheck = await bcrypt.compare(password, user?.password)
        if (!passCheck) {
          throw new Error('Password is incorrect')
        }
        delete user[0]._id
        return user[0]
      },
    }),
  ],
  callbacks: {
    async session(data) {
      const users = await getUser(data.token.sub)
      delete data.token._id
      return { ...data.session, ...users, _id: data.token.sub, ...data.token }
    },
    async jwt({ token }) {
      const users = await getUser(token.sub)
      return { ...token, ...users }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
