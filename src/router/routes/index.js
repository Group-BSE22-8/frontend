// ** React Imports
import { lazy } from 'react'

const Dashboard = lazy(() => import('../../views/Dashboard/Dashboard'))
const Projects = lazy(() => import('../../views/Projects/Project'))


const Routes = [
  {
    path: '/dashboard',
    index: true,
    element: <Dashboard />
  },
  {
    path: '/projects',
    index: true,
    element: <Projects />
  },
]

export { Routes }
