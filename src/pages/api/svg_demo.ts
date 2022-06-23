import { NextApiHandler } from "next"
import { createElement } from "react"
import * as ReactDOMServer from 'react-dom/server'
import { SvgExample } from "../../lib/SvgExample"

const handler: NextApiHandler = async (req, res) => {
  const domSvg = ReactDOMServer.renderToString(
    createElement(SvgExample, { color: "green" })
  )
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .send(domSvg)
}
export default handler
