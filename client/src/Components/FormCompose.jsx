import React from 'react'
import {Link}  from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const FormCompose = () => {


    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate() 

    const url = "https://notepad-delta-orcin.vercel.app/api/users/register"


    const formik = useFormik({

        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('This field is Required'),
            lastName: Yup.string().required('This field is Required'),
            email: Yup.string().email('Invalid email address').required('This field is Required'),
            password: Yup.string().required('This field is Required').min(6, 'Password must be at least 6 characters long')
          }),
        onSubmit: (values) => {
          console.log(values);
          axios.post(url, values)
          .then((response) => {
              console.log(response.data);
              alert(response.data.message);
              formik.resetForm();
              navigate('/login')
          })
          .catch((error) => {
              console.log(error);
          });   
        }
      });
    
      console.log(formik.errors);



  return (
        <>

    
    <div className='container-fluid border w-75 mt-5 border-2 rounded-3 p-0 shadow-sm bg-transparent'>
        <div className='bg-secondary-subtle bg-transparent opacity-100'>
            <h1 className='text-center text-info'>Write</h1>
        </div>
    <div className='row p-4 signup'>

    <div className='col-lg-6 col-sm-12 mx-auto mt-3 firstDiv'>
            <div className='container-fluid'>
                <h3 className='firstHead'>Take Your Daily Notes Now!!!</h3>
                <h5 className='firstPara'>with <em className='fs-2 text-info'>Write</em> at your finger tips</h5>

                <ul className='p-3 fs-5 list'>
                    <li className='mb-2'>Secure and Private Notepad</li>
                    <li className='mb-2'>Highly Customizable</li>
                    <li className='mb-2'>Easy-to-use Interface</li>
                    <li>Attachment and Media Support</li>
                </ul>
            </div>
        </div>


        <div className='col-lg-6 col-sm-12 mx-auto mt-3'>
        <h1 className='mx-auto tryWrite'>Try <i className='text-info'>Write</i> for free</h1>
        <p className='signupPara'>Already a member? <Link to="/signin" className='link-info link-offset-2 link-underline link-underline-opacity-0'>Sign in</Link></p>

        <form onSubmit={formik.handleSubmit}>
        <h6 className='text-dark'>{formik.touched.firstName && formik.errors.firstName}</h6>
        <input type="text" id="firstName" placeholder='First name' value={formik.values.firstName} className={formik.touched.firstName && formik.errors.firstName ? 'form-control my-2 is-invalid' : 'form-control my-2'} name='firstName' onChange={formik.handleChange}  onBlur={formik.handleBlur}/>

        <h6 className='text-dark'>{formik.touched.lastName && formik.errors.lastName}</h6>
         <input type="text" id="lastName" placeholder="Last name" value={formik.values.lastName} className={formik.touched.lastName && formik.errors.lastName ? 'form-control my-2 is-invalid' : 'form-control my-2'} name= "lastName" onChange={formik.handleChange}  onBlur={formik.handleBlur}/>

         <h6 className='text-dark'>{formik.touched.email && formik.errors.email}</h6>
        <input type="email" placeholder='Email' className={formik.touched.email && formik.errors.email ? 'form-control my-2 is-invalid' : 'form-control my-2'} value={formik.values.email} name='email' onChange={formik.handleChange}  onBlur={formik.handleBlur}/> 

        <h6 className='text-dark'>{formik.touched.password && formik.errors.password}</h6>
        <div className='input-group my-2'>
        <input type={showPassword ? 'text' : 'password'} placeholder='Password' className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'} value={formik.values.password} name='password' onChange={formik.handleChange}  onBlur={formik.handleBlur}/><span className='input-group-text' onClick={() => setShowPassword(!showPassword)} style={{cursor: 'pointer'}}><i className="bi bi-eye-slash"></i></span>
        </div>
        <button type="submit" className='btn btn-info my-2 w-100 rounded-5 fs-3'><em className='fs-5 link-offset-2 link-underline link-underline-opacity-0 text-white'>Start for FREE!!!</em></button>
        </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default FormCompose