import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import connectDB from '@/api/lib/connect-db'
import { User, UserClass } from '@/api/Models/Users'
import { stringToObjectId, validateEmail } from '@/utils/utils'

interface UserFilter {
  page?: number
  limit?: number
}

export async function getUsers(filter: UserFilter = {}) {
  try {
    await connectDB()

    const page = filter.page ?? 1
    const limit = filter.limit ?? 50
    const skip = (page - 1) * limit

    const users = await User.find({}, { password: 0 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec()

    const results = users.length

    return {
      data: users,
      page,
      limit,
      results,
    }
  } catch (error) {
    return { error }
  }
}

export async function createUser(data: UserClass) {
  try {
    await connectDB()

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(data.password, salt)

    if (!validateEmail(data.email)) {
      return { error: { message: 'Email not valid' } }
    }
    if (data.id) {
      data._id = new mongoose.Types.ObjectId(data.id)
    } else {
      data._id = new mongoose.Types.ObjectId()
    }
    return await User.create({
      ...data,
      password: hash,
    })
  } catch (error: unknown) {
    // @ts-ignore
    if (error?.code) {
      return {
        error: {
          // @ts-ignore
          code: error.code,
          // @ts-ignore
          message: error?.message,
          // @ts-ignore
          keyValue: error?.keyValue,
        },
      }
    }
    return { error }
  }
}

export async function getUser(id: string) {
  try {
    await connectDB()

    const parsedId = stringToObjectId(id)
    if (!parsedId) {
      return { error: 'User not found' }
    }
    const user = await User.findById(parsedId, { password: 0 }).lean().exec()
    if (user) {
      return user
    } else {
      return { error: { message: 'User not found' } }
    }
  } catch (error) {
    return { error }
  }
}

export async function updateUser(id: string, data: UserClass) {
  try {
    await connectDB()

    const parsedId = stringToObjectId(id)

    if (!parsedId) {
      return { error: { message: 'Todo not found' } }
    }

    const user = await User.findByIdAndUpdate(parsedId, data, { new: true })
      .lean()
      .exec()

    if (user) {
      return user
    } else {
      return { error: { message: 'User not found' } }
    }
  } catch (error) {
    return { error }
  }
}

export async function deleteUser(id: string) {
  try {
    await connectDB()

    const parsedId = stringToObjectId(id)

    if (!parsedId) {
      return { error: { message: 'User not found' } }
    }

    const user = await User.findByIdAndDelete(parsedId).exec()

    if (user) {
      return { message: 'User deleted' }
    } else {
      return { error: { message: 'User not found' } }
    }
  } catch (error) {
    return { error }
  }
}
