import { saveNoteToLocalStorage, getNotesFromLocalStorage } from './localStorage.js'
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

export { createNote, getAllNotes }
