import mongoose from 'mongoose'
import ms from 'ms'
import { NextResponse } from 'next/server'

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) {
    return 'never'
  }
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`
}

export function stringToObjectId(id: string): mongoose.Types.ObjectId | string {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return new mongoose.Types.ObjectId(id)
  } else {
    return id
  }
}

export function createErrorResponse(
  message: string,
  statusCode: number,
): NextResponse {
  const errorResponse = {
    status: statusCode >= 500 ? 'error' : 'fail',
    message,
  }

  return new NextResponse(JSON.stringify(errorResponse), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}
