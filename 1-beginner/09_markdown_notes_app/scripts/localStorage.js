function saveNoteToLocalStorage(note) {
  let notes = getNotesFromLocalStorage()
  notes.push(note)
  notes = JSON.stringify(notes)

  localStorage.setItem('notes', notes)
}

function getNotesFromLocalStorage() {
  let notes

  if (!localStorage.getItem('notes')) notes = []
  else notes = JSON.parse(localStorage.getItem('notes'))

  return notes
}

export { saveNoteToLocalStorage, getNotesFromLocalStorage }
