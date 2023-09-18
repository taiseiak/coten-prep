import { Image, PresentationControls } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { View } from './View'
import { supabase } from '../utils/supabase'
import { useInView } from 'react-intersection-observer'

type MemoryProps = {
  url: string
}

export default function Memory({ url }: MemoryProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-20%',
  })
  const [publicUrl, setPublicUrl] = useState<string>('')
  useEffect(() => {
    // "taiseiklasen-memories-bucket/DSCF1345.webp" => ["taiseiklasen-memories-bucket", "DSCF1345.webp", ""]
    const [bucketName, imagePath] = url.split(/\/(.*)/)
    const { data } = supabase.storage.from(bucketName).getPublicUrl(imagePath)
    setPublicUrl(data.publicUrl)
  }, [url])

  return (
    <View
      ref={ref}
      className={`duration-[2000ms] inset-0 h-screen w-full transition-all ${
        inView ? 'translate-x-0' : '-translate-x-[80%]'
      }`}
    >
      <Suspense fallback={null}>
        <PresentationControls
          // global
          snap
          zoom={0.8}
          rotation={[0, Math.PI * 0.05, 0]}
          polar={[0, Math.PI / 8]}
          azimuth={[-Math.PI / 8, Math.PI / 8]}
        >
          <Image transparent url={publicUrl} scale={5} />
        </PresentationControls>
      </Suspense>
    </View>
  )
}
