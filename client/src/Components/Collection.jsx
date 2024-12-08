// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import '../App.css'

// const Collection = () => {

//     const [loading, setLoading] = useState(true);
//     const [notes, setNotes] = useState([])
//     const [editingNoteId, setEditingNoteId] = useState(null)
//     const [expandedNoteId, setExpandedNoteId] = useState(null)
//     const userEmail = localStorage.getItem('userEmail')


//     useEffect(() => {
//         const fetchNotes = async () => {
//             try {
//               const response = await axios.get(`http://localhost:8080/save/${userEmail}`);
//               setNotes(response.data.notes);
//             } catch (error) {
//               console.error("Error fetching notes:", error);
//             } finally {
//               setLoading(false);
//             }
//           };
          
//           fetchNotes();
//     }, [userEmail])



//     const handleCardClick = (id) => {
//         setExpandedNoteId(id)
//       }
  
//       const closeExpandedView = () => {
//         setExpandedNoteId(null)
//       }


//       const exportNoteAsPDF = async (note) => {

//         const doc = new jsPDF();
  
        
//         doc.setFontSize(18);
//         doc.text(note.title, 10, 20);
  
//         doc.setFont('times', 'italic')
//         doc.setFontSize(12);
//         doc.text(`Date: ${new Date(note.date).toDateString()}`, 10, 30, { align: 'left' }, {textStyle: 'bold'}, {fontStyle: 'bold'});
  
//         doc.setFont('times', 'normal')
//         doc.setFontSize(12);
//         doc.text("Content:", 10, 40)
  
//         // const contentTextWidth = doc.getTextWidth("Content:");
//         // const startX = 10;
//         // const startY = 41;
//         // const endX = startX + contentTextWidth;
//         // doc.line(startX, startY, endX, startY);
  
  
//         doc.setFont('times', 'normal')
//         doc.setFontSize(12);
//         doc.text(note.content, 10, 50, { maxWidth: 180 }, { align: 'center' }, { lineHeightFactor: 1.5 }, { charSpace: 1.0 }, { wordBreak: 'break-all' }, { wordWrap: 'break-word' });
  
  
  
  
//         if (note.fileReceived) {
          
//           try{
           
//             const base64Image = await fetchImageAsBase64(note.fileReceived);
//             // console.log(base64Image);
            
  
//             const format = base64Image.split(';')[0].split('/')[1];
  
//             if (format === 'avif') {
//               console.warn('AVIF format is not supported for PDF export. Skipping image.')
//               return;
//             }
  
//             doc.addImage(base64Image, format.toUpperCase(), 10, 70, 120, 150);
//           } catch (error){
//             console.log("Failed to load image for PDF:", error)
//           }
          
//         }
  
        
        
//         doc.save(`${note.title}.pdf`);
//       }
  
  
//       const fetchImageAsBase64 = async (url) => {
      
//           try {
//             const response = await fetch(url);
//             const blob = await response.blob();
//             return new Promise((resolve, reject) => {
//               const reader = new FileReader();
//               reader.onloadend = () => resolve(reader.result);
//               reader.onerror = reject;
//               reader.readAsDataURL(blob);
//             })
//           } catch (error) {
//             throw new Error("Error fetching or converting Image:" + error.message)
//           }
  
//       }



//       const deleteItem = async (id) => {
//         if(!window.confirm("Are you sure you want to delete this note?")) {
//           return;
//           }

//           try {
//             const response = await axios.delete(`http://localhost:8080/save/${id}`)
//             console.log("Delete response:", response.data);

//             setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id))
//           } catch (error) {
//             console.error("Error deleting note:", error);
//             alert("Failed to delete note. Please try again.")
//           }
//         }



//     const editItem = async (id) => {
//       const noteToEdit = notes.find((note) => note._id === id);

//       if(noteToEdit) {
//         formik.setValues({
//           title: noteToEdit.title,
//           content: noteToEdit.content,
//           date: new Date(noteToEdit.date).toISOString().split("T")[0]
//         })
//         setFileReceived(noteToEdit.fileReceived);
//         setEditingNoteId(id);
        
//       }
//     }

  



//   return (
//     <>



// <div className='text-center mt-5'>
//           <hr/>
//           <h2>Collections</h2>
//           <hr/>

//       <div className='row p-4'>

//       {loading ? (<p>Loading Data...</p>) : notes.length === 0 ? (<h5 className='fst-italic'><marquee>Notes are displayed here</marquee></h5>) : 
//         (notes.map((note, index) => (
//           <div key={index} className='col-12 col-lg-4 col-xl-4'>
//           <div className="card mb-5 mx-auto ps-1 text-start" style={{width: "20rem", maxHeight: '100vh', maxWidth: "100%", objectFit: "cover"}}>
//           <img src={note.fileReceived} className={ note.fileReceived ? "card-img-top" : "d-none"} alt="..." style={{maxHeight: "50vh", objectFit: "cover"}} onClick={() => handleCardClick(note._id)}/>
//           <hr/>
//           <div className="card-body">
//           <h3 className="card-title" onClick={() => handleCardClick(note._id)}>{note.title}</h3>
//           <p className="card-text" style={{maxHeight: "30px", overflow: "hidden"}} onClick={() => handleCardClick(note._id)}>Content: {note.content}</p>
//           <p className="card-text fst-italic" onClick={() => handleCardClick(note._id)}>Date: {new Date(note.date).toDateString()}</p>
//           <div className='d-flex gap-3'>
//             <button className='btn btn-danger' onClick={() => deleteItem(note._id)}>Delete</button>
//             <button className='btn btn-warning me-4' onClick={() => editItem(note._id)}>Edit</button>
//             <button className='btn btn-info text-light' onClick={() => exportNoteAsPDF(note)}><i className="bi bi-filetype-pdf"></i></button>
//             <button className='btn btn-secondary text-light' onClick={() => exportNoteAsText(note)}><i className="bi bi-filetype-txt"></i></button>
//           </div>
//           <hr className='mb-0'/>
//           </div>
//           </div>
//           </div>
//         ))
//       )}
//       </div>

//       { expandedNoteId && (

//         <div className='expanded-card'>
//           <div className='overlay' onClick={closeExpandedView}></div>
//           <div className='expanded-content'>
//             <button className='close-btn' onClick={closeExpandedView}><i className="bi bi-x-lg"></i></button>

//             {notes.filter((note) => note._id === expandedNoteId).map((note) => (
            
//                 <div key={note._id} className='full-card'>
//                   <img src={note.fileReceived} className={ note.fileReceived ? "d-inline" : "d-none"} alt='Note' style={{maxWidth: "100%", maxHeight: "60vh", objectFit: "cover"}}/>
//                   <h2 className='mt-3'>{note.title}</h2>
//                   <p>{note.content}</p>
//                   <p className='fst-italic'>Date: {new Date(note.date).toDateString()}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//         )}
//       </div>


//     </>
//   )
// }

// export default Collection