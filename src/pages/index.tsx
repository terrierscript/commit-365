import { Box, Input, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'

export default function Home() {
  return (
    <Box>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <VStack>
          <Input placeholder="username"></Input>
          <Input placeholder="image url" type="url"></Input>
        </VStack>
      </Box>
    </Box>
  )
}
