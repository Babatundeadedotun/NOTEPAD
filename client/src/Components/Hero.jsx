import React from 'react'
import {Link}  from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../App.css'

const Hero = () => {

  
  const url = "https://notepad-69yg.vercel.app/save"




  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([])
  const [file, setFile] = useState(null)
  const [fileReceived, setFileReceived] = useState(null)
  const [loadingImage, setLoadingImage] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState(null)



      useEffect(() => {
        const storedUserEmail = localStorage.getItem("email")
        if (storedUserEmail) {
          setUserEmail(storedUserEmail)
          fetchNotes(storedUserEmail)
        }
      }, []);


    const handleFileChange = async (e) => {
      let userFile = e.target.files[0];

      if(userFile) {

      const convertedFile = new FileReader();

      setLoadingImage(true)

      convertedFile.readAsDataURL(userFile);

        convertedFile.onload = () => {
          axios.post('https://notepad-69yg.vercel.app/save/upload', { file: convertedFile.result })
          .then((response) => {
            setFileReceived(response.data.stored)
            // console.log(response.data.stored);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoadingImage(false)
          })
        }

        convertedFile.onerror = (error) => {
          console.error('Error reading file', error);
          setLoadingImage(false)
        }
      }
    }


      const formik = useFormik({
        initialValues: {
          title: "",
          content: "",
          date: new Date().toISOString().split('T')[0],
      },
      enableReinitialize: true,
      validationSchema: Yup.object({
        title: Yup.string().required('This field is Required'),
        content: Yup.string().required('This field is Required').max(1000, "Message should be less than 1000 characters"),
        date: Yup.date().required('This field is Required').typeError('Invalid date format. Use YYYY-MM-DD')
      }),
      onSubmit: (values) => {
        // console.log(values);
        if(!fileReceived) {
          alert("Please upload an image before submitting.")
          return;
        }

        if(editingNoteId) { 
          axios.put(`https://notepad-69yg.vercel.app/save/${editingNoteId}`, {userEmail, fileReceived, ...values})
          .then((response) => {
            console.log("Edit response:", response.data);
            setNotes((prevNotes) => prevNotes.map((note) => note._id === editingNoteId ? {...note, ...values} : note))
            setEditingNoteId(null)
            formik.resetForm();
            setFile(null)
            setFileReceived(null);
      
            const fileInput = document.querySelector('input[type="file"]')
            if (fileInput) {
              fileInput.value = '';
            }
          })
          .catch((error) => {
            console.error("Error updating note:", error);
          })
        } else  {

          axios.post(url, {userEmail, fileReceived, ...values})
          .then((response) => {
            console.log("Response from server:", response.data);
            fetchNotes(userEmail)
            formik.resetForm();
      
            setFile(null)
            setFileReceived(null);
      
            const fileInput = document.querySelector('input[type="file"]')
            if (fileInput) {
              fileInput.value = '';
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          })
      
        
        }
      }
      })

      
      const fetchNotes = async (userEmail) => {
        try {
          const response = await axios.get(`https://notepad-69yg.vercel.app/save/${userEmail}`)
          console.log(response.data);
          if(response.data.notes && Array.isArray(response.data.notes)) {
            setNotes(response.data.notes)
          } else {
            console.log("Unexpected response format:", response.data);
            setNotes([])
          }
    
        } catch (error) {
          console.error("Error fetching notes:", error);
        } finally {
          setLoading(false)
        }
          
      }


      const deleteItem = async (id) => {
        if(!window.confirm("Are you sure you want to delete this note?")) {
          return;
          }

          try {
            const response = await axios.delete(`https://notepad-69yg.vercel.app/save/${id}`)
            console.log("Delete response:", response.data);

            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id))
          } catch (error) {
            console.error("Error deleting note:", error);
            alert("Failed to delete note. Please try again.")
          }
        }



    const editItem = async (id) => {
      const noteToEdit = notes.find((note) => note._id === id);

      if(noteToEdit) {
        formik.setValues({
          title: noteToEdit.title,
          content: noteToEdit.content,
          date: new Date(noteToEdit.date).toISOString().split("T")[0]
        })
        setFileReceived(noteToEdit.fileReceived);
        setEditingNoteId(id);
      }
    }




  return (
    <>
    <div className='form-control container-fluid w-50 p-3 border border-2 rounded-3 shadow-sm bg-transparent heroContent'>
    <div className='bg-transparent opacity-100 mb-4'>
            <h1 className='text-center text-info border border-2 border-info rounded-5 shadow-sm' style={{height: "55px"}}>Write</h1>
        </div>
    <hr />

    <form action="" onSubmit={formik.handleSubmit} className='mt-4 mb-2'>

    <div className="form-floating mb-3">
        {formik.touched.title && formik.errors.title && (<div className="alert alert-danger p-2 align-center text-center">{formik.errors.title}</div>)}
        <input className="form-control" name='title' onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur}/>
        <label>Title</label>
      </div>

      <div className="form-floating mb-3">
        {formik.touched.content && formik.errors.content && (<div className="alert alert-danger p-2 align-center text-center">{formik.errors.content}</div>)}
        <textarea className="form-control" name='content' onChange={formik.handleChange} value={formik.values.content} onBlur={formik.handleBlur} style={{height: "160px"}} />
        <label>Messages</label>
      </div>

      <div className='row'>
      <div className="form-floating mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
      {formik.touched.date && formik.errors.date && (<div className="alert alert-danger p-2 text-center">{formik.errors.date}</div>)}
      <input type="date" className="form-control" name='date' onChange={formik.handleChange} value={formik.values.date} onBlur={formik.handleBlur}/>
      </div>


      <div className="form-floating mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
      <input type="file" className="form-control mb-3" name='image' onChange={handleFileChange} value={formik.values.image} onBlur={formik.handleBlur}/>
      </div>

      </div>
      <button type='submit' className='btn btn-info w-50 text-light' disabled={loadingImage || !fileReceived}>{editingNoteId ? "Update Note" : loadingImage ? "Uploading..." : "Save"}</button>
      </form>
      
      </div>


        <div className='text-center mt-5'>
          <hr/>
          <h2>My Notes</h2>
          <hr/>

      <div className='row p-4'>

      {loading ? (<p>Loading Data...</p>) : notes.length === 0 ? (<h5 className='fst-italic'><marquee>Notes are displayed here</marquee></h5>) : 
        (notes.map((note, index) => (
          <div key={index} className='col-12 col-lg-4 col-xl-4'>
          <div className="card mb-5 mx-auto ps-1 text-start" style={{width: "20rem"}}>
          <img src={note.fileReceived} className="card-img-top" alt="..."/>
          <hr/>
          <div className="card-body">
          <h3 className="card-title">Title: {note.title}</h3>
          <p className="card-text">Content: {note.content}</p>
          <p className="card-text fst-italic">Date: {new Date(note.date).toDateString()}</p>
          <div className='d-flex gap-3'>
            <button className='btn btn-danger' onClick={() => deleteItem(note._id)}>Delete</button>
            <button className='btn btn-warning' onClick={() => editItem(note._id)}>Edit</button>
          </div>
          </div>
          <hr/>
          </div>
          </div>
        ))
      )}
      </div>
      </div>

      
    </>
  )
}

export default Hero