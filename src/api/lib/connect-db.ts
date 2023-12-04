import _mongoose, { connect } from 'mongoose'

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    promise: ReturnType<typeof connect> | null
    conn: typeof _mongoose | null
  }
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB(dbUrl: string = MONGODB_URI) {
  if (cached.conn) {
    // eslint-disable-next-line no-console
    // console.log('🚀 Using cached connection')
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = connect(dbUrl!, opts)
      .then(mongoose => {
        // eslint-disable-next-line no-console
        // console.log('✅ New connection established')
        return mongoose
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        // console.error('❌ Connection to database failed')
        return error
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
