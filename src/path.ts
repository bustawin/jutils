import { fileURLToPath } from 'url'
import path from 'path'

/**
 * Generates a path using the passed-in file import meta's URL as the start.
 */
export function relativePath(
  importMetaUrl: ImportMeta['url'],
  ...pathComponents: string[]
): string {
  const filename = fileURLToPath(importMetaUrl)
  const dirname = path.dirname(filename)
  return path.resolve(dirname, ...pathComponents)
}
