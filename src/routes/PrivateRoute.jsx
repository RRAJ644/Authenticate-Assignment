import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default PrivateRoute
