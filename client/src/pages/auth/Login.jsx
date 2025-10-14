import Form from '@/components/common/Form';
import { loginFormControls } from '@/config';
import { loginUserService } from '@/store/auth-slice';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
  email: "",
  password: ""
}

const Login = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUserService(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
       return navigate("/shop/home")
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  return (
    <div className='mx-auto  w-full max-w-md space-y-6'>
      <div className="text-center">
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2'>Don't have an account
          <Link className='font-medium ml-2  text-primary hover:underline' to={'/auth/register'}>Register</Link>
        </p>
      </div>
      <Form formControls={loginFormControls} buttonText={"Login"} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
    </div>
  )
}

export default Login