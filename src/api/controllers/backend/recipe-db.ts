import mongoose from 'mongoose'

import connectDB from '@/api/lib/connect-db'
import { RecipeClass, Recipes } from '@/api/Models/Recipes'
import { stringToObjectId } from '@/utils/utils'

interface TodoFilter {
  page?: number
  limit?: number
}

export async function getRecipes(filter: TodoFilter = {}) {
  try {
    await connectDB()

    const page = filter.page ?? 1
    const limit = filter.limit ?? 10
    const skip = (page - 1) * limit

    const recipes = await Recipes.find().skip(skip).limit(limit).lean().exec()

    const results = recipes.length

    return {
      data: recipes,
      page,
      limit,
      results,
    }
  } catch (error) {
    return { error }
  }
}

export async function createRecipe(data: RecipeClass) {
  try {
    await connectDB()
    if (data.id) {
      data._id = new mongoose.Types.ObjectId(data.id)
    } else {
      data._id = new mongoose.Types.ObjectId()
    }
    const recipe = await Recipes.create({
      ...data,
    })

    return recipe
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

export async function getRecipe(id: string) {
  try {
    await connectDB()

    const parsedId = stringToObjectId(id)
    if (!parsedId) {
      return { error: 'Recipes not found' }
    }
    const recipe = await Recipes.findById(parsedId).lean().exec()
    if (recipe) {
      return recipe
    } else {
      return { error: `Recipes not found` }
    }
  } catch (error) {
    return { error }
  }
}

export async function updateRecipe(id: string, data: RecipeClass) {
  try {
    await connectDB()

    const parsedId = stringToObjectId(id)

    if (!parsedId) {
      return { error: 'Todo not found' }
    }

    const recipe = await Recipes.findByIdAndUpdate(parsedId, data, {
      new: true,
    })
      .lean()
      .exec()

    if (recipe) {
      return recipe
    } else {
      return { error: 'Recipes not found' }
    }
  } catch (error) {
    return { error }
  }
}

export async function deleteRecipe(id: string) {
  try {
    await connectDB()

    const parsedId = stringToObjectId(id)

    if (!parsedId) {
      return { error: 'Recipes not found' }
    }

    const recipe = await Recipes.findByIdAndDelete(parsedId).exec()

    if (recipe) {
      return { message: 'Recipe deleted' }
    } else {
      return { error: 'Recipes not found' }
    }
  } catch (error) {
    return { error }
  }
}
