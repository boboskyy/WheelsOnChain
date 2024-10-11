import axios, { AxiosResponse } from 'axios'

export type TDeleteOrganizationFields = {
  id: string
}

export const deleteOrganization = (
  data: TDeleteOrganizationFields,
): Promise<AxiosResponse<any>['data']> => {
  return axios({
    method: 'DELETE',
    url: 'https://localhost:7169/organizations/' + data.id,
  }).then(({ data }) => data)
}
