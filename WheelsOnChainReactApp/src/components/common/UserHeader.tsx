import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  CopyButton,
  Group,
  Paper,
  Switch,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import getFormattedAddress from '../../utils/truncate'
import { GiCarWheel } from 'react-icons/gi'
import { BiLogOut } from 'react-icons/bi'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsMoon, BsSun } from 'react-icons/bs'
import { MdAdminPanelSettings } from 'react-icons/md'
import { notifications } from '@mantine/notifications'
import useAdminStore from '../../app/store/useAdminStore'

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 11155111],
})

export const UserHeader = () => {
  const { setColorScheme } = useMantineColorScheme()
  const { active, activate, deactivate, account } = useWeb3React()

  const { admin } = useAdminStore()

  const [themeChecked, setThemeChecked] = useState(() => {
    if (localStorage.getItem('mantine-color-scheme-value') === 'dark') {
      return true
    } else {
      return false
    }
  })

  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('connectedAddress', JSON.stringify(account))
    } catch (ex) {
      return false
    }
  }

  async function disconnect() {
    try {
      await deactivate()
      localStorage.removeItem('connectedAddress')
      return true
    } catch (ex) {
      return false
    }
  }

  useEffect(() => {
    const account = localStorage.getItem('connectedAddress')
    if (account) connect()
  }, [])

  const onThemeChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeChecked((prev) => !prev)
    if (event.currentTarget.checked) {
      setColorScheme('dark')
    } else {
      setColorScheme('light')
    }
  }

  return (
    <Box py={'xs'}>
      <header>
        <Group justify="space-between">
          <Link to="/">
            <Group>
              <GiCarWheel />
              <Text fz={'lg'} fw={700}>
                WheelsOnChain
              </Text>
            </Group>
          </Link>
          <Group style={{ height: '100%' }} align={'center'} justify="flex-end">
            <Switch
              size="lg"
              color="dark.4"
              checked={themeChecked}
              onChange={onThemeChangeHandle}
              onLabel={<BsSun size={13} />}
              offLabel={<BsMoon size={13} />}
            />
            {account ? (
              <Group>
                <Link to={'/car/' + account}>
                  <Avatar radius="xl" />
                </Link>
                <Paper bg={'myColor.6'} radius={'xl'} px={'xs'} py={5}>
                  <CopyButton value={account}>
                    {({ copied, copy }) => (
                      <Text
                        fz={'sm'}
                        color="white"
                        fw={400}
                        onClick={() => {
                          copy()
                          notifications.show({
                            loading: false,
                            title: 'Copied',
                            message: 'Adress was copied to clipboard',
                            autoClose: 3000,
                            withCloseButton: false,
                          })
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {getFormattedAddress(account)}
                      </Text>
                    )}
                  </CopyButton>
                </Paper>
                {admin && (
                  <Link to="/admin/panel">
                    <ActionIcon>
                      <MdAdminPanelSettings />
                    </ActionIcon>
                  </Link>
                )}
                <ActionIcon onClick={disconnect} variant="outline">
                  <BiLogOut />
                </ActionIcon>
              </Group>
            ) : (
              <Button onClick={connect}>Connect</Button>
            )}
          </Group>
        </Group>
      </header>
    </Box>
  )
}
