import { Suspense } from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'urql'
import Memory from '../components/Memory'
import { graphql } from '../generated/gql'

const userMemoriesQuery = graphql(/* GraphQL */ `
  query UserMemoriesQuery($userName: String) {
    usersCollection(filter: { user_name: { eq: $userName } }) {
      edges {
        node {
          user_name
          memoriesCollection {
            edges {
              node {
                description
                image_path
              }
            }
          }
        }
      }
    }
  }
`)

type edge = {
  node: {
    description: string
    image_path?: string | null
  }
}

export default function UserPage() {
  const { userId } = useParams()
  const [{ data, error }] = useQuery({
    query: userMemoriesQuery,
    variables: {
      userName: userId,
    },
  })

  if (error) {
    return (
      <section className="h-screen w-full">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8">
          <div className="mr-auto place-self-center">
            <h1 className="max-w-2xl text-4xl font-extrabold leading-none text-slate-200">
              User doesn't exist
            </h1>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="mx-auto grid max-w-screen-xl px-4 py-8">
        <Suspense fallback={<Loading />}>
          {data && (
            <div className="mr-auto place-self-center">
              <h1 className="max-w-2xl text-4xl font-extrabold leading-none text-slate-200">
                {data.usersCollection?.edges[0].node.user_name}'s Yozora
              </h1>
              <div className="flex flex-col">
                {data.usersCollection?.edges[0].node.memoriesCollection.edges.map(
                  (e: edge, i: number) =>
                    e.node && (
                      <div className="text-slate-200 text-xl" key={i}>
                        {e.node.description}
                        {e.node.image_path ? (
                          // <MemoryImage imageUrl={e.node.image_path} />
                          <Memory url={e.node.image_path} />
                        ) : null}
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </section>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}
