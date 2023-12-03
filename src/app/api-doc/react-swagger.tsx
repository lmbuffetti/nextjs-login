'use client'

import 'swagger-ui-react/swagger-ui.css'
import '@/styles/swagger.css'

import SwaggerUI from 'swagger-ui-react'

type Props = {
  spec?: Record<string, any>
  url?: string
}

function ReactSwagger({ spec, url }: Props) {
  // @ts-ignore - SwaggerUI is not typed
  if (spec) {
    return <SwaggerUI spec={spec} />
  }
  return <SwaggerUI url={url} />
}

export default ReactSwagger
