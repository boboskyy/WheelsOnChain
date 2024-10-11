import * as yup from 'yup'
import axios, { AxiosResponse } from 'axios'

export type TSignInFormFields = {
  email: string
  password: string
}

export const signInSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup.string().required('Password is required'),
})

export type TSignInFormResponse = {
  user: {
    id: string
    email: string
  }
  token: string
}
export const postSignIn = (
  data: TSignInFormFields,
): Promise<AxiosResponse<TSignInFormResponse>['data']> => {
  return axios({
    method: 'POST',
    data: data,
    url: 'https://localhost:7169/auth/login',
  }).then(({ data }) => data)
}
