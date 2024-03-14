import { zfd } from 'zod-form-data'
import { z } from 'zod'

export function files(
  requiredMessage: string,
  max: number,
  maxMessage: string
) {
  return z.union([
    zfd.file(z.instanceof(File, { message: requiredMessage })),
    z.array(zfd.file()).min(1).max(max, maxMessage),
  ])
}
