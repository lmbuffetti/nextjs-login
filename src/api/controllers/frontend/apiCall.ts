import * as process from 'process'

import endpointLists from '@/api/controllers/frontend/endpoints'

export default async function handler(
  type: keyof typeof endpointLists,
  requestType: RequestInit['method'],
  sendData?: object,
  id?: string,
  queryParam?: string,
) {
  const url = endpointLists[type](id)

  let optionsRequest: RequestInit = {
    method: requestType,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
  }

  if (requestType === 'GET') {
    optionsRequest = {
      method: requestType,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  let urlCall = `${process.env.API_URL}/api/${url}`

  if (queryParam) {
    urlCall += `?${queryParam}`
  }
  const request = await fetch(urlCall, optionsRequest)
  // const data = await (await fetch(`http://localhost:3000/api/${url}`)).json()
  const data = await request.json()

  return new Promise(function (resolve, reject) {
    if (request.status != 200) {
      reject(data.error)
    } else {
      resolve(data)
    }
  })
}
