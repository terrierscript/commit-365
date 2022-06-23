import { z } from "zod"


export const SvgGraphParams = z.object({
  url: z.string(),
  username: z.string(),
  day: z.string().optional()
})

export const SvgGraphStrictParams = SvgGraphParams.extend({
  day: z.number()
})

export type SvgGraphStrictParamType = z.infer<typeof SvgGraphStrictParams>