import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from '@/api/controllers/backend/recipe-db'

const data = {
  id: '65624c3263bd95fd6ba3ff6f',
  category: 'appetizer',
  cost: null,
  description: [
    {
      text: 'Ricetta Test',
      image: null,
    },
  ],
  difficulty: null,
  coverImage: '',
  image: [],
  ingredients: [],
  shortDescription: 'Ricetta Test',
  serving: null,
  times: null,
  title: 'Ricetta Test',
}

describe('Recipe Actions', () => {
  it('Create Recipe with defined data', async () => {
    const user: any = await createRecipe(data)
    expect(user?.title).toBe(data.title)
  })

  it('Get recipe by ID', async () => {
    const user: any = await getRecipe(data.id)
    expect(user?.title).toBe(data.title)
  })

  it('Update recipe by ID', async () => {
    const newData = {
      ...data,
      title: 'Ricetta Test 2',
    }
    const user: any = await updateRecipe(data.id, newData)
    expect(user?.title).toBe(newData.title)
  })

  it('Get recipe lists', async () => {
    const users: any = await getRecipes({ page: 1, limit: 10 })
    expect(users).toHaveProperty('data')
  })

  it('Delete created recipe', async () => {
    const user: any = await deleteRecipe(data.id)
    expect(user?.message).toBe('Recipe deleted')
  })
})

describe('User Error Actions', () => {
  it('Get recipe by ID', async () => {
    const user: any = await getRecipe('')
    expect(user).toHaveProperty('error')
  })

  it('Get recipe lists', async () => {
    const users: any = await getRecipes({ page: 0, limit: 10 })
    expect(users).toHaveProperty('error')
  })

  it('Get recipe by ID', async () => {
    const user: any = await getRecipe('')
    expect(user).toHaveProperty('error')
  })
})
