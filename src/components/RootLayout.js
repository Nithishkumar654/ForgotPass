import React from 'react'
import NavigationBar from './NavigationBar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <NavigationBar/>
        <Outlet/>
    </div>
  )
}

export default RootLayout