import { Button, Group, NumberInput, Stack, TextInput, Textarea } from '@mantine/core'
import { useWeb3React } from '@web3-react/core'
import { SubmitHandler, set, useForm } from 'react-hook-form'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../app/config/ContractConfig'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'

type AddModificationFormProps = {
  carId: string
  onClose: () => void
  onSuccessfulTransaction: () => void
}

type Inputs = {
  modifierName: string
  modificationDetails: string
  costInUsd: number
  currentAddress: string
}

export default function AddModificationForm({
  carId,
  onClose,
  onSuccessfulTransaction,
}: AddModificationFormProps) {
  const { library, account } = useWeb3React()
  const [sendingTransaction, setSendingTransaction] = useState<boolean>(false)

  const addModification = async (
    modifierName: string,
    modificationDetails: string,
    costInUsd: number,
  ) => {
    if (library) {
      const contract = new library.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
      try {
        const { transactionHash } = await contract.methods
          .addModification(carId, modifierName, modificationDetails, costInUsd)
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
    modifierName: '',
    modificationDetails: '',
    costInUsd: 0,
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

    addModification(data.modifierName, data.modificationDetails, data.costInUsd).then((result) => {
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
        onSuccessfulTransaction()
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
            label="Modifier name"
            {...register('modifierName')}
            size="sm"
            radius="sm"
            placeholder="Modifier name."
            w="100%"
          />
          <NumberInput
            disabled={sendingTransaction}
            label="Cost in USD"
            {...register('costInUsd')}
            size="sm"
            radius="sm"
            placeholder="4000"
            w="100%"
          />
        </Group>
        <Textarea
          disabled={sendingTransaction}
          label="Modification details"
          {...register('modificationDetails')}
          radius="sm"
          autosize
          size="sm"
          minRows={13}
          placeholder="Modification details."
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
