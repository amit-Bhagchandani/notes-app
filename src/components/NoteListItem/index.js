import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './NoteListItem.module.css'
import { MdDelete, MdEdit } from 'react-icons/md'

const NoteListItem = ({ Note, handleDelete }) => {
  
  const Navigate = useNavigate()

  return ( 
      <li className= {styles.NoteItem}>
          <Link to ={`/notes/${Note.id}`}>
            <p>{Note.title}</p>
          </Link>
          <p className={styles.tohide} >{Note.created_at}</p>
          <p className={styles.tohide} >{Note.last_updated} </p>
          <div className={styles.btnWrapper}>
            <button className='btn' onClick={() => Navigate(`/notes/${Note.id}`)} >
              <MdEdit />
            </button>
          </div>
          <div className={styles.btnWrapper}>
            <button className={`btn ${styles.deleteBtn}`} onClick={() => handleDelete(Note.id)} ><MdDelete /></button>
          </div>   
      </li>
  )
}

export default NoteListItem