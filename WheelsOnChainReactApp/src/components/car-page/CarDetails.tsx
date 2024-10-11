import { Card, Group, Stack, Text } from '@mantine/core'
import { useParams } from 'react-router-dom'
import getFormattedAddress from '../../utils/truncate'
import BadgeHeaderWithTitle from './BadgeHeaderWithTitle'
import CheckVinCard from './CheckVinCard'
import { TCarDetails } from '../../pages/car-page/CarPage'

export type TCarDetailsProps = {
  currentCar: TCarDetails | undefined
}

const CarDetails = ({ currentCar }: TCarDetailsProps) => {
  const { carId } = useParams()

  return (
    currentCar && (
      <Stack gap={'lg'}>
        <Stack maw={'290px'} gap={0}>
          <BadgeHeaderWithTitle title={'Car address'} />
          <Card p="xs">
            <Text>{getFormattedAddress(carId ?? '', 13)}</Text>
          </Card>
        </Stack>
        <Stack maw={'290px'} gap={0}>
          <BadgeHeaderWithTitle title={'Car details'} />
          <Card p="xs">
            <Group justify="space-between">
              <Text fw={600}>Make</Text>
              <Text>{currentCar?.[0]}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600}>Model</Text>
              <Text>{currentCar?.[1]}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600}>Version</Text>
              <Text>{currentCar?.[2]}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600}>Year</Text>
              <Text>{currentCar?.[3]}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600}>Engine capacity</Text>
              <Text>{currentCar?.[4]} cm3</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600}>Country of origin</Text>
              <Text>{currentCar?.[5]}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600}>Fuel type</Text>
              <Text>{currentCar?.[6]}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600}>Stolen</Text>
              <Text>{currentCar?.[8] === true ? 'Yes' : 'No'}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600}>Inspections</Text>
              <Text>{currentCar?.[10]}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600}>Modyfications</Text>
              <Text>{currentCar?.[9]}</Text>
            </Group>
          </Card>
        </Stack>
        <CheckVinCard />
      </Stack>
    )
  )
}

export default CarDetails
