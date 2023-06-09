import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {

  let {register,handleSubmit,formState:{errors}} = useForm();
  let [err, setErr] = useState("")
  let navigate = useNavigate()
  
  function verification(obj){
    
    obj.hashedOtp = localStorage.getItem('otp')
    obj.token = localStorage.getItem('token')

    axios.post('http://localhost:4000/verifyotp', obj)
    .then(res => {
        if(res.data.success === true){
            setErr("")
            //navigate
            navigate('/newPass')
            //console.log('Success')
        }else{
            setErr(res.data.message)
        }
    })
    .catch(err => setErr(err.message))
  }

  useEffect(() => {
        
    axios.post('http://localhost:4000/pathjump', {token: localStorage.getItem('token')})
    .then(res => {

        if(res.data.success === undefined){
            alert('Unauthorized Access.. \nPlease Enter Your Email And Get Validated By OTP To Change Your Password..!!')
            navigate('/login')
        }

    })
    .catch(err => alert(err.message))
  },[])

  return (
    <div className='container-fluid border d-flex justify-content-center align-items-center vh-100'>
       
        <form className='text-center p-2' onSubmit={handleSubmit(verification)}>
        {err.length !== 0 && <p className='lead text-danger'>{err}</p>}
            <div className='mb-3'>
                <input type='number' placeholder='Enter OTP' className='rounded p-1' {...register('otp',{required:true})} />
            </div>
            <Button className='btn btn-success' type='submit'>Submit</Button>
        </form>
    </div>
  )
}

export default VerifyOtp