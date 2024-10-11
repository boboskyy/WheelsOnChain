import {
  CSSVariablesResolver,
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import VerifyJwt from './app/api/VerifyJwt.tsx'
import { createAxios } from './app/api/axios.ts'
import { ModalsProvider } from '@mantine/modals'

const myColor: MantineColorsTuple = [
  '#dff9ff',
  '#cbecff',
  '#9bd6fe',
  '#67bffa',
  '#3dacf8',
  '#20a0f7',
  '#0399f7',
  '#0085de',
  '#0076c7',
  '#0067b1',
]

const theme = createTheme({
  fontFamily: 'Fira Code',
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
  other: {
    badgeLight: '#123149',
    badgeDark: '#101112',
  },
})

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--badge': theme.other.badgeLight,
    '--body-bg': '#f4f3f4',
  },
  dark: {
    '--badge': theme.other.badgeDark,
    '--body-bg': '#1a1b1e',
  },
})

function getLibrary(provider: any) {
  return new Web3(provider)
}

createAxios()

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MantineProvider theme={theme} cssVariablesResolver={resolver}>
          <ModalsProvider>
            <VerifyJwt>
              <App />
            </VerifyJwt>
          </ModalsProvider>
        </MantineProvider>
      </Web3ReactProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
