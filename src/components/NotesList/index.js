import React from 'react'
import { useDispatch } from 'react-redux'
import NoteListItem from '../NoteListItem'
import styles from './NoteList.module.css'
import { deleteNote } from '../../features/NotesSlice'

const NotesList = ({Notes}) => {
  /* get all notes from the state and map through all of them and return listitem component pass id and title as a prop */
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteNote(id))
  }

  return (
    <>
      <div className={styles.listHeader}>
          <p>Note</p>
          <p className={styles.tohide} >created at</p>
          <p className={styles.tohide} >Last updated</p>
          <p> Edit</p>
          <p></p>  
      </div>  

      <ul className={styles.NoteList}>
        {Notes.map(item => <NoteListItem Note ={item} key={item.id} handleDelete = { handleDelete }/>)}
        {Notes.length == 0 && <li className={styles.searchNotFound}>Not Found</li>}
      </ul>
    </>
  )
}

export default NotesList