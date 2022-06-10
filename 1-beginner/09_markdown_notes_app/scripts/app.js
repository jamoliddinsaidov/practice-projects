import { createNote, getAllNotes, deleteNote, getNoteById } from './crud.js'
import { removeClass, addClass, getNoteTitle, getNoteId } from './utils.js'

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
  const markedNote = marked.parse(noteInput.value)
  const noteText = noteInput.value

  e.preventDefault()
  createNote(markedNote, noteText)
  showSuccessMsg()
  cleanup()
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

  notesListContainer.innerHTML = ''

  const notesTemplate = notes.reduce((template, { title, id }) => template + renderNoteTemplate(title, id), '')
  notesListContainer.innerHTML = notesTemplate

  // add event listeners to note btns
  const viewBtns = notesListContainer.querySelectorAll('#view-note-btn')
  const deleteBtns = notesListContainer.querySelectorAll('#delete-note-btn')

  viewBtns.forEach((btn) => btn.addEventListener('click', viewNoteHandler))
  deleteBtns.forEach((btn) => btn.addEventListener('click', deleteNoteHandler))
}

function renderNoteTemplate(title, id) {
  const template = `<li>
        <p>${title}</p>                        
        <div>
          <button id="view-note-btn" class="mr-6" data-noteid=${id}><img src="./images/eye-solid.svg" alt="view"/></button>
          <button class="mr-6"><img src="./images/pencil-solid.svg" alt="edit"/></button>
          <button id="delete-note-btn" data-noteid=${id}><img src="./images/trash-solid.svg" alt="delete"/></button>
        </div>
      </li>`

  return template
}

function toggleNotesEmptyMsg() {
  const notesEmptyText = document.querySelector('#notes-list-container h3')
  const notes = getAllNotes()

  if (notes.length) addClass(notesEmptyText, 'hide')
  else removeClass(notesEmptyText, 'hide')
}

function viewNoteHandler(e) {
  const noteId = getNoteId(e)
  const note = getNoteById(noteId)

  // select all the single note related elements
  const viewNoteContainer = document.querySelector('#single-note-container')
  const viewNoteContent = viewNoteContainer.querySelector('.single-note-content')
  const closeBtn = document.querySelector('.single-note-close-btn')

  // insert content into note container
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  const createdDate = new Date(note.createdDate).toLocaleDateString('en-En', dateOptions)
  const createdDateTemplate = `<p><strong>Created at:</strong> ${createdDate}</p>`

  viewNoteContent.insertAdjacentHTML('afterbegin', createdDateTemplate)
  viewNoteContent.insertAdjacentHTML('beforeend', note.markedNote)
  addClass(viewNoteContainer, 'show-single-note-container')

  // single note related listeners
  closeBtn.addEventListener('click', () => {
    removeClass(viewNoteContainer, 'show-single-note-container')
    viewNoteContent.innerHTML = ''
  })
}

function deleteNoteHandler(e) {
  const noteId = getNoteId(e)
  deleteNote(noteId)
  renderNotesList()
  toggleNotesEmptyMsg()
}

function showSuccessMsg() {
  const succesMsgText = document.querySelector('.note-created-msg')
  removeClass(succesMsgText, 'hide')

  setTimeout(() => {
    addClass(succesMsgText, 'hide')
  }, 1500)
}

function cleanup() {
  noteInput.value = ''
  notePreview.innerHTML = ''
}
