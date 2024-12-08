import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Navigate } from "react-router-dom"
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Personal from './pages/Personal'
import ForgetPass from './pages/ForgetPass'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import ResetPass from './pages/ResetPass'
// import CollectionPage from './pages/CollectionPage'



// import './App.css'

function App() {

    // const [searchQuery, setSearchQuery] = useState('')

    // const handleSearch = (query) => {
    //   console.log('Search Query:', query);
    //   setSearchQuery(query)
    // }


  return (
    <>
    
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path='/home' element={<Navigate to='/'/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/login' element={<Signin/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/user' element={<Personal/>}/>
      <Route path='/forget-password' element={<ForgetPass/>}/>
      <Route path='/reset-password/:token' element={<ResetPass/>}/>
      {/* <Route path='/collections' element={<CollectionPage/>}/> */}
    </Routes>

{/* 
      <Navbar onSearch={handleSearch}/>
      <Hero searchQuery={searchQuery}/> */}
    </>
  )
}

export default App
