import * as yup from 'yup'
import axios, { AxiosResponse } from 'axios'

export type TAddOrganizationFormFields = {
  address: string
  name: string
  trustiness: string
}

export const addOrganizationSchema = yup.object().shape({
  address: yup
    .string()
    .required('Address is required')
    .matches(/^(0x)?[0-9a-fA-F]{40}$/, 'Please enter a valid Ethereum address')
    .required('Ethereum address is required'),
  name: yup.string().required('Name is required'),
  trustiness: yup.string().required('Trustiness is required'),
})

export const postAddOrganization = (
  data: TAddOrganizationFormFields,
): Promise<AxiosResponse<unknown>['data']> => {
  return axios({
    method: 'POST',
    data: { ...data, trustiness: parseInt(data.trustiness) },
    url: 'https://localhost:7169/organizations',
  }).then(({ data }) => data)
}
