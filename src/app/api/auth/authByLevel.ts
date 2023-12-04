import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
const authByLevel = async (req: NextRequest, role: string) => {
  const token = await getToken({ req })
  if (role === 'admin' && token?.role === 'admin') {
    return true
  }
  if (role === 'user' && token?.role) {
    return true
  }
  return false
}

export default authByLevel
