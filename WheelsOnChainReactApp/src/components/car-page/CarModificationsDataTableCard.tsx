import { ActionIcon, Badge, Card, Group, Stack, Text, Tooltip } from '@mantine/core'
import { ImCheckmark } from 'react-icons/im'
import { RiCloseCircleLine } from 'react-icons/ri'
import { AiOutlineArrowDown } from 'react-icons/ai'

import { BsQuestionCircle } from 'react-icons/bs'
import { TModificationDetails } from './CarModificationsDataTable'
import { useState } from 'react'

type CarModificationsDataTableCardProps = {
  modification: TModificationDetails
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp * 1000)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

const CarModificationsDataTableCard = ({ modification }: CarModificationsDataTableCardProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  return (
    <Card>
      <Group>
        {modification[6] == null && !showDetails ? (
          <>
            <Stack gap={'1'}>
              <Group gap={'xs'}>
                <Text fz={'11'} c={'#888888'}>
                  {formatDate(modification[4])}
                </Text>
                <Text fz={'11'} c={'#777777'}>
                  Modification created by not verified (unknown) organization.
                </Text>
              </Group>
              <Text fz={'10'} c={'#666666'}>
                You can still see details but you can't trust this modification.
              </Text>
            </Stack>
            <ActionIcon ml={'auto'} onClick={() => setShowDetails(true)}>
              <AiOutlineArrowDown />
            </ActionIcon>
          </>
        ) : modification[6] != null && modification[6].trustiness.code == 0 && !showDetails ? (
          <>
            <Stack gap={'1'}>
              <Group gap={'xs'}>
                <Text fz={'11'} c={'#888888'}>
                  {formatDate(modification[4])}
                </Text>
                <Text fz={'11'} c={'#cf0000'}>
                  Modification created by organization marked as untrusted and potentially
                  malicious.
                </Text>
              </Group>
              <Text fz={'10'} c={'#ba0000'}>
                You can still see details but it's highly recommended NOT to trust this
                modification.
              </Text>
            </Stack>
            <ActionIcon ml={'auto'} onClick={() => setShowDetails(true)}>
              <AiOutlineArrowDown />
            </ActionIcon>
          </>
        ) : (
          <>
            <ActionIcon variant="transparent" size={'lg'}>
              {(modification[6] == null && <BsQuestionCircle color={'#42aef8'} size={'1.3em'} />) ||
                (modification[6] != null && modification[6].trustiness.code == 2 && (
                  <ImCheckmark color={'#7cca7c'} size={'1.3em'} />
                )) ||
                (modification[6] != null && modification[6].trustiness.code == 1 && (
                  <BsQuestionCircle color={'#42aef8'} size={'1.3em'} />
                )) ||
                (modification[6] != null && modification[6].trustiness.code == 0 && (
                  <RiCloseCircleLine color={'#e8504d'} size={'1.5em'} />
                ))}
            </ActionIcon>
            <Stack gap={0}>
              <Group gap={'xs'}>
                <Text fz={'10'} c={'#888888'}>
                  {formatDate(modification[4])}
                </Text>
                <Text fz={'10'} c={'#0067b1'}>
                  |
                </Text>
                <Text fz={'10'} c={'#666666'}>
                  Cost: {modification[5]} USD
                </Text>
              </Group>
              <Text mt={'3'} fz={'sm'}>
                {modification[1]}
              </Text>
              <Group mt={8} gap={'xs'}>
                {/* <Text fz={'xs'} fw={'bold'}>
                
              </Text> */}
                <Tooltip offset={-55} fz={'11'} label="Name of organization from blockchain">
                  <Badge fw={400} variant="dot">
                    {modification[2]}
                  </Badge>
                </Tooltip>
                {modification[6] && (
                  <Tooltip offset={-55} fz={'11'} label="Verified name of organization">
                    <Badge fw={400} variant="outline">
                      {modification[6].name}
                    </Badge>
                  </Tooltip>
                )}
                <Tooltip offset={-55} fz={'11'} label="Organization address">
                  <Badge fw={400}>{modification[3]}</Badge>
                </Tooltip>
              </Group>
            </Stack>
            {/* <ActionIcon ml={'auto'}>
              <AiOutlineArrowDown />
            </ActionIcon> */}
          </>
        )}
      </Group>
    </Card>
  )
}

export default CarModificationsDataTableCard
