import { NextApiHandler } from "next"

import * as ReactDOMServer from 'react-dom/server'
import { z } from "zod"

const Params = z.object({
  url: z.string()

})
const handler: NextApiHandler = async (req, res) => {
  const domSvg = ReactDOMServer.renderToString(<SvgMap />)
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .send(domSvg)
}
export default handler
