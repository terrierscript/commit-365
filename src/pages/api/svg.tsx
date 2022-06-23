import { NextApiHandler } from "next"

import * as ReactDOMServer from 'react-dom/server'
import { z } from "zod"
import { SvgMap } from "../../lib/SvgMap"

const Params = z.object({
  url: z.string(),
  user: z.string()
})
const handler: NextApiHandler = async (req, res) => {
  const { url, user } = Params.parse(req.query)
  const domSvg = ReactDOMServer.renderToString(<SvgMap imageSrc={url} />)
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .send(domSvg)
}
export default handler
