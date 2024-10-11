import axios, { AxiosResponse } from 'axios'

export type TGetOrganization = {
  id: string
  address: string
  name: string
  trustiness: {
    code: number
    name: string
  }
}

export type TGetOrganizationsResponse = {
  organizations: TGetOrganization[]
}

export const getOrganizations = (): Promise<AxiosResponse<TGetOrganizationsResponse>['data']> => {
  return axios({
    method: 'GET',
    url: 'https://localhost:7169/organizations/browse',
  }).then(({ data }) => data)
}
