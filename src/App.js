import './App.css';
import React from 'react';
import RootLayout from './components/RootLayout';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ForgotPass from './components/ForgotPass';
import VerifyOtp from './components/VerifyOtp';
import NewPass from './components/NewPass';

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/forgotPass',
          element:<ForgotPass/>
        },
        {
          path:'/verifyOtp',
          element:<VerifyOtp/>
        },
        {
          path:'/newPass',
          element:<NewPass/>
        }   
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;