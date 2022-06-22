import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { userGraph } from "../lib/github"
import { DemoSvgMap, SvgMap } from "../lib/SvgMap"

export const Page = ({ graph }) => {
  console.log({ graph })
  // const imageSrc = "https://raw.githubusercontent.com/terrierscript/terrierscript/master/dog.jpg?raw=true"
  return <Box>
    <DemoSvgMap />
  </Box>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const graph = await userGraph("terrierscript")
  console.log({ graph })
  return {
    props: { graph }
  }
}

export default Page