import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNote, allNotes, getNote, updateNoteApi, deleteNoteApi } from "../api/notesApi";

export const getNotes =  createAsyncThunk('Notes/setNotes', async () => {
    return await allNotes()
} ) 

export const getSingleNote = createAsyncThunk('Notes/getSingleNote', 
    async (id) => {
        return await getNote(id)
    }
)

export const createNote = createAsyncThunk('Notes/createNote', 
    async (data) => {
        return await addNote(data)
    }
)

export const updateNote = createAsyncThunk('Notes/updateNote', 
    async ({id, Note, last_updated}) => {
        return await updateNoteApi({id, Note, last_updated})
    }

)

export const deleteNote = createAsyncThunk('Notes/deleteNote',   
    async(id) => {
       return await deleteNoteApi(id)
    }
)

const NotesSlice = createSlice({
    name: 'Notes',
    initialState: {
        List: [],
        getNoteIsPending: true,
        getAllNotesIsPending: true,
        selectedNote: null,
        getError: false,
        noteCreated: null,
        noteDeleted: null,
        noteUpdated: null,
        createError: false,
        deleteError: false,
        updateError: false,
    },
    
        extraReducers: {
            [getNotes.pending]: (state) => {
                return {
                    ...state,
                    getAllNotesIsPending: true,
                    selectedNote: null,
                    getNoteIsPending: true
                }
                
            },

            [getNotes.fulfilled]: (state, {payload}) => {
              return {
                  ...state,
                  List: payload,
                  getAllNotesIsPending: false,
                  selectedNote: null,
                  getNoteIsPending: true
              }
            },

            [getNotes.rejected]: (state => {
                return {
                    ...state,
                    getAllNotesIsPending: true,
                    getError: true
                }
            }),

            [getSingleNote.pending]: (state) => {
                return {
                    ...state,
                    getNoteIsPending: true,
                    getAllNotesIsPending: true
                }
            },

            [getSingleNote.fulfilled]: (state, action) => {
                return {
                    ...state,
                    selectedNote: action.payload,
                    getNoteIsPending: false,
                    noteCreated: false
                }
            },

            [getSingleNote.rejected]: (state, action) => {
                return {
                    ...state,
                    getError: true,
                    getNoteIsPending: true
                }
            },

            [createNote.pending]: (state, action) => {
                return {
                    ...state,
                    noteCreated: false
                }
            },

            [createNote.fulfilled]: (state, action) => {
                return {
                    ...state,
                    noteCreated: true,
                    createError: false
                }
            },

            [createNote.rejected]: (state, action) => {
                return {
                    ...state,
                    noteCreated: false,
                    createError: true
                }
            },

            [updateNote.fulfilled]: (state) => {
                return {
                    ...state,
                    noteUpdated: true
                }
            },

            [updateNote.rejected]: (state, action) => {
                return {
                    ...state,
                    noteUpdated: false
                }
            },

            [deleteNote.pending]: (state, action) => {
                return {
                    ...state,
                    noteDeleted: false
                }
            },

            [deleteNote.fulfilled]: (state, action) => {
                return {
                    ...state,
                    noteDeleted: true
                }
            }
            
        }
})

export default NotesSlice.reducer;