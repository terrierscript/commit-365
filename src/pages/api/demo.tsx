import { NextApiHandler } from "next"

import * as ReactDOMServer from 'react-dom/server'
import { DemoSvgMap, SvgMap } from "../../lib/SvgMap"

const handler: NextApiHandler = async (req, res) => {
  const domSvg = ReactDOMServer.renderToString(<DemoSvgMap />)
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .send(domSvg)
}
export default handler
