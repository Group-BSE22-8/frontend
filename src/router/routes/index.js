// ** React Imports
import { lazy } from 'react'

const Login = lazy(() => import('../../views/Auth/Login'))
const Dashboard = lazy(() => import('../../views/Dashboard/Dashboard'))
const Projects = lazy(() => import('../../views/Projects/Project'))
const Applications = lazy(() => import('../../views/Applications/Application'))

const Routes = [
  {
    path: '/',
    index: true,
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/projects',
    element: <Projects />
  },
  {
    path: '/applications',
    index: true,
    element: <Applications />
  },
]

export { Routes }
