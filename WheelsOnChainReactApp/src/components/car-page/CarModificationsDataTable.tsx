import { Modal, Stack } from '@mantine/core'
import { useParams } from 'react-router-dom'
import BadgeHeaderWithTitleButton from './BadgeHeaderWithTitleButton'
import { TCarDetailsProps } from './CarDetails'
import { useEffect, useState } from 'react'
import AddInspectionForm from './AddInspectionForm'
import { useWeb3React } from '@web3-react/core'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../app/config/ContractConfig'
import { TOrganizationInspectionDetails, TOrganizationsList } from './CarInspectionsDataTable'
import CarModificationsDataTableCard from './CarModificationsDataTableCard'
import AddModificationForm from './AddModificationForm'

export type TModificationDetails = {
  0: number
  1: string
  2: string
  3: string
  4: number
  5: number
  6: TOrganizationInspectionDetails | null
}

const CarModificationsDataTable = ({ currentCar }: TCarDetailsProps) => {
  const { carId } = useParams()
  const { active, account, library } = useWeb3React()

  const getModifications = () => {
    if (library) {
      //setLoading(true)
      const contract = new library.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

      contract.methods
        .getModifications(carId)
        .call()
        .then((contractResult: TModificationDetails[]) => {
          let searchParams = '?'
          contractResult.forEach((inspection) => (searchParams += `addresses=${inspection[3]}&`))
          searchParams = searchParams.slice(0, -1)

          if (contractResult.length === 0) {
            setModifications(contractResult)
            return
          }

          fetch(`https://localhost:7169/organizations` + searchParams)
            .then((response) => response.json())
            .then((data: TOrganizationsList) => {
              const validatedInspections = contractResult.map((inspection) => {
                const organization = data.organizations.find(
                  (organization) => organization.address === inspection[3],
                )

                return {
                  ...inspection,
                  6: organization ?? null,
                }
              })

              setModifications(validatedInspections)
              return
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error: any) => {
          //setLoading(false)
        })
    }
  }

  const [Modifications, setModifications] = useState<TModificationDetails[]>([])

  useEffect(() => {
    getModifications()
  }, [library])

  const [openedModal, setOpenedModal] = useState<boolean>(false)

  return (
    <>
      {currentCar && (
        <Stack w={'100%'} gap={0} pb={'xl'}>
          <BadgeHeaderWithTitleButton
            title={'Car Modifications'}
            onClick={() => setOpenedModal(true)}
          />
          <Stack mt={'xs'} gap={'xs'}>
            {Modifications.map((Modification, i) => (
              <CarModificationsDataTableCard key={i} modification={Modification} />
            ))}
          </Stack>
        </Stack>
      )}
      <Modal
        size={650}
        title="Add Modification."
        onClose={() => setOpenedModal(false)}
        opened={openedModal}
      >
        <AddModificationForm
          carId={carId ?? ''}
          onClose={() => setOpenedModal(false)}
          onSuccessfulTransaction={getModifications}
        />
      </Modal>
    </>
  )
}

export default CarModificationsDataTable
