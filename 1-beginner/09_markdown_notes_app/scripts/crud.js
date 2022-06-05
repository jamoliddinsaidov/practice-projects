import {
  saveNoteToLocalStorage,
  getNotesFromLocalStorage,
  getNoteByIdFromLocalStorage,
  deleteNoteFromLocalStorage,
} from './localStorage.js'
import { generateId } from './utils.js'

function createNote(noteText) {
  const noteObj = {
    id: generateId(),
    createdDate: new Date(),
    noteText,
  }

  saveNoteToLocalStorage(noteObj)
}

function getAllNotes() {
  const notes = getNotesFromLocalStorage()

  return notes
}

function getNoteById(id) {
  const note = getNoteByIdFromLocalStorage()

  return note
}

function deleteNote(id) {
  deleteNoteFromLocalStorage(id)
}

export { createNote, getAllNotes, getNoteById, deleteNote }
