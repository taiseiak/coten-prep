import { Preload, PresentationControls } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { View } from './View'
import TextAndImage from './TextAndImage'
import { supabase } from '../utils/supabase'

export type MemoryProps = {
  url: string
  description: string
}

export default function Memory({ url, description }: MemoryProps) {
  const [publicUrl, setPublicUrl] = useState<string>('')

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '20%',
  })

  useEffect(() => {
    // "taiseiklasen-memories-bucket/DSCF1345.webp" => ["taiseiklasen-memories-bucket", "DSCF1345.webp", ""]
    const [bucketName, imagePath] = url.split(/\/(.*)/)
    const { data } = supabase.storage.from(bucketName).getPublicUrl(imagePath)
    setPublicUrl(data.publicUrl)
  }, [url])

  return (
    <Suspense fallback={null}>
      {publicUrl && (
        <View
          ref={ref}
          className={`duration-[2000ms] inset-0 h-screen grow transition-all ${
            inView ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Suspense fallback={null}>
            <PresentationControls
              // global
              snap
              zoom={0.8}
              polar={[0, Math.PI / 8]}
              azimuth={[-Math.PI / 8, Math.PI / 8]}
            >
              <Suspense fallback={null}>
                <TextAndImage publicUrl={publicUrl} description={description} />
              </Suspense>
            </PresentationControls>
            <Preload all />
          </Suspense>
        </View>
      )}
    </Suspense>
  )
}
