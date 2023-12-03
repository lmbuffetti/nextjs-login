import { getToken } from 'next-auth/jwt'
const authByLevel = async (req, role) => {
  const token = await getToken({ req })
  if (role === 'admin' && token.role === 'admin') {
    return true
  }
  if (role === 'user' && token?.role) {
    return true
  }
  return false
}

export default authByLevel
