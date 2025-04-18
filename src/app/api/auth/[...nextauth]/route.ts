import bcrypt from 'bcryptjs'
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
        return user
      },
    }),
  ],
  callbacks: {
    async session(data) {
      try {
        const users = await getUser(data.token.sub)
        delete data.token._id
        return { ...data.session, ...users, _id: data.token.sub, ...data.token }
      } catch (err) {
        console.error(err)
        return { ...data.session, _id: data.token.sub, ...data.token }
      }
    },
    async jwt({ token }) {
      try {
        const users = await getUser(token.sub)
        return { ...token, ...users }
      } catch (err) {
        console.error(err)
        return { ...token }
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
