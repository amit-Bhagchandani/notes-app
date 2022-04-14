import axios from "axios";

const notesApi = axios.create(
    {
        baseURL: "http://localhost:5000/"
    }
)

export const allNotes = async() => {
    const response =  await notesApi.get('notes')
    return response.data
}  

export const getNote = async(id) => {
    const response = await notesApi.get(`notes/${id}`)
    return response.data
}  

export const addNote = async(note) => {
    const response = await notesApi.post('notes', note)
    return response.data
}  

export const updateNoteApi = async({id, Note, last_updated}) => {
    const response = await notesApi.patch(`notes/${id}`, {Note, last_updated})
    return response.data
}  

export const deleteNoteApi = async(id) => {
    const response = await notesApi.delete(`notes/${id}`)
    return response.data
} 

