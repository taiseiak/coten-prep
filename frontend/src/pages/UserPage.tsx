import { useQuery } from 'urql'
import { graphql } from '../generated/gql'

const userMemoriesQuery = graphql(/* GraphQL */ `
  query userMemoriesQuery {
    memoriesCollection(
      filter: { user_id: { eq: "cefb6b04-d3c0-40b9-93f4-feab3b2ee528" } }
    ) {
      edges {
        node {
          id
          description
        }
      }
    }
  }
`)

export default function UserPage() {
  const [{ data }] = useQuery({
    query: userMemoriesQuery,
  })
  return (
    <section className="bg-white dark:bg-slate-700">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8">
        <div className="mr-auto place-self-center">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-none text-sky-400 dark:text-slate-200">
            User page
          </h1>
          <div>
            {data && (
              <ul>
                {data.memoriesCollection?.edges?.map(
                  (e, i) =>
                    e?.node && (
                      <li className="text-white text-xl" key={i}>
                        {e.node.description}
                      </li>
                    )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
