import { Box, Button, Container, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { SvgGraphStrictParamType } from '../lib/SvgGraphParams'

export default function Home() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<SvgGraphStrictParamType>()
  const submit = handleSubmit(data => {
    const { username, ...params } = data
    const stringParam = {
      ...params,
      day: params.day.toString()
    }
    router.push(`/api/svg/${username}?${new URLSearchParams(stringParam).toString()}`)
  })
  return (
    <Box>
      <Head>
        <title>Commit 365</title>
      </Head>
      <Box>
        <form onSubmit={submit}>
          <Container p={20}>
            <VStack>
              <Heading>Commit 365</Heading>
              <Box>Generate contribution graph svg with your lovely image</Box>
              <Input {...register("username")} placeholder="username"></Input>
              <Input {...register("url")} placeholder="image url ( < 1kb)" type="url"></Input>
              <NumberInput defaultValue={365} min={0}>
                <NumberInputField  {...register("day")} placeholder={"day"} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button type="submit" colorScheme={"teal"}>Generate</Button>
            </VStack>
          </Container>
        </form>
      </Box>
    </Box>
  )
}
