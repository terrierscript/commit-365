import { FC } from "react"

export const SvgExample: FC<{ color: string }> = ({ color }) => {
  return <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  // xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <rect x="0" y="0" width="100" height="100" fill="red" />
    <rect x="20" y="40" width="100" height="100" fill="blue" />
    <rect x="30" y="20" width="100" height="100" fill={color} />
  </svg>
}