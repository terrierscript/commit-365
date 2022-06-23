import axios from "axios"
import { NextApiHandler } from "next"
import { z } from "zod"
import { fileTypeFromBuffer } from 'file-type'

const Param = z.object({
  url: z.string()
})
const handler: NextApiHandler = async (req, res) => {
  const { url } = Param.parse(req.query)
  const data = await axios.get(url, {
    responseType: "arraybuffer"
  }).then(res => res.data)
  // console.log(data)
  const fileType = await fileTypeFromBuffer(data)
  if (!fileType?.mime) {
    return res.status(400).end()
  }
  res
    .status(200)
    .setHeader("Content-Type", fileType.mime)
    .send(data)

  // .send(domSvg)
}
export default handler
