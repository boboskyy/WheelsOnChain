import axios, { AxiosResponse } from 'axios'
import { TSignInFormResponse } from './SignIn'

export const getMe = (): Promise<AxiosResponse<TSignInFormResponse>['data']> => {
  return axios({
    method: 'GET',
    url: 'https://localhost:7169/auth/me',
  }).then(({ data }) => data)
}
