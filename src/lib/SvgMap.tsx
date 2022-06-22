import { FC } from "react"
import { WeekResult } from "./github"

type RectProps = {
  x: number
  y: number
  size: number
  level: number
}
const RectCell: FC<RectProps> = ({ x, y, size, level }) => {
  const levelToColor = level > 0 ? "#ffffff" : "#000000"
  return <rect {...{ x, y }}
    height={size}
    width={size}
    fill={levelToColor}
    rx={3} ry={3} />
}
const RectCellMap: FC<{ week: WeekResult }> = ({ week }) => {
  const size = 10
  const gap = 2
  const padding = 2
  const cells = week.map((w, weekIdx) => {
    return w.contributionDays.map((day, dayIdx) => {
      const wd = dayIdx
      const w = weekIdx
      const level = day.contributionCount > 0 ? 1 : 0
      return { w, wd, level }
    })
  }).flat(1)
  // const cells = Array.from({ length: 365 }).map((i, day) => {
  //   const wd = day % 7
  //   const w = Math.floor(day / 7)
  //   return { w, wd }
  // })
  return <>{cells.map((cell, i) => {
    return <RectCell
      key={i}
      x={cell.w * (size + gap) + padding}
      y={cell.wd * (size + gap) + padding}
      level={cell.level}
      size={size} />
  })}
  </>
}

export const SvgMap: FC<{
  imageSrc: string,
  week: WeekResult
}> = ({ imageSrc, week }) => {

  return <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    width={600} height={300}>
    <defs>
      <mask id="mask">
        <RectCellMap week={week} />
      </mask>
    </defs>
    <image
      mask={"url(#mask)"}
      width={600} height={300}
      href={imageSrc}
      preserveAspectRatio="xMinYMin meet" />
  </svg>
}

export const DemoSvgMap = () => {
  const imageSrc = "/demo.jpg"
  return <SvgMap imageSrc={imageSrc} />
}