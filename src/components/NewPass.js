import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function NewPass() {
    
    let {register,handleSubmit,formState:{errors}} = useForm();
    let [err, setErr] = useState("")
    let navigate = useNavigate()
  
    function changePass(obj){
        
        if(obj.newPassword === obj.repeatPassword){
            setErr("");
            alert('Password Update Successful..')
            localStorage.clear();
            navigate('/login')
        }else{
            setErr('New Password and Repeat Password should be Same..!!')
        }
    }
    
    useEffect(() => {
        
        axios.post('http://localhost:4000/pathjump', {token: localStorage.getItem('token')})
        .then(res => {
            
            if(res.data.success === undefined){
                alert('Unauthorized Access.. \nPlease Enter Your Email And Get Validated By OTP To Change Your Password..!!')
                localStorage.clear();
                navigate('/login')
            }

        })
        .catch(err => alert(err.message))
    },[])
    return (
    <div className='container-fluid border d-flex justify-content-center align-items-center vh-100'>

        <form className='text-center p-2' onSubmit={handleSubmit(changePass)}>
        {err.length !== 0 && <p className='lead text-danger'>{err}</p>}
            <div className='mb-3'>
                <input type='password' placeholder='Enter New Password' className='rounded p-1' {...register('newPassword',{required:true})} />
            </div>
            <div className='mb-3'>
                <input type='password' placeholder='Repeat New Password' className='rounded p-1' {...register('repeatPassword',{required:true})} />
            </div>
            <Button className='btn btn-success' type='submit'>Change Password</Button>
        </form>
        
    </div>
  )
}

export default NewPass