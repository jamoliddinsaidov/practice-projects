function getNotesFromLocalStorage() {
  let notes

  if (!localStorage.getItem('notes')) notes = []
  else notes = JSON.parse(localStorage.getItem('notes'))

  return notes
}

function saveNoteToLocalStorage(note) {
  let notes = getNotesFromLocalStorage()
  notes.push(note)
  notes = JSON.stringify(notes)

  localStorage.setItem('notes', notes)
}

function getNoteByIdFromLocalStorage(id) {
  const notes = getNotesFromLocalStorage()
  const note = notes.find((n) => n.id == id)

  return note
}

function deleteNoteFromLocalStorage(id) {
  let notes = getNotesFromLocalStorage()
  notes = notes.filter((note) => note.id != id)

  localStorage.setItem('notes', JSON.stringify(notes))
}

function editNoteFromLocalStorage(noteObj) {
  const { id } = noteObj

  let notes = getNotesFromLocalStorage()
  notes = notes.map((note) => {
    if (note.id == id) note = noteObj

    return note
  })

  localStorage.setItem('notes', JSON.stringify(notes))
}

export {
  saveNoteToLocalStorage,
  getNotesFromLocalStorage,
  getNoteByIdFromLocalStorage,
  deleteNoteFromLocalStorage,
  editNoteFromLocalStorage,
}
