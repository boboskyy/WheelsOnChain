import { useEffect } from 'react'
import useAdminStore from '../store/useAdminStore'
import { getMe } from './admin-page/GetMe'

type VerifyJwtProps = {
  children: React.ReactNode
}
const VerifyJwt = ({ children }: VerifyJwtProps) => {
  const { setAdminAuth, clearAdminAuth } = useAdminStore()

  useEffect(() => {
    getMe()
      .then((data) => setAdminAuth({ email: data.user.email, id: data.user.id, token: data.token }))
      .catch(() => {
        clearAdminAuth()
        localStorage.removeItem('token')
      })
  }, [])

  return <>{children}</>
}

export default VerifyJwt
