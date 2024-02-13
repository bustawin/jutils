import { HTMLAttributes } from 'react'

export type { ReactNode } from 'react'

interface Props extends HTMLAttributes<Element> {}

export type Children = Props['children']
export type ClassName = Props['className']

/**
 * Generates a string for the HTML class property from the passed-in
 * truthy parameters.
 */
export const cls = (...clsArray: unknown[]): string => {
  return clsArray.filter((v) => v).join(' ')
}
