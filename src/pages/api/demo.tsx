import { NextApiHandler } from "next"

import * as ReactDOMServer from 'react-dom/server'
import { SvgMap } from "../../lib/SvgMap"

const handler: NextApiHandler = async (req, res) => {
  const domSvg = ReactDOMServer.renderToString(<SvgMap />)
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    // .setHeader("Content-Type", "application/json")
    .send(domSvg)
  // res.json({ r })
}
export default handler
