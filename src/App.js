import React, { useState, useEffect } from 'react'
import Router from './router/Router'
import { Routes } from './router/routes'

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])

  useEffect(() => {
    setAllRoutes( Routes )
  }, [])

  return (
    <Router allRoutes={allRoutes} />
  )
}

export default App
