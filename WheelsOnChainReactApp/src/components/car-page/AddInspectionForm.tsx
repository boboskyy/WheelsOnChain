import { Button, Group, NumberInput, Stack, TextInput, Textarea } from '@mantine/core'
import { useWeb3React } from '@web3-react/core'
import { SubmitHandler, set, useForm } from 'react-hook-form'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../app/config/ContractConfig'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'

type AddInspectionFormProps = {
  carId: string
  onClose: () => void
}

type Inputs = {
  inspectorName: string
  inspectionDetails: string
  mileage: number
  currentAddress: string
}

export default function AddInspectionForm({ carId, onClose }: AddInspectionFormProps) {
  const { library, account } = useWeb3React()
  const [sendingTransaction, setSendingTransaction] = useState<boolean>(false)

  const addInspection = async (
    inspectorName: string,
    inspectionDetails: string,
    mileage: number,
  ) => {
    if (library) {
      const contract = new library.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
      try {
        const { transactionHash } = await contract.methods
          .addInspection(carId, inspectorName, inspectionDetails, mileage)
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
    inspectorName: '',
    inspectionDetails: '',
    mileage: 0,
    currentAddress: account?.toString() || '',
  }

  const {
    register,
    handleSubmit,
    formState: {},
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

    addInspection(data.inspectorName, data.inspectionDetails, data.mileage).then((result) => {
      setSendingTransaction(false)
      onClose()

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
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Stack gap={'xs'}>
        <Group wrap="nowrap">
          <TextInput
            disabled={sendingTransaction}
            label="Inspector name"
            {...register('inspectorName')}
            size="sm"
            radius="sm"
            placeholder="Inspector name."
            w="100%"
          />
          <NumberInput
            disabled={sendingTransaction}
            label="Mileage"
            {...register('mileage')}
            size="sm"
            radius="sm"
            placeholder="Mileage."
            w="100%"
          />
        </Group>
        <Textarea
          disabled={sendingTransaction}
          label="Inspection details"
          {...register('inspectionDetails')}
          radius="sm"
          autosize
          size="sm"
          minRows={13}
          placeholder="Inspection details."
          w="100%"
        />
        <TextInput
          label="Current address"
          disabled
          {...register('currentAddress')}
          size="sm"
          radius="sm"
          placeholder="Current address."
          w="100%"
        />
        <Group grow>
          <Button disabled={sendingTransaction} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={sendingTransaction} type="submit">
            Add
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
