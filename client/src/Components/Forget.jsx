import React from 'react'
import {Link}  from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const Forget = () => {



    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('This field is Required')
          }),
        onSubmit: (values) => {
          console.log(values);
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
            
                <button type="submit" className='btn btn-info my-2 w-100 rounded-5 fs-3'><em className='fs-5 link-offset-2 link-underline link-underline-opacity-0 text-white'>Send reset link</em></button>


                <h6 className='text-info mt-4 text-center'><Link to={'/signin'} className='link-info link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover'>Back to sign in</Link></h6>
                </form>
                </div>
                </div>
            </div>


    </>
  )
}

export default Forget