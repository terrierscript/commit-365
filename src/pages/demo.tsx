import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { FC } from "react"
import { GraphResult, userGraph, WeekResult } from "../lib/github"
import { DemoSvgMap, SvgMap } from "../lib/SvgMap"


export const Page: FC<{ week: WeekResult }> = ({ week }) => {

  const imageSrc = "https://raw.githubusercontent.com/terrierscript/terrierscript/master/dog.jpg"
  return <Box>
    <SvgMap imageSrc={imageSrc}
      week={week}
    />
  </Box>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const week = await userGraph("terrierscript")
  return {
    props: { week }
  }
}

export default Page