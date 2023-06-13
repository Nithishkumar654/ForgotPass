import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function ForgotPass() {
  
  let {register,handleSubmit} = useForm();
  let [err, setErr] = useState("")
  let navigate = useNavigate()

  function sendMail(obj){

    obj.subject = 'One Time Password (OTP)'
    axios.post('http://localhost:4000/sendemail',obj)
    .then(res => {
      if(res.data.success === true){
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('otp', res.data.otp)
        setErr("")
        // sent mail success
        //console.log('Successfully mail sent')
        navigate('/verifyOtp')
      }else{
        setErr(res.data.message)
      }
    })
    .catch(err => setErr(err.message))

  }
  return (
    <div className='container-fluid border d-flex justify-content-center align-items-center vh-100'>
        <form className='text-center p-2' onSubmit={handleSubmit(sendMail)}>
        {err.length !== 0 && <p className='lead text-danger'>{err}</p>}
            <div className='mb-3'>
                <input type='email' placeholder='Enter Your Email' className='rounded p-1' {...register('email',{required:true})} />
            </div>
            <Button className='btn btn-success' type='submit'>Send OTP to Mail</Button>
        </form>
    </div>
  )
}

export default ForgotPass