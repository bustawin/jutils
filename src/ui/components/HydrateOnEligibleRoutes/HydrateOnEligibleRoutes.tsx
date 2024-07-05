import { AppData } from '@remix-run/react/dist/data'
import {
  Scripts,
  ScrollRestoration,
  UIMatch,
  useMatches,
} from '@remix-run/react'

export interface Handler {
  useScripts?: boolean
}

/**
 * Loads JS scripts on routes that demand it.
 *
 * This is done by setting the route's handler's `useScripts` to `true`.
 *
 * From [Remix's docs](https://remix.run/docs/en/main/guides/disabling-javascript).
 */
export default function HydrateOnEligibleRoutes() {
  const matches = useMatches() as UIMatch<AppData, Handler>[]

  const useScripts = matches.some((match) => match.handle?.useScripts)
  if (!useScripts) return null

  return (
    <>
      <ScrollRestoration />
      <Scripts />
    </>
  )
}
