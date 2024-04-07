import { z } from 'zod'
import { zfd } from 'zod-form-data'

export function files(
  requiredMessage: string,
  max: number,
  maxMessage: string,
  maxFileSize: number = 3 // MB
) {
  return zfd.repeatable(
    z
      .array(z.string())
      .min(1, requiredMessage)
      .max(max, maxMessage)
      .refine(
        (val) =>
          val.every((im) => (im.length * 3) / 4 / 1_000_000 <= maxFileSize),
        `Each file has to be smaller than ${maxFileSize}MB`
      )
  )
}
