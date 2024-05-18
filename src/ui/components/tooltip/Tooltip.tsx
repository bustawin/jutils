import { useRef, useState } from 'react'
import { Overlay, Tooltip as RBTP } from 'react-bootstrap'

export default function Tooltip({ children, tooltip }) {
  const [show, setShow] = useState(false)
  const target = useRef(null)

  return (
    <>
      <span ref={target} onMouseOver={() => setShow(true)}>
        {children}
      </span>
      <Overlay
        target={target.current}
        show={show}
        placement="top"
        rootClose
        onHide={() => setShow(false)}
      >
        {(props) => <RBTP {...props}>{tooltip}</RBTP>}
      </Overlay>
    </>
  )
}
