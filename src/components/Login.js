import React from 'react'
import {useForm} from 'react-hook-form';
import { NavLink } from 'react-router-dom';

function Login() {

  let {register,handleSubmit,formState:{errors}}=useForm();
  return (
    <div className='container-fluid p-3 justify-content-center align-items-center d-flex vh-100 '>
        <form className='text-center p-2'>
                <div className='mb-3'>
                    <input type='email' placeholder='Enter Email' className='rounded p-1' {...register('email',{required:true})} />
                </div>
                <div className='mb-3'>
                    <input type='password' placeholder='Enter Password' className='rounded p-1' {...register('password',{required:true})} />
                </div>
                <div className='mb-3'><NavLink to='/forgotPass' className='text-danger'>Forgot Password</NavLink></div>
                <div className='btn btn-success' type='submit'>Login</div>
        </form>
    </div>
  )
}

export default Login