import _mongoose, { connect } from 'mongoose'

declare global {

  var mongoose: {
    promise: ReturnType<typeof connect> | null
    conn: typeof _mongoose | null
  }
}

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || process.env.MONGODB_URI


if (!MONGODB_URI || MONGODB_URI.length === 0) {
  console.error(`Please add your MongoDB URI to .env.local ${MONGODB_URI} ${JSON.stringify(process.env)}`)
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

    // console.log('🚀 Using cached connection')
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = connect(dbUrl!, opts)
      .then(mongoose => {

        // console.log('✅ New connection established')
        return mongoose
      })
      .catch(error => {

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
