/**
 * @swagger
 *  /api/users/list?page=1&limit=10:
 *    get:
 *      summary: Get user by ide.
 *      description: Delete Brewery from database.
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 */

import { NextRequest, NextResponse } from 'next/server'

import { getUsers } from '@/api/controllers/backend/user-db'
import getLevel from '@/app/api/auth/authByLevel'

export async function GET(req: NextRequest) {
  const isAuth = await getLevel(req, 'admin')
  const url = new URL(req.url)

  const page = +url.searchParams.get('page')
  const limit = +url.searchParams.get('limit')
  if (!isAuth) {
    return NextResponse.json(
      { error: 'You are not authorised' },
      { status: 500 },
    )
  }
  const users = await getUsers({ page, limit })
  return NextResponse.json(users)
}
