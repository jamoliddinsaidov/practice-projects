function removeClass(element, classes) {
  if (Array.isArray(classes)) element.classList.remove(...classes)

  element.classList.remove(classes)
}

function addClass(element, classes) {
  if (Array.isArray(classes)) element.classList.add(...classes)

  element.classList.add(classes)
}

export { removeClass, addClass }
