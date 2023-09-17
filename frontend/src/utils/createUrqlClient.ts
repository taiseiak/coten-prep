import { cacheExchange, createClient, fetchExchange } from 'urql'

export const client = createClient({
  url: `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/graphql/v1`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
        apikey: token ? token : '',
      },
    }
  },
})
