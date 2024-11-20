/**
 * @swagger
 *  /api/auth/register:
 *    tags:
 *      - user
 *    post:
 *      summary: Create user.
 *      description: Create user using email and password.
 *      parameters:
 *        - in: query
 *          name: email
 *          schema:
 *            type: string
 *          description: The email of user you want register.
 *        - in: query
 *          name: password
 *          schema:
 *            type: string
 *          description: The email of user you want register.
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   avatar:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */

import { NextRequest, NextResponse } from 'next/server'
import { EventEmitter } from 'stream'

import { createUser } from '@/api/controllers/backend/user-db'

export async function POST(req: NextRequest) {
  try {
    let data: any
    if (req instanceof EventEmitter) {
      data = req.body
    } else {
      // Otherwise, use request.json()
      data = await req.json()
    }
    const user: any = await createUser(data)

    if (user?.error) {
      console.error(user)
      return NextResponse.json({ ...user, success: false }, { status: 500 })
    }
    return NextResponse.json(user)
  } catch (err) {
    console.log(err);
    NextResponse.json(err, { status: 500 })
  }
}
