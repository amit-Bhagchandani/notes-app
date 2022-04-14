import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { getSingleNote, updateNote } from '../../features/NotesSlice';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { MdArrowBack, MdSave } from 'react-icons/md'
import styles from './NotePage.module.css'

const SingleNotePage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { getNoteIsPending, selectedNote, getError, noteUpdated } = useSelector(state => state)
  const [changesMade, setChangesMade] = useState(false)
  const quillRef = useRef(null)
  const navigate = useNavigate()
  const [back, setBack] = useState(false)

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot" // #5 Optinal if using custom formats
  ];

  const TOOLBAR_OPTIONS = 
  {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["image", "blockquote", "code-block"],
    ]
  }

  const quillOnChange = (editor) => {
    setChangesMade(true)
  }

  const handleSave = () => {
    if(changesMade)
    {
      const Note = quillRef.current.editor.getContents();
      const last_updated = new Date().toLocaleString()
      dispatch(updateNote({id, Note: Note, last_updated}))
      setChangesMade(false)
    }
  }

  useEffect(() => {
    dispatch(getSingleNote(id))
  }, [dispatch, noteUpdated])

  return (
  <main className='page'>
   {
    !getNoteIsPending && (
        <>
          <header className={styles.notePageHeader}>

            <button className='btn' onClick={() => { if(changesMade) { handleSave(); setBack(true) } else {navigate('/')} }}>
              <MdArrowBack />
            </button>
            
            { back && noteUpdated && <Navigate to ='/' /> }

            <h4 className='title'>{selectedNote.title}</h4>

            <button className='btn hipster-btn' onClick={handleSave}>
              <MdSave />
            </button>

          </header>

          <section className={styles.notesContainer}>
            <ReactQuill theme='snow' defaultValue ={ selectedNote.Note }  modules = { TOOLBAR_OPTIONS } onChange={quillOnChange} ref = {quillRef} />
          </section>

        </> 
      )
  }

   { getNoteIsPending && !getError && <div className='loading'></div> }

   { getError && <div className='error'>Could not Fetch the Resouce</div> }

  </main>
   
  )
}

export default SingleNotePage