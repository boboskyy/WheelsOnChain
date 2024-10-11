import { useParams } from 'react-router-dom'
import CarDetails from '../../components/car-page/CarDetails'
import CarInspectionsDataTable from '../../components/car-page/CarInspectionsDataTable'
import { Button, Center, Group, Loader, Stack, Text } from '@mantine/core'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../app/config/ContractConfig'
import AddCarForm from '../../components/car-page/AddCarForm'
import CarModificationsDataTable from '../../components/car-page/CarModificationsDataTable'

export type TCarDetails = {
  0: string
  1: string
  2: string
  3: number
  4: number
  5: string
  6: string
  7: string
  8: boolean
  9: number
  10: number
}

const CarPage = () => {
  const { carId } = useParams()
  const { active, account, library } = useWeb3React()
  const [currentCar, setCurrentCar] = useState<TCarDetails>()
  const [loading, setLoading] = useState<boolean>(false)

  const getCurrentCar = () => {
    if (library) {
      setLoading(true)
      const contract = new library.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

      contract.methods
        .getCar(carId)
        .call()
        .then((contractResult: TCarDetails) => {
          setCurrentCar(contractResult)
          setLoading(false)
        })
        .catch((error: any) => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    getCurrentCar()
  }, [library])

  if (!currentCar && !loading)
    return (
      <Center>
        <Stack>
          <Text>Car does not exist.</Text>
          {account === carId && <AddCarForm refetch={getCurrentCar} />}
        </Stack>
      </Center>
    )
  if (loading)
    return (
      <Center>
        <Loader color="blue" />
      </Center>
    )
  return (
    <Group justify="start" align="start" mt={'md'} wrap={'nowrap'}>
      <CarDetails currentCar={currentCar} />
      <Stack w={'100%'}>
        <CarInspectionsDataTable currentCar={currentCar} />
        <CarModificationsDataTable currentCar={currentCar} />
      </Stack>
    </Group>
  )
}

export default CarPage
