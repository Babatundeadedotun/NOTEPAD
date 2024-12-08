import React from 'react'
import {Link}  from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const Formin = () => {


    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate()

    // const url = "http://localhost:8080/login"

    const url = "https://notepad-69yg.vercel.app/login"

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('This field is Required'),
            password: Yup.string().required('This field is Required').min(6, 'Password must be at least 6 characters long')
          }),
        onSubmit: (values) => {
          console.log(values);
          axios.post(url, values)
          .then((response) => {
              console.log("Response from Backend:", response.data);
              const email = response.data.user.email;
              localStorage.setItem('email', email);
              if(response.data.status){
                  alert(response.data.message)
                  formik.resetForm()
                  navigate('/user')
              }
          })
          .catch((error) => {
            if(error.response){
                // console.log("Error response from Backend", error.response);
                if (error.response.status === 401){
                    alert("Incorrect Password")
                } else if(error.response.status === 404) {
                    alert("Invalid Login Credentials")
                } else {
                    alert("An error occurred, please try again later")
                }
            } else {
                console.log("Error (no response):", error);
                alert("An error occurred, check your network connection")
                navigate('/login')
            }
              
          })
        }
      });
      console.log(formik.errors);
      

  return (
    <>

    
    <div className='container-fluid border w-50 mt-5 border-2 rounded-3 shadow-sm bg-transparent p-0 loginDiv'>
        <div className='bg-secondary-subtle bg-transparent opacity-100'>
            <h1 className='text-center text-info'>Write</h1>
        </div>
    <div className='row pb-5 loginForm'>
        <div className='col-6 mx-auto mt-3 loginForm'>
        <h1 className='mx-auto'>Sign in</h1>
        <p>Not a member? <Link to="/signup" className='link-info link-offset-2 link-underline link-underline-opacity-0'>Join Write</Link></p>
        
        <form onSubmit={formik.handleSubmit}>
        <h6 className='text-dark'>{formik.touched.email && formik.errors.email}</h6>
        <input type="email" placeholder='Email' className={formik.touched.email && formik.errors.email ? 'form-control my-2 is-invalid' : 'form-control my-2'} name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
        
        <h6 className='text-dark'>{formik.touched.password && formik.errors.password}</h6>
        <div className='input-group my-2'>
        <input type={showPassword ? 'text' : 'password'} placeholder='Password' className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'} value={formik.values.password} name='password' onChange={formik.handleChange}  onBlur={formik.handleBlur}/><span className='input-group-text' onClick={() => setShowPassword(!showPassword)} style={{cursor: 'pointer'}}><i className="bi bi-eye-slash"></i></span>
        </div>

        <button type="submit" className='btn btn-info my-2 w-100 rounded-5 fs-3'><em className='fs-5 link-offset-2 link-underline link-underline-opacity-0 text-white'>Sign in</em></button>

        <h6 className='text-info mt-4 text-center'><Link to={'/forget-password'} className='link-info link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover'>Forget your password?</Link></h6>
        </form>
        </div>
        </div>
    </div>
    </>
  )
}

export default Formin