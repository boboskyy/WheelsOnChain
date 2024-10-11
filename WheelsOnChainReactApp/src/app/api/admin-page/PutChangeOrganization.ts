import * as yup from 'yup'
import axios, { AxiosResponse } from 'axios'

export type TChangeOrganizationFormFields = {
  id: string
  address: string
  name: string
  trustiness: string
}

export const putChangeOrganization = (
  data: TChangeOrganizationFormFields,
): Promise<AxiosResponse<unknown>['data']> => {
  return axios({
    method: 'PUT',
    data: { ...data, trustiness: parseInt(data.trustiness) },
    url: 'https://localhost:7169/organizations/' + data.id,
  }).then(({ data }) => data)
}
