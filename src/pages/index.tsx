import { Image, Box, Button, Container, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, Code, Spinner } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SvgGraphStrictParamType } from '../lib/SvgGraphParams'

export default function Home() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<SvgGraphStrictParamType>()
  const [load, setLoad] = useState(false)
  const [url, setUrl] = useState<string>()
  const submit = handleSubmit(data => {
    setLoad(true)
    const { username, ...params } = data
    const stringParam = {
      ...params,
      day: params.day.toString()
    }

    const url = `${window.location.origin}/api/svg/${username}?${new URLSearchParams(stringParam).toString()}`
    setUrl(url)
  })
  return (
    <Box>
      <Head>
        <title>Commit 365</title>
      </Head>
      <Box>
        <Container p={20}>
          <VStack>
            <form onSubmit={submit}>
              <VStack>
                <Heading>Commit 365</Heading>
                <Box>Generate contribution graph svg with your lovely image</Box>
                <Input {...register("username")} placeholder="username"></Input>
                <Input {...register("url")} placeholder="image url ( < 1mb)" type="url"></Input>
                <NumberInput defaultValue={365} min={0}>
                  <NumberInputField  {...register("day")} placeholder={"day"} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button type="submit" colorScheme={"teal"}>Generate</Button>
              </VStack>
            </form>
            {url && <Box>
              <Heading size="sm">Result</Heading>
              <Image src={url} onLoad={() => { setLoad(false) }}
                display={load ? "none" : "block"}
              />
              {load && <Spinner />}
              <Code userSelect={"all"} p={4}>
                [![Contribution Graph]({url})](https://commit-365.vercel.app/)
              </Code>
            </Box>}
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
