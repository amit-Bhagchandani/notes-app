import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'react-uuid'
import { createNote } from '../../features/NotesSlice'
import { Navigate } from 'react-router-dom'
import { MdCancel } from 'react-icons/md'
import styles from './Modal.module.css'


const CreateModal = ({setOpen}) => {

    const[title, setTitle] = useState("")
    const[id, setId] = useState('')
    const dispatch = useDispatch()
    const { noteCreated, createError } = useSelector(state => state)

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = uuid()
        setId(id)
        const created_at = new Date().toLocaleString()
        const last_updated = created_at
        dispatch(createNote({title,Note: null, id, created_at, last_updated})) 
    }


  return (
    <div className = {styles.Modal}>
        <form className='form' onSubmit={handleSubmit}>
        <div className= {styles.cancle} onClick={() => setOpen(false)}><MdCancel size='1.3rem' /></div>
          <div className='form-row'>
            <label className='form-label'>Title: </label>
            <input className='form-input' type='text' value={title} onChange={(e) => {setTitle(e.target.value)}} required />    
          </div>
          <div className='form-row'>
            <input type='submit' className='btn' value = 'Create'/>
          </div>
          { createError && <div className='error form-row'>Error while creating a Note</div> }
        </form>
        
        { noteCreated && <Navigate to = {`/notes/${id}`} />}

        
    </div>
  )
}

export default CreateModal