import { Image, Box, Button, Container, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack, Code, Spinner } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SvgGraphStrictParamType } from '../lib/SvgGraphParams'

const Preview: FC<{ url?: string }> = ({ url }) => {
  if (!url) {
    return null
  }
  return <Box>
    <Heading size="sm">Result</Heading>
    <Image src={url} onLoad={() => { setLoad(false) }}
      display={load ? "none" : "block"}
    />
    <Code userSelect={"all"} p={4}>
      [![Contribution Graph]({url})](https://commit-365.vercel.app/)
    </Code>
  </Box>
}
export default function Home() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<SvgGraphStrictParamType>({
    defaultValues: {
      background: "transparent"
    }
  })
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
                <Input {...register("url")} placeholder="image url (recommend: < 500kb)" type="url"></Input>
                <NumberInput defaultValue={365} min={0}>
                  <NumberInputField  {...register("day")} placeholder={"day"} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {/* <Input type="color" {...register("background")} /> */}
                <Button type="submit" colorScheme={"teal"}>Generate</Button>
              </VStack>
            </form>
            {load
              ? <Spinner />
              : <Preview url={url} />
            }
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
