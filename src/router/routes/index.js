// ** React Imports
import { lazy } from 'react'

const Dashboard = lazy(() => import('../../views/Dashboard/Dashboard'))

const Routes = [
  {
    path: '/dashboard',
    index: true,
    element: <Dashboard />
  },
]

export { Routes }
