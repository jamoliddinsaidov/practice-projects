import { createNote, getAllNotes } from './crud.js'
import { removeClass, addClass, getNoteTitle, createElement } from './utils.js'

// Selectors
const noteInput = document.querySelector('#note-input')
const notePreview = document.querySelector('#note-preview')
const navLinks = document.querySelectorAll('nav a')
const formContainer = document.querySelector('form')
const notesListContainer = document.querySelector('#notes-list-container')
const notesPageLink = document.querySelector('#notes')
const createPageLink = document.querySelector('#create')
const formBtn = document.querySelector('#form-btn')

// Event Listeners
window.addEventListener('DOMContentLoaded', renderDefaultPage)
noteInput.addEventListener('input', renderPreview)
formBtn.addEventListener('click', submitForm)
navLinks.forEach((navLink) => navLink.addEventListener('click', changePages))

// Functions
function renderDefaultPage(e) {
  const pageId = e.target.location.hash

  if (pageId.includes('notes')) renderNotesListPage()
  else renderCreatePage()
}

function renderPreview(e) {
  const { value } = e.target
  const parsedValue = marked.parse(value)
  notePreview.innerHTML = parsedValue
}

function submitForm(e) {
  e.preventDefault()
  createNote(noteInput.value)
}

function changePages(e) {
  const pageId = e.target.id

  if (pageId === 'notes') renderNotesListPage()
  else if (pageId === 'create') renderCreatePage()
}

function renderCreatePage() {
  removeClass(notesPageLink, 'active-link')
  removeClass(formContainer, 'hide')
  addClass(notesListContainer, 'hide')
  addClass(createPageLink, 'active-link')
}

function renderNotesListPage() {
  removeClass(createPageLink, 'active-link')
  removeClass(notesListContainer, 'hide')
  addClass(formContainer, 'hide')
  addClass(notesPageLink, 'active-link')

  toggleNotesEmptyMsg()
  renderNotesList()
}

function renderNotesList() {
  const notesListContainer = document.querySelector('#notes-list')
  const notes = getAllNotes()

  if (notesListContainer.childElementCount === notes.length) {
    return
  }
  notesListContainer.innerHTML = ''

  let notesTemplate = ''
  notes.forEach(({ noteText, id }) => {
    const noteTitle = getNoteTitle(noteText)

    notesTemplate += `<li data-id=${id}>
        <p>${noteTitle}</p>                        
        <div>
          <button class="mr-6"><img src="./images/eye-solid.svg" alt="view"/></button>
          <button class="mr-6"><img src="./images/pencil-solid.svg" alt="edit"/></button>
          <button><img src="./images/trash-solid.svg" alt="delete"/></button>
        </div>
      </li>`
  })

  notesListContainer.innerHTML = notesTemplate
}

function toggleNotesEmptyMsg() {
  const notesEmptyText = document.querySelector('#notes-list-container h3')
  const notes = getAllNotes()

  console.log(notes.length)

  if (notes.length) addClass(notesEmptyText, 'hide')
  else removeClass(notesEmptyText, 'hide')
}
