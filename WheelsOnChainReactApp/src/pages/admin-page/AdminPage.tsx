import { ActionIcon, Box, Center, Group, Loader, Modal, Table } from '@mantine/core'
import { useEffect, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { TOrganizationInspectionDetails } from '../../components/car-page/CarInspectionsDataTable'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getOrganizations } from '../../app/api/admin-page/GetOrganizations'
import { debug } from 'util'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { deleteOrganization } from '../../app/api/admin-page/DeleteOrganization'
import AddOrganizationForm from '../../components/admin-page/AddOrganizationForm'
import { TAddOrganizationFormFields } from '../../app/api/admin-page/PostAddOrganization'

export const _addOrganizationFormDefaultValues: TAddOrganizationFormFields = {
  address: '',
  name: '',
  trustiness: '1',
}

export default function AdminPage() {
  const [addOrganizationFormDefaultValues, setAddOrganizationFormDefaultValues] =
    useState<TAddOrganizationFormFields>(_addOrganizationFormDefaultValues)
  const [organizationId, setOrganizationId] = useState<string>('')

  const deleteMutation = useMutation({
    mutationFn: deleteOrganization,
    onSuccess: (data) => {
      fetchCategoriesQuery.refetch()
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const [openedModal, setOpenedModal] = useState<boolean>(false)

  const openDeleteModal = (id: string) =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to delete this organization? This action is irreversible.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteMutation.mutate({ id: id }),
    })

  const fetchCategoriesQuery = useQuery({
    queryKey: ['organizations'],
    queryFn: getOrganizations,
  })

  if (fetchCategoriesQuery.isLoading) {
    return (
      <Center mt={'150px'}>
        <Loader color="pink" />
      </Center>
    )
  }

  if (fetchCategoriesQuery.isError) {
    return <span>Error: {fetchCategoriesQuery.error.message}</span>
  }

  return (
    <>
      <Box mt={'50px'}>
        <Group justify="flex-end">
          <ActionIcon
            onClick={() => {
              setAddOrganizationFormDefaultValues(_addOrganizationFormDefaultValues)
              setOrganizationId('')
              setOpenedModal(true)
            }}
          >
            <MdOutlineAddCircleOutline />
          </ActionIcon>
        </Group>
      </Box>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Index</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Trustiness</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {fetchCategoriesQuery.isSuccess &&
            fetchCategoriesQuery.data.organizations.map((element, index) => (
              <Table.Tr key={element.id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{element.address}</Table.Td>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td
                  c={
                    element.trustiness.code === 2
                      ? 'green'
                      : element.trustiness.code === 1
                      ? '#42aef8'
                      : 'red'
                  }
                >
                  {element.trustiness.name}
                </Table.Td>
                <Table.Td>
                  <Group gap={'xs'}>
                    <ActionIcon
                      onClick={() => {
                        setAddOrganizationFormDefaultValues({
                          address: element.address,
                          name: element.name,
                          trustiness: element.trustiness.code.toString(),
                        })
                        setOrganizationId(element.id)
                        setOpenedModal(true)
                      }}
                    >
                      <AiOutlineEdit />
                    </ActionIcon>
                    <ActionIcon onClick={() => openDeleteModal(element.id)}>
                      <BsTrash />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
      <Modal
        size={650}
        title="Add organization."
        onClose={() => setOpenedModal(false)}
        opened={openedModal}
      >
        <AddOrganizationForm
          setOpenedModal={setOpenedModal}
          defaultValues={addOrganizationFormDefaultValues}
          refetch={() => fetchCategoriesQuery.refetch()}
          organizationId={organizationId}
        />
      </Modal>
    </>
  )
}
