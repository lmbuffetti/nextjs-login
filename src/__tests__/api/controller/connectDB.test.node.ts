import connectDB from '@/api/lib/connect-db'

describe('Database Connection', () => {
  it('Error connection', async () => {
    const dbconn = await connectDB('errorURL')
    console.log(dbconn)
    expect(dbconn).toMatch(/(MongoParseError:)/i)
  })
})
