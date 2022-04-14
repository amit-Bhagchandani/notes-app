import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../../features/NotesSlice'
import NotesList from '../../components/NotesList'
import CreateModal from '../../components/CreateModal'
import Search from '../../components/Search'
import styles from './Home.module.css'

const Home = () => {
  
  const dispatch = useDispatch()

  const {getAllNotesIsPending, List, getError, noteDeleted } = useSelector((state) => state)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue ] = useState('') 

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch, noteDeleted])

  return (
    <main className='page'>
      <header className = {styles.homeNotesHeader}>
        <Search setSearchValue = {setSearchValue} />
        <button className={`btn ${styles.newNoteBtn}`} onClick={() => setOpen(true)}>Add Note</button>
      </header>
      <section>
       { !getAllNotesIsPending && 
            <NotesList Notes = {List.filter(note => note.title.toLowerCase().includes(searchValue))} /> 
       }
       { getAllNotesIsPending && !getError && <div className='loading'></div>}
       {
         getError && <div className='error'>Could not fetch the resource</div>
       }
      </section>  

      {open && <CreateModal setOpen ={setOpen} />}

    </main>
  )
}

export default Home