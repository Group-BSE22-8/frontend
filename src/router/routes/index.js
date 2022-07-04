// ** React Imports
import { lazy } from 'react'

const Dashboard = lazy(() => import('../../views/Dashboard'))

const Routes = [
  {
    path: '/',
    index: true,
    element: <Dashboard />
  },
]

export { Routes }
