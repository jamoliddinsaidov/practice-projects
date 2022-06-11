import {
  saveNoteToLocalStorage,
  getNotesFromLocalStorage,
  getNoteByIdFromLocalStorage,
  deleteNoteFromLocalStorage,
  editNoteFromLocalStorage,
} from './localStorage.js'
import { generateId, getNoteTitle } from './utils.js'

function createNote(markedNote, noteText) {
  const noteObj = {
    id: generateId(),
    createdDate: new Date(),
    title: getNoteTitle(noteText),
    markedNote,
    noteText,
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

function editNote(id, markedNote, noteText) {
  const noteObj = {
    createdDate: new Date(),
    title: getNoteTitle(noteText),
    id,
    markedNote,
    noteText,
  }

  editNoteFromLocalStorage(noteObj)
}

export { createNote, getAllNotes, getNoteById, deleteNote, editNote }
