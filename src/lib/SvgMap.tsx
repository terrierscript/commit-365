import { FC, useMemo } from "react"
import { ContributionLevel, WeekResult } from "./github"

type RectProps = {
  x: number
  y: number
  size: number
  level: ContributionLevel
}
const RectCell: FC<RectProps> = ({ x, y, size, level }) => {
  const levelToColor = useMemo(() => {
    switch (level) {
      case "NONE":
        return "#fff1"
      case "FIRST_QUARTILE":
        return "#fff6"
      case "SECOND_QUARTILE":
        return "#fff9"
      case "THIRD_QUARTILE":
        return "#fffd"
      case "FOURTH_QUARTILE":
        return "#fff"
    }
  }, [level])
  return <rect {...{ x, y }}
    height={size}
    width={size}
    fill={levelToColor}
    rx={3} ry={3} />
}
const RectCellMap: FC<{
  weeks: WeekResult,
  size: number,
  gap: number,
  padding: number,
}> = ({ weeks, size, gap, padding }) => {
  const cells = weeks.map((week, weekIdx) => {
    return week.contributionDays.map((day, dayIdx) => {
      // console.log(week, day)
      const wd = day.weekday
      const w = weekIdx
      const level = day.contributionLevel
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
  background?: string,
  week: WeekResult
}> = ({ imageSrc, week, background = "transparent" }) => {
  const size = 20
  const gap = size / 5
  const padding = size / 4
  const { width, height } = {
    width: (week.length) * (size + gap) + padding * 2,
    height: 7 * (size + gap) + padding * 2,
  }
  return <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    {...{ width, height }}
  >
    {/* TODO: blocked by CSP */}
    {/* <style type="text/css">{
      `
      #img{
        opacity: 1;
        transition: 1s;
      }
      #img:hover {
        opacity: 0.5;
      }
      `
    }
    </style> */}
    <defs>
      <mask id="mask">
        {/* <rect x="0" y="0" width={width} height={height} fill="#ffffff11" /> */}
        <RectCellMap weeks={week} size={size} gap={gap} padding={padding} />
      </mask>
    </defs>
    {/* <image
      id="base"
      {...{ width, height }}
      href={imageSrc}
      preserveAspectRatio="xMidYMid slice" /> */}
    <rect {...{ width, height }} fill={background} ></rect>
    <image
      mask={"url(#mask)"}
      {...{ width, height }}
      href={imageSrc}
      preserveAspectRatio="xMidYMid slice" />
  </svg>
}

// export const DemoSvgMap = () => {
//   const imageSrc = "/demo.jpg"
//   return <SvgMap imageSrc={imageSrc} />
// }
