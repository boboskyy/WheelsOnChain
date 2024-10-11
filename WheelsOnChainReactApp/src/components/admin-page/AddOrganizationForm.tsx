import { Button, Group, SegmentedControl, Stack, TextInput } from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  TAddOrganizationFormFields,
  addOrganizationSchema,
  postAddOrganization,
} from '../../app/api/admin-page/PostAddOrganization'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { ref } from 'yup'
import { AxiosError } from 'axios'
import { notifications } from '@mantine/notifications'
import { putChangeOrganization } from '../../app/api/admin-page/PutChangeOrganization'

type AddOrganizationFormProps = {
  setOpenedModal: (opened: boolean) => void
  refetch: () => void
  defaultValues: TAddOrganizationFormFields
  organizationId?: string | undefined
}

export default function AddOrganizationForm({
  setOpenedModal,
  refetch,
  defaultValues,
  organizationId,
}: AddOrganizationFormProps) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TAddOrganizationFormFields>({
    defaultValues: defaultValues,
    resolver: yupResolver(addOrganizationSchema),
  })

  const addMutation = useMutation({
    mutationFn: postAddOrganization,
    onSuccess: () => {
      setOpenedModal(false)
      refetch && refetch()
    },
    onError: (error: any) => {
      const id = notifications.show({
        loading: false,
        color: 'red',
        title: 'Error',
        message: error.response.data.errors[0].message,
        autoClose: 5000,
        withCloseButton: true,
      })
    },
  })

  const changeMutation = useMutation({
    mutationFn: putChangeOrganization,
    onSuccess: () => {
      setOpenedModal(false)
      refetch && refetch()
    },
    onError: (error: any) => {
      const id = notifications.show({
        loading: false,
        color: 'red',
        title: 'Error',
        message: error.response.data.errors[0].message,
        autoClose: 5000,
        withCloseButton: true,
      })
    },
  })

  const onSubmit: SubmitHandler<TAddOrganizationFormFields> = (data) => {
    if (organizationId !== '') {
      changeMutation.mutate({ ...data, id: organizationId ? organizationId : '' })
    } else {
      addMutation.mutate(data)
    }
  }

  const onChangeControlHandler = (value: string) => {
    setValue('trustiness', value)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack gap={'xs'}>
          <TextInput
            label="Address"
            {...register('address')}
            error={errors.address?.message}
            size="sm"
            radius="sm"
            w="100%"
          />
          <TextInput
            label="Name"
            error={errors.name?.message}
            {...register('name')}
            size="sm"
            radius="sm"
            w="100%"
          />
          <SegmentedControl
            onChange={onChangeControlHandler}
            defaultValue={defaultValues.trustiness}
            data={[
              { value: '0', label: 'Untrusted' },
              { value: '1', label: 'Neutral' },
              { value: '2', label: 'Trusted' },
            ]}
          />
          <Group grow>
            <Button
              variant="outline"
              onClick={() => {
                setOpenedModal(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit">{organizationId === '' ? 'Add' : 'Edit'}</Button>
          </Group>
        </Stack>
      </form>
    </>
  )
}
