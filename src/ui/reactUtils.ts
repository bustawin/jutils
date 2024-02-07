import { HTMLAttributes } from 'react'

export interface Props extends HTMLAttributes<Element> {}

export interface ClassNameOnlyProp {
  className?: Props['className']
}

/**
 * Generates a string for the HTML class property from the passed-in
 * truthy parameters.
 */
export const cls = (...clsArray: unknown[]): string => {
  return clsArray.filter((v) => v).join(' ')
}
