// Selectors & Variables
const wordsInput = document.getElementById('words-input')
const countBtn = document.getElementById('count-btn')
const table = document.querySelector('table')
const tableBody = document.querySelector('tbody')
const alertText = document.getElementById('alert-text')

// Event Listeners
wordsInput.addEventListener('input', handleWordsInputChange)

// Functions
function handleWordsInputChange(e) {
  console.log(e.target.value.length)

  if (e.target.value.length >= 2048) {
    showAlert()
    return
  }
}

function showAlert() {
  removeClass(alertText, 'opacity-0')

  setTimeout(() => {
    addClass(alertText, 'opacity-0')
  }, 3500)
}

function addClass(element, className) {
  element.classList.add(className)
}

function removeClass(element, className) {
  element.classList.remove(className)
}

function cleanInput(str) {
  return str
    .replace(/[?.!,"\(\)]/g, '')
    .replace(/[ ]{2,}/g, '')
    .trim()
    .toLowerCase()
}

// odd tr classes - hover:bg-zinc-300 bg-zinc-200
// even tr classes - hover:bg-zinc-300
// td classes - p-2 border text-lg
