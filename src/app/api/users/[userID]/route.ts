/**
 * @swagger
 * /api/users/{userID}:
 *   tags:
 *     - user
 *   get:
 *     summary: Get a user by id
 *     parameters:
 *      - in: path
 *        name: userID
 *        schema:
 *          type: string
 *        description: The user id of user you want to get.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  _id: string
 *                  avatar: string
 *                  email: string
 *                  name: string
 *                  role: string
 *   put:
 *     summary: Update a user by id
 *     parameters:
 *      - in: path
 *        name: userID
 *        schema:
 *          type: string
 *        description: The user id of user you want to update.
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *        description: Email.
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Name.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  _id: string
 *                  avatar: string
 *                  email: string
 *                  name: string
 *                  role: string
 *   delete:
 *     summary: Delete a user by id
 *     parameters:
 *      - in: path
 *        name: userID
 *        schema:
 *          type: string
 *        description: The user id of user you want to delete.
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *        description: Email.
 *     responses:
 *       200:
 *         description: Success
 */

import { NextRequest, NextResponse } from 'next/server'
import { EventEmitter } from 'stream'

import {
  deleteUser,
  getUser,
  updateUser,
} from '@/api/controllers/backend/user-db'
import getLevel from '@/app/api/auth/authByLevel'

export async function GET(
  req: NextRequest,
  { params }: { params: { userID: string } },
) {
  const isAuth = await getLevel(req, 'admin')
  if (!isAuth) {
    return NextResponse.json(
      { error: 'You are not authorised' },
      { status: 500 },
    )
  }
  const user = await getUser(params.userID)

  return NextResponse.json(user)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userID: string } },
) {
  const isAuth = await getLevel(req, 'admin')
  if (!isAuth) {
    return NextResponse.json(
      { error: 'You are not authorised' },
      { status: 500 },
    )
  }
  const user = await deleteUser(params.userID)

  return NextResponse.json(user)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userID: string } },
) {
  const isAuth = await getLevel(req, 'admin')
  if (!isAuth) {
    return NextResponse.json(
      { error: 'You are not authorised' },
      { status: 500 },
    )
  }
  try {
    let data
    if (req instanceof EventEmitter) {
      data = req.body
    } else {
      // Otherwise, use request.json()
      data = await req.json()
    }
    const user = await updateUser(params.userID, data)

    return NextResponse.json(user)
  } catch (err) {
    console.error(err)
  }
}
