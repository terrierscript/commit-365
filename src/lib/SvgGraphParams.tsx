import { z } from "zod"


export const SvgGraphParams = z.object({
  url: z.string(),
  username: z.string(),
  day: z.string().optional()
})

export type SvgGraphParamType = z.infer<typeof SvgGraphParams>