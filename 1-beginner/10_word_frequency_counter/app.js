// Selectors & Variables
const wordsInput = document.getElementById('words-input')
const countBtn = document.getElementById('count-btn')
const countTxt = document.getElementById('count-text')

// Event Listeners
wordsInput.addEventListener('input', handleWordsInputChange)
countBtn.addEventListener('click', handleCountBtnClick)

// Functions
function handleWordsInputChange(e) {
  const wordsCount = e.target.value.length
  countTxt.innerText = wordsCount

  if (wordsCount >= 4096) {
    showAlert()
  }
}

function handleCountBtnClick(e) {
  e.preventDefault()
  const words = cleanInput(wordsInput.value).split(' ')
  const countedWords = countWords(words)
  const orderedWords = orderInDescendingSequence(countedWords)
  renderTable(orderedWords)
}

function countWords(words) {
  const countedWords = {}

  for (const word of words) {
    const cleanWord = cleanInput(word)

    if (cleanWord in countedWords) {
      countedWords[cleanWord] = { ...countedWords[cleanWord], count: countedWords[cleanWord].count + 1 }
    } else {
      countedWords[cleanWord] = { value: word, count: 1 }
    }
  }

  return countedWords
}

function cleanInput(str) {
  return str
    .replace(/[?.!,"\(\)]/g, '')
    .replace(/[ ]{2,}/g, '')
    .replace(/\r?\n|\r/g, ' ')
    .trim()
    .toLowerCase()
}

function orderInDescendingSequence(words) {
  const wordValues = Object.values(words)
  return wordValues.sort((firstWord, secondsWord) => secondsWord.count - firstWord.count)
}

function renderTable(words) {
  const table = document.querySelector('table')
  const tableBody = document.querySelector('tbody')
  const tdClasses = ['p-2', 'border', 'text-lg']
  const oddTrClasses = ['hover:bg-zinc-300', 'bg-zinc-200']
  const evenTrClasses = ['hover:bg-zinc-300']

  tableBody.innerHTML = ''

  words.forEach((word, index) => {
    const { value, count } = word
    const tr = createElement('tr')

    const tdCount = createElement('td')
    tdCount.innerText = count
    addClass(tdCount, tdClasses)

    const tdWord = createElement('td')
    tdWord.innerText = value
    addClass(tdWord, tdClasses)

    if (index % 2 !== 0) {
      addClass(tr, evenTrClasses)
    } else {
      addClass(tr, oddTrClasses)
    }

    tr.appendChild(tdCount)
    tr.appendChild(tdWord)
    tableBody.appendChild(tr)
  })

  removeClass(table, 'opacity-0')
}

function showAlert() {
  const alertText = document.getElementById('alert-text')
  removeClass(alertText, 'opacity-0')

  setTimeout(() => {
    addClass(alertText, 'opacity-0')
  }, 3500)
}

function addClass(element, classNames) {
  if (Array.isArray(classNames)) {
    element.classList.add(...classNames)
  } else {
    element.classList.add(classNames)
  }
}

function removeClass(element, classNames) {
  if (Array.isArray(classNames)) {
    element.classList.remove(...classNames)
  } else {
    element.classList.remove(classNames)
  }
}

function createElement(elType) {
  return document.createElement(elType)
}
