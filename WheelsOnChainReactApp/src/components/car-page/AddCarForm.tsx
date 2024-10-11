import { Button, Group, Modal, NumberInput, Stack, TextInput } from '@mantine/core'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { SubmitHandler, set, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../app/config/ContractConfig'
import { notifications } from '@mantine/notifications'

type Inputs = {
  make: string
  model: string
  vin: string
  version: string
  year: number
  engineCapacity: number
  countryOfOrigin: string
  fuelType: string
  carAddress: string
}

type AddCartFormProps = {
  refetch: () => void
}

export default function AddCarForm({ refetch }: AddCartFormProps) {
  const { carId } = useParams()
  const { library, account } = useWeb3React()
  const [sendingTransaction, setSendingTransaction] = useState<boolean>(false)

  const [openedModal, setOpenedModal] = useState<boolean>(false)

  const addCar = async (
    make: string,
    model: string,
    version: string,
    year: number,
    engineCapacity: number,
    countryOfOrigin: string,
    fuelType: string,
    vin: string,
  ) => {
    if (library) {
      const contract = new library.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
      try {
        const { transactionHash } = await contract.methods
          .addCar(make, model, version, year, engineCapacity, countryOfOrigin, fuelType, vin)
          .send({ from: account })

        return { success: true, transactionHash }
      } catch (error: any) {
        return { success: false, error: error.message }
      }
    } else {
      return { success: false, error: 'Library not available' }
    }
  }

  const defaultValues: Inputs = {
    make: '',
    model: '',
    version: '',
    year: 0,
    engineCapacity: 0,
    countryOfOrigin: '',
    fuelType: '',
    vin: '',
    carAddress: carId || '',
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setSendingTransaction(true)
    const id = notifications.show({
      loading: true,
      title: 'Sending transaction',
      message: 'Please wait, transaction is being processed',
      autoClose: false,
      withCloseButton: false,
    })

    addCar(
      data.make,
      data.model,
      data.version,
      data.year,
      data.engineCapacity,
      data.countryOfOrigin,
      data.fuelType,
      data.vin,
    ).then((result) => {
      setSendingTransaction(false)
      setOpenedModal(false)

      if (result.success) {
        notifications.update({
          id,
          color: 'teal',
          title: 'Transaction successful',
          message: `Transaction ID: ${result.transactionHash}`,
          loading: false,
          autoClose: 12000,
        })
      } else {
        notifications.update({
          id,
          color: 'red',
          title: 'Transaction failed',
          message: `Error: ${result.error}`,
          loading: false,
          autoClose: 10000,
        })
      }

      refetch && refetch()
    })
  }

  return (
    <>
      <Button onClick={() => setOpenedModal(true)}>Create one</Button>
      <Modal size={650} title="Add car." onClose={() => setOpenedModal(false)} opened={openedModal}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Stack gap={'xs'}>
            <TextInput
              disabled={sendingTransaction}
              label="Make"
              {...register('make')}
              size="sm"
              radius="sm"
              placeholder="Opel"
              w="100%"
            />
            <TextInput
              disabled={sendingTransaction}
              label="Model"
              {...register('model')}
              size="sm"
              radius="sm"
              placeholder="Astra"
              w="100%"
            />
            <TextInput
              disabled={sendingTransaction}
              label="Version"
              {...register('version')}
              size="sm"
              radius="sm"
              placeholder="1.6"
              w="100%"
            />
            <Group wrap="nowrap">
              <NumberInput
                label="Year"
                disabled={sendingTransaction}
                {...register('year', { valueAsNumber: true })}
                size="sm"
                radius="sm"
                placeholder="2003"
                w="100%"
              />
              <NumberInput
                label="Engine capacity"
                disabled={sendingTransaction}
                {...register('engineCapacity', { valueAsNumber: true })}
                size="sm"
                radius="sm"
                placeholder="2003"
                w="100%"
              />
            </Group>
            <Group wrap="nowrap">
              <TextInput
                label="Country of origin"
                disabled={sendingTransaction}
                {...register('countryOfOrigin')}
                size="sm"
                radius="sm"
                placeholder="Germany"
                w="100%"
              />
              <TextInput
                label="Fuel type"
                disabled={sendingTransaction}
                {...register('fuelType')}
                size="sm"
                radius="sm"
                placeholder="Petrol"
                w="100%"
              />
            </Group>
            <TextInput
              label="VIN"
              disabled={sendingTransaction}
              {...register('vin')}
              size="sm"
              radius="sm"
              placeholder="1HGCM82633A004352"
              w="100%"
            />
            <TextInput
              label="Car address"
              disabled
              {...register('carAddress')}
              size="sm"
              radius="sm"
              placeholder="0x1234567890123456789012345678901234567890"
              w="100%"
            />
            <Group grow>
              <Button
                disabled={sendingTransaction}
                variant="outline"
                onClick={() => {
                  setOpenedModal(false)
                }}
              >
                Cancel
              </Button>
              <Button disabled={sendingTransaction} type="submit">
                Add
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
