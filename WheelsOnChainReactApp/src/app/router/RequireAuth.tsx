import { Navigate, Outlet } from 'react-router-dom'
import useAdminStore from '../store/useAdminStore'

const RequireAuth = () => {
  const { admin } = useAdminStore()
  if (admin) {
    return <Outlet />
  }
  return <Navigate to={'/admin'} />
}

export default RequireAuth
