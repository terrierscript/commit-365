import { NextApiHandler } from "next"

import * as ReactDOMServer from 'react-dom/server'
import { getUserContributionWeekGraph } from "../../../lib/github"
import { SvgGraphParams } from "../../../lib/SvgGraphParams"
import { SvgMap } from "../../../lib/SvgMap"

const handler: NextApiHandler = async (req, res) => {
  const { url, username, day } = SvgGraphParams.parse(req.query)

  const week = await getUserContributionWeekGraph(username, Number(day) || 365)

  const domSvg = ReactDOMServer.renderToString(<SvgMap imageSrc={url} week={week} />)
  res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .send(domSvg)
}
export default handler
