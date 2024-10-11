import { useWeb3React } from '@web3-react/core'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../app/config/ContractConfig'
import { useParams } from 'react-router-dom'
import { Button, Card, Group, Stack, TextInput, Text, Center } from '@mantine/core'
import BadgeHeaderWithTitle from './BadgeHeaderWithTitle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'

type Inputs = {
  vin: string
}

export default function CheckVinCard() {
  const { carId } = useParams()
  const { active, account, library } = useWeb3React()

  const [vinValid, setVinValid] = useState(null)

  const checkVin = async (vin: string) => {
    if (library) {
      const contract = new library.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

      const contractResult = await contract.methods.checkVin(carId, vin).call()
      return contractResult
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const vinValid = await checkVin(data.vin)
    setVinValid(vinValid)
  }

  return (
    <Stack maw={'290px'} gap={0}>
      <BadgeHeaderWithTitle title={'Check VIN'} />
      <Card p="xs">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Group wrap={'nowrap'}>
            <TextInput
              {...register('vin')}
              size="sm"
              radius="sm"
              placeholder="W0L0AHL4858050000"
              w="100%"
            />
            <Button type="submit" size="sm">
              Check
            </Button>
          </Group>
          <Center pt={'sm'}>
            {vinValid === true ? (
              <Text fz={'xs'} c={'green.6'}>
                Vin matches car.
              </Text>
            ) : vinValid === false ? (
              <Text fz={'xs'} c={'red.6'}>
                Vin does not match car.
              </Text>
            ) : null}
          </Center>
        </form>
      </Card>
    </Stack>
  )
}
