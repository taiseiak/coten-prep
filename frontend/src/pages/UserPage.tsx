import { Suspense } from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'urql'
import Memory from '../components/Memory'
import { graphql } from '../generated/gql'
import { Link } from 'react-router-dom'

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
    <section className="snap-y snap-mandatory">
      <div className="mx-auto">
        <Suspense fallback={<Loading />}>
          {data && (
            <>
              <section className="z-20 intro fixed inset-0 flex h-screen w-screen animate-slide-out-top items-center justify-center bg-black">
                <h1 className="animate-slide-out-fwd-center max-w-2xl text-4xl font-extrabold leading-none text-slate-200">
                  {data!
                    .usersCollection!.edges[0].node!.user_name.charAt(0)
                    .toUpperCase() +
                    data!.usersCollection!.edges[0].node!.user_name.slice(1)}
                  's Yozora
                </h1>
              </section>
              <div className="place-self-center">
                <nav className="fixed flex justify-between w-full z-10">
                  <h1 className="m-4 text-4xl font-extrabold leading-none text-slate-200">
                    {data!
                      .usersCollection!.edges[0].node!.user_name.charAt(0)
                      .toUpperCase() +
                      data!.usersCollection!.edges[0].node!.user_name.slice(1)}
                    's Yozora
                  </h1>
                  <Link
                    to="/"
                    className="m-4 text-4xl font-extrabold leading-none text-slate-200"
                  >
                    Home
                  </Link>
                </nav>
                <div className="flex flex-col w-full snap-center">
                  {data.usersCollection?.edges[0].node.memoriesCollection.edges.map(
                    (e: edge, i: number) =>
                      e.node && (
                        <div className="flex" key={i}>
                          {e.node.image_path && e.node.description && (
                            <Memory
                              url={e.node.image_path}
                              description={e.node.description}
                            />
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            </>
          )}
        </Suspense>
      </div>
    </section>
  )
}

function Loading() {
  return (
    <section className="intro fixed inset-0 flex h-screen w-screen animate-slide-out-top items-center justify-center bg-black"></section>
  )
}
