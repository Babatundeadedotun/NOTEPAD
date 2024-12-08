import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../App.css'

const ResetPassword = () => {

    const [showPassword, setShowPassword] = React.useState(false)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    

    const { token } = useParams()
    const navigate = useNavigate()

    // console.log(token);
    


    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            setMessage(null)
            try {
                const response = await axios.post(`https://notepad-10ml.vercel.app/users/reset-password/${token}`, {password: values.password});
                setMessage({ type: 'success', text: response.data.message })
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } catch (error) {
                setMessage({ type: 'error', text: error.response.data.message })
            } finally {
                setLoading(false)
            }
        }
    })

  return (
    <>

    <div className='container-fluid border w-50 mt-5 border-2 rounded-3 shadow-sm bg-transparent p-0 resetDiv'>
        <div className='bg-secondary-subtle bg-transparent opacity-100'>
            <h1 className='text-center text-info'>Reset Password</h1>
        </div>


        <div className='row pb-5 forgetForm'>
                <div className='col-6 mx-auto mt-3 loginForm'>
                <form onSubmit={formik.handleSubmit}>

                <h6 className='text-dark'>{formik.touched.password && formik.errors.password}</h6>
                <div className='input-group my-2'>
                <input type={showPassword ? 'text' : 'password'} placeholder='Enter New Password' className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'} value={formik.values.password} name='password' onChange={formik.handleChange}  onBlur={formik.handleBlur}/><span className='input-group-text' onClick={() => setShowPassword(!showPassword)} style={{cursor: 'pointer'}}><i className="bi bi-eye-slash"></i></span>
                </div>
            
                <button type="submit" className='btn btn-info my-2 w-100 rounded-5 fs-3' disabled={loading}><em className='fs-5 link-offset-2 link-underline link-underline-opacity-0 text-white'>{ loading ? 'Resetting...' : 'Reset Password' }</em></button>

         


                {message && (
                  <div className={`mt-3 text-center ${message.type === 'success' ? 'text-info' : 'text-danger'}`}>{message.text}</div>
                  )}
                </form>
                </div>
                </div>
    </div>

    </>
  )
}

export default ResetPassword