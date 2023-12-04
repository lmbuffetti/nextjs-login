import APIDoc from 'src/api/Swagger/index.json'
import ReactSwagger from 'src/app/api-doc/react-swagger'

export default async function IndexPage() {
  return (
    <section className="container">
      <ReactSwagger spec={APIDoc} />
    </section>
  )
}
