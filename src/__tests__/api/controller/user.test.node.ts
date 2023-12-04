import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '@/api/controllers/backend/user-db'

const data = {
  id: '656c7a67e7a9bc62bb5fa656',
  name: 'Essie Singleton',
  password: 'test.99',
  role: '6551f7cc8f006751fc52a52b',
  email: 'essiesingleton@exospace.com',
}

describe('User Actions', () => {
  it('Create user with defined data', async () => {
    const user: any = await createUser(data)
    expect(user?.name).toBe(data.name)
    expect(user?.email).toBe(data.email)
  })

  it('Get user by ID', async () => {
    const user: any = await getUser(data.id)
    expect(user?.name).toBe(data.name)
    expect(user?.email).toBe(data.email)
  })

  it('Update user by ID', async () => {
    const newData = {
      ...data,
      name: 'Jonh Doe',
      email: 'jonhdoe@gmail.com',
    }
    const user: any = await updateUser(data.id, newData)
    expect(user?.name).toBe(newData.name)
    expect(user?.email).toBe(newData.email)
  })

  it('Get user lists', async () => {
    const users: any = await getUsers({ page: 1, limit: 10 })
    expect(users).toHaveProperty('data')
  })

  it('Delete created user', async () => {
    const user: any = await deleteUser(data.id)
    expect(user?.message).toBe('User deleted')
  })
})

describe('User Error Actions', () => {
  it('Create user with defined data', async () => {
    delete data.email
    const user: any = await createUser(data)
    expect(user).toHaveProperty('error')
  })

  it('Get user by ID', async () => {
    const user: any = await getUser('')
    expect(user).toHaveProperty('error')
  })

  it('Update user by ID', async () => {
    const newData = {
      ...data,
      name: 'Jonh Doe',
      email: '',
    }
    const user: any = await updateUser(data.id, newData)
    expect(user).toHaveProperty('error')
  })

  it('Get user lists', async () => {
    const users: any = await getUsers({ page: 0, limit: 10 })
    expect(users).toHaveProperty('error')
  })

  it('Get user by ID', async () => {
    const user: any = await getUser('')
    expect(user).toHaveProperty('error')
  })
})
