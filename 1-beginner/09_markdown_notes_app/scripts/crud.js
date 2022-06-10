import {
  saveNoteToLocalStorage,
  getNotesFromLocalStorage,
  getNoteByIdFromLocalStorage,
  deleteNoteFromLocalStorage,
} from './localStorage.js'
import { generateId, getNoteTitle } from './utils.js'

function createNote(markedNote, noteText) {
  const noteObj = {
    id: generateId(),
    createdDate: new Date(),
    title: getNoteTitle(noteText),
    markedNote,
  }

  saveNoteToLocalStorage(noteObj)
}

function getAllNotes() {
  const notes = getNotesFromLocalStorage()

  return notes
}

function getNoteById(id) {
  const note = getNoteByIdFromLocalStorage(id)

  return note
}

function deleteNote(id) {
  deleteNoteFromLocalStorage(id)
}

export { createNote, getAllNotes, getNoteById, deleteNote }
