import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { FC } from "react"
import { userGraph, WeekResult } from "../lib/github"
import { SvgMap } from "../lib/SvgMap"


export const Page: FC<{ week: WeekResult }> = ({ week }) => {

  // const imageSrc = "https://user-images.githubusercontent.com/13282103/175295262-beaecaac-58a4-4742-ada1-77020ccb3435.jpg"
  const imageSrc = "https://user-images.githubusercontent.com/13282103/175301134-49eaaf63-9488-4408-b850-52563c7e2ef8.jpg"
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