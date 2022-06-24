import axios from "axios"
import { fileTypeFromBuffer } from "file-type"
import { NextApiHandler } from "next"

import * as ReactDOMServer from 'react-dom/server'
import { getUserContributionWeekGraph } from "../../../lib/github"
import { SvgGraphParams } from "../../../lib/SvgGraphParams"
import { SvgMap } from "../../../lib/SvgMap"

const fetchImage = async (url: string) => {
  const data = await axios.get(url, {
    responseType: "arraybuffer"
  }).then(res => res.data)

  const fileType = await fileTypeFromBuffer(data)
  const img = `data:${fileType?.mime};base64,${data.toString("base64")}`
  return img
}

const handler: NextApiHandler = async (req, res) => {
  const { url, username, day, background } = SvgGraphParams.parse(req.query)

  const week = await getUserContributionWeekGraph(username, Number(day) || 365)

  const img = await fetchImage(url)
  // const proxyUrl = `/api/img?url=${url}`

  const domSvg = ReactDOMServer.renderToString(<SvgMap
    imageSrc={img}
    week={week}
    background={background}
  />)
  res
    .status(200)
    .setHeader("Cache-Control", "public, max-age=3600")
    .setHeader("Content-Type", "image/svg+xml")
    .send(domSvg)
}
export default handler
