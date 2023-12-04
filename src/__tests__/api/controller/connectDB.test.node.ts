import connectDB from '@/api/lib/connect-db'

describe('Database Connection', () => {
  it('Error connection', async () => {
    const dbconn = await connectDB('')
    expect(dbconn.toString()).toMatch(/(MongoParseError:)/i)
  })
})
