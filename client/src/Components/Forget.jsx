import React from 'react'
import {Link}  from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { useState, useEffect } from 'react'

const Forget = () => {

  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
     if (message) {
      console.log('Updated Message:', message);
     }
  }, [message])

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('This field is Required')
          }),
        onSubmit: async (values) => {
          console.log(values);
          
          setLoading(true)
          setMessage(null)

          axios.post('http://localhost:8080/forget-password', { email: values.email })
          .then((response) => {
            const successMessage = { type: 'success', text: 'Reset link sent to your email' }
            setMessage(successMessage)
            console.log('Message set:', successMessage);
            formik.resetForm()
          })
          .catch((error) => {
            const errorMessage = { type: 'error', text: 'An error occurred. Please try again.' }
            setMessage(errorMessage)
            console.log('Message set:', errorMessage);
          }) 
          .finally(() => {
            setLoading(false)
          })
         
        }
      });


  return (
    <>

            <div className='container-fluid border w-50 mt-5 border-2 rounded-3 shadow-sm bg-transparent p-0 forgetDiv'>
                <div className='bg-secondary-subtle bg-transparent opacity-100'>
                    <h1 className='text-center text-info'>Write</h1>
                </div>
            <div className='row pb-5 forgetForm'>
                <div className='col-6 mx-auto mt-3 loginForm'>
                <h3 className='mx-auto'>Forget Password?</h3>
                <p>Don't worry, it happens to the best of us.</p>
                
                <form onSubmit={formik.handleSubmit}>
                <h6 className='text-dark'>{formik.touched.email && formik.errors.email}</h6>
                <input type="email" placeholder='Email' className={formik.touched.email && formik.errors.email ? 'form-control my-2 is-invalid' : 'form-control my-2'} name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
            
                <button type="submit" className='btn btn-info my-2 w-100 rounded-5 fs-3'><em className='fs-5 link-offset-2 link-underline link-underline-opacity-0 text-white'>{ loading ? 'Reset Link Sent' : 'Send Reset Link' }</em></button>

         


                {message && (
                  <div className={`mt-3 text-center ${message.type === 'success' ? 'text-info' : 'text-danger'}`}>{message.text}</div>
                  )}

                <h6 className='text-info mt-4 text-center'><Link to={'/signin'} className='link-info link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover'>Back to sign in</Link></h6>
                </form>
                </div>
                </div>
            </div>


    </>
  )
}

export default Forget