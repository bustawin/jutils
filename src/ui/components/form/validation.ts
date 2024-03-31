import { z } from 'zod'
import { zfd } from 'zod-form-data'

export function files(
  requiredMessage: string,
  max: number,
  maxMessage: string
) {
  return zfd.repeatable(z.array(z.string()).min(1).max(max, maxMessage))
}
