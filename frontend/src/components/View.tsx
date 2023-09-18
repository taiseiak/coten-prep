import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react'
import { r3f } from '../utils/r3f'
import { View as DreiView } from '@react-three/drei'

type ViewProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode
}

const View = forwardRef(({ children, ...props }: ViewProps, ref) => {
  const localRef = useRef(null!)
  useImperativeHandle(ref, () => localRef.current)
  return (
    <>
      <div ref={localRef} {...props} />
      <r3f.In>
        <DreiView track={localRef}>{children}</DreiView>
      </r3f.In>
    </>
  )
})
View.displayName = 'View'

export { View }
