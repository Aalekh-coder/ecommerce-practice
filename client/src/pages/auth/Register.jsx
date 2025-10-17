import Form from '@/components/common/Form';
import { registerFormControls } from '@/config';
import { registerUser } from '@/store/authSlice';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
  userName: "",
  email: "",
  password: ""
}

const Register = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message)
      } else {
        console.log(data);
        toast.error(data?.payload?.message)
      }
    })
  }

  return (
    <div className='mx-auto  w-full max-w-md space-y-6'>
      <div className="text-center">
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2'>Already have an account
          <Link className='font-medium ml-2  text-primary hover:underline' to={'/auth/login'}>Login</Link>
        </p>
      </div>
      <Form formControls={registerFormControls} buttonText={"Signup"} formData={formData} setFormData={setFormData} onSubmit={onSubmit} />
    </div>
  )
}

export default Register