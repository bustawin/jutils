import { useRef, useState } from 'react'
import {
  arrow,
  flip,
  shift,
  useFloating,
  FloatingArrow,
  offset,
  useDismiss,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import './tooltip.css'
import * as ut from '@jutils/ui/reactUtils'

const ARROW_HEIGHT = 7
const GAP = 0

export default function Tooltip({ children, tooltip, className }) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      flip(),
      shift(),
      arrow({ element: arrowRef }),
      offset(ARROW_HEIGHT + GAP),
    ],
  })
  const role = useRole(context)
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ])

  return (
    <>
      <button
        ref={refs.setReference}
        className={ut.cls('tooltip__button', className)}
        onClick={() => setIsOpen(!isOpen)}
        {...getReferenceProps()}
      >
        {children}
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="tooltip"
          role="tooltip"
          {...getFloatingProps()}
        >
          <FloatingArrow
            className="tooltip__arrow"
            ref={arrowRef}
            context={context}
          />
          {tooltip}
        </div>
      )}
    </>
  )
}
