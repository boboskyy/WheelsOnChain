import { Group, Table, createTheme } from '@mantine/core'
import getFormattedAddress from '../../utils/truncate'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../app/config/ContractConfig'
import { Link } from 'react-router-dom'

export type TCars = {
  address: string
}

const AllCarsDataTable = () => {
  const { active, account, library } = useWeb3React()
  const [cars, setCars] = useState<string[]>([])

  const getAllCars = async () => {
    console.log(library)
    if (library) {
      const contract = new library.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

      const contractResult = await contract.methods.getAllCars().call()
      console.log(contractResult)
      setCars(contractResult)
    }
  }

  const rows = cars.map((element: any) => (
    <Table.Tr key={element}>
      <Table.Td>
        <Link to={'/car/' + element.carAddress}>{getFormattedAddress(element.carAddress, 10)}</Link>
      </Table.Td>
      <Table.Td>{element.make}</Table.Td>
      <Table.Td>{element.model}</Table.Td>
      <Table.Td>{element.version}</Table.Td>
      <Table.Td>{element.year}</Table.Td>
    </Table.Tr>
  ))

  useEffect(() => {
    getAllCars()
  }, [library])

  return (
    <Table
      style={(theme) => ({
        maxWidth: '600px',
      })}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Address</Table.Th>
          <Table.Th>Make</Table.Th>
          <Table.Th>Model</Table.Th>
          <Table.Th>Version</Table.Th>
          <Table.Th>Year</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}

export default AllCarsDataTable
