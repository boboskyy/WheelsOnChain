import { Modal, Stack } from '@mantine/core'
import { useParams } from 'react-router-dom'
import CarInspectionsDataTableCard from './CarInspectionsDataTableCard'
import BadgeHeaderWithTitleButton from './BadgeHeaderWithTitleButton'
import { TCarDetailsProps } from './CarDetails'
import { useEffect, useState } from 'react'
import AddInspectionForm from './AddInspectionForm'
import { useWeb3React } from '@web3-react/core'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../app/config/ContractConfig'

export type TOrganizationsList = {
  organizations: TOrganizationInspectionDetails[]
}

export type TOrganizationInspectionDetails = {
  address: string
  name: string
  trustiness: {
    code: number
    name: string
  }
}

export type TInspectionDetails = {
  0: number
  1: string
  2: string
  3: string
  4: number
  5: number
  6: TOrganizationInspectionDetails | null
}

const CarInspectionsDataTable = ({ currentCar }: TCarDetailsProps) => {
  const { carId } = useParams()
  const { active, account, library } = useWeb3React()

  const getInspections = () => {
    if (library) {
      //setLoading(true)
      const contract = new library.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

      contract.methods
        .getInspections(carId)
        .call()
        .then((contractResult: TInspectionDetails[]) => {
          let searchParams = '?'
          contractResult.forEach((inspection) => (searchParams += `addresses=${inspection[3]}&`))
          searchParams = searchParams.slice(0, -1)

          if (contractResult.length === 0) {
            setInspections(contractResult)
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

              setInspections(validatedInspections)
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

  const [inspections, setInspections] = useState<TInspectionDetails[]>([])

  useEffect(() => {
    getInspections()
  }, [library])

  const [openedModal, setOpenedModal] = useState<boolean>(false)

  return (
    <>
      {currentCar && (
        <Stack w={'100%'} gap={0}>
          <BadgeHeaderWithTitleButton
            title={'Car Inspections'}
            onClick={() => setOpenedModal(true)}
          />
          <Stack mt={'xs'} gap={'xs'}>
            {inspections.map((inspection, i) => (
              <CarInspectionsDataTableCard key={i} inspection={inspection} />
            ))}
          </Stack>
        </Stack>
      )}
      <Modal
        size={650}
        title="Add inspection."
        onClose={() => setOpenedModal(false)}
        opened={openedModal}
      >
        <AddInspectionForm carId={carId ?? ''} onClose={() => setOpenedModal(false)} />
      </Modal>
    </>
  )
}

export default CarInspectionsDataTable
