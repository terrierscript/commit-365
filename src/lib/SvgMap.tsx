import { FC } from "react"

type RectProps = {
  x: number
  y: number
  size: number
}
const RectCell: FC<RectProps> = ({ x, y, size }) => {
  return <rect {...{ x, y }}
    height={size}
    width={size}
    fill="white"
    rx={3} ry={3} />
}
const RectCellMap = () => {
  const size = 10
  const gap = 2
  const padding = 2
  const cells = Array.from({ length: 365 }).map((i, day) => {
    const wd = day % 7
    const w = Math.floor(day / 7)
    return { w, wd }
  })
  return <>{cells.map((cell, i) => {
    return <RectCell
      x={cell.w * (size + gap) + padding}
      y={cell.wd * (size + gap) + padding}
      size={size} />
  })}
  </>
}
export const SvgMap = () => {
  const imageSrc = "/demo.jpg"

  return <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    width={600} height={300}>
    <defs>
      <mask id="mask">
        <RectCellMap />
      </mask>
    </defs>
    <image
      mask={"url(#mask)"}
      width={600} height={300}
      href={imageSrc}
      preserveAspectRatio="xMinYMin slice" />
  </svg>
}
