import React, { useState, useEffect, Suspense } from 'react'
import Router from './router/Router'
import { Routes } from './router/routes'

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])

  useEffect(() => {
    setAllRoutes( Routes )
  }, [])

  return (
    <Suspense fallback={null}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  )
}

export default App
