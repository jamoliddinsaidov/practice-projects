function removeClass(element, classes) {
  if (Array.isArray(classes)) element.classList.remove(...classes)

  element.classList.remove(classes)
}

function addClass(element, classes) {
  if (Array.isArray(classes)) element.classList.add(...classes)

  element.classList.add(classes)
}

function generateId() {
  return Math.random().toString().slice(3, 9)
}

function getNoteTitle(noteText) {
  if (noteText.length < 15) return noteText

  return noteText.slice(0, 12) + '...'
}

function getNoteId(e) {
  return e.target.dataset.noteid
}

export { removeClass, addClass, generateId, getNoteTitle, getNoteId }
