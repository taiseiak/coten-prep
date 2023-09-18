import { Stars as DreiStars } from '@react-three/drei'

export default function Stars() {
  //   const ref = useRef<HTMLDivElement>(null!)
  return (
    <>
      {/* <div className="fixed inset-0 h-screen w-screen -z-10" ref={ref}></div>
      <r3f.In>
        <View track={ref}>

        </View>
      </r3f.In> */}
      <DreiStars />
    </>
  )
}
