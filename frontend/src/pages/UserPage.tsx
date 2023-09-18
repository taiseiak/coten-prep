import { useQuery } from 'urql'
import { graphql } from '../generated/gql'
import { supabase } from '../utils/supabase'
import { useEffect, useState } from 'react'

const userMemoriesQuery = graphql(/* GraphQL */ `
  query userMemoriesQuery {
    memoriesCollection(
      filter: { user_id: { eq: "cefb6b04-d3c0-40b9-93f4-feab3b2ee528" } }
    ) {
      edges {
        node {
          id
          description
          image_path
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
  const [{ data }] = useQuery({
    query: userMemoriesQuery,
  })
  return (
    <section className="bg-slate-700">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8">
        <div className="mr-auto place-self-center">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-none text-slate-200">
            User page
          </h1>
          <div>
            {data && (
              <ul>
                {data.memoriesCollection?.edges?.map(
                  (e: edge, i: number) =>
                    e.node && (
                      <li className="text-slate-200 text-xl" key={i}>
                        {e.node.description}
                        {e.node.image_path ? (
                          <MemoryImage imageUrl={e.node.image_path} />
                        ) : null}
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

interface MemoryImageProps {
  imageUrl: string
}

function MemoryImage({ imageUrl }: MemoryImageProps) {
  const [publicUrl, setPublicUrl] = useState<string>('')
  useEffect(() => {
    // "taiseiklasen-memories-bucket/DSCF1345.webp" => ["taiseiklasen-memories-bucket", "DSCF1345.webp", ""]
    const [bucketName, imagePath] = imageUrl.split(/\/(.*)/)
    const { data } = supabase.storage.from(bucketName).getPublicUrl(imagePath)
    setPublicUrl(data.publicUrl)
  }, [imageUrl])

  return <img src={publicUrl} />
}
