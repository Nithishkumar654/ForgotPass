import React from 'react'
import { NavLink } from 'react-router-dom'

function NavigationBar() { 
  return (
    <div className='container-fluid bg-secondary'>
        <nav className='navbar navbar-expand-md p-0'>
            <div className='collapse navbar-collapse p-1'>
                <ul className='navbar-nav flex  ms-auto '>
                    <li className='nav-item btn me-2 bg-warning  border p-1 px-3'>
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                    </li>
                    <li className='nav-item btn border bg-success p-1 px-3'>
                        <NavLink to='/login' className='nav-link'>LogIn</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default NavigationBar