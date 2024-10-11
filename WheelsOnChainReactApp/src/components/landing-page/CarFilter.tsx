import { Button, Group, TextInput } from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Web3 from 'web3'

type Inputs = {
  carAddress: string
}

const isValidEthereumAddress = (address: string): boolean => {
  const web3 = new Web3()
  return web3.utils.isAddress(address)
}

const CarFilter = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`/car/${data.carAddress}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} autoComplete="off">
      <h4>Car address</h4>
      <Group wrap="nowrap" justify="center" align={'start'} w="100%">
        <TextInput
          size="md"
          radius="md"
          placeholder="0x0000000000000000000000000000000000000000"
          w="100%"
          error={errors.carAddress?.message}
          {...register('carAddress', {
            required: 'Car address is required',
            pattern: {
              value: /^(0x)?[0-9a-fA-F]{40}$/,
              message: 'Please enter a valid Ethereum address',
            },
          })}
        />
        <Button type="submit" size="md">
          Find
        </Button>
      </Group>
    </form>
  )
}

export default CarFilter
