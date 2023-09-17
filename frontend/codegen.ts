import { CodegenConfig } from '@graphql-codegen/cli'

// Help from https://zenn.dev/sora_kumo/articles/0d107b03c58104
const config: CodegenConfig = {
  schema: {
    'https://aizlbudlcgkvdgqdzqrv.supabase.co/graphql/v1': {
      headers: {
        apiKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpemxidWRsY2drdmRncWR6cXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ5MjQzMDksImV4cCI6MjAxMDUwMDMwOX0.KJ2y8nOR8Loe0NuGhQRGw8HbScc-tOVKL_m9fl-9ouo',
      },
    },
  },
  documents: ['src/**/*.{graphql,tsx}'],
  ignoreNoDocuments: true, // for better experience with the watcher
  overwrite: true,
  generates: {
    './src/generated/gql/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations'],
    },
  },
  hooks: {
    afterOneFileWrite: 'prettier --write',
  },
}

export default config
