// selectors
const inputArea = document.querySelector('.input-area')
const resultArea = document.querySelector('.result-area')
const convertBtn = document.querySelector('.convert-btn')
const copyBtn = document.querySelector('.copy-btn')
let headers = []
let values = []
let headerTemplate = {}
let json = []

// event listeners
convertBtn.addEventListener('click', () => {
  try {
    extractValues()
    setHeaders()

    let isValid = validateValues()

    if (isValid && !!values.length) {
      setValues()
      showResults()
    } else showAlertMsg('Please, provide correctly formatted CSV')
  } catch (error) {
    showAlertMsg('Please, fill the input area first')
  }
})

copyBtn.addEventListener('click', copyToClipboard)

// functions
function validateValues() {
  let valids = []
  let headersLength = headers.length

  values.forEach((value) => {
    if (headersLength === value.split(',').length) {
      valids.push(true)
    }
  })

  return valids.length === values.length
}

function extractValues() {
  let input = inputArea.value.split('\n').filter((value) => value)
  headers = input[0].split(',')
  values = input.slice(1, input.length)
  json = []
}

function setHeaders() {
  headers.forEach((header) => {
    headerTemplate[header] = ''
  })
}

function setValues() {
  values.forEach((value) => {
    // get headers and corresponding values
    let obj = { ...headerTemplate }
    let vals = value.split(',')
    let valIndex = 0

    for (key in obj) {
      obj[key] = vals[valIndex]
      valIndex++
    }

    json.push(obj)
  })
}

function showResults() {
  resultArea.value = JSON.stringify(json, null, 2)
  copyBtn.removeAttribute('disabled')
}

function showAlertMsg(msg) {
  const alertTxt = document.querySelector('.alert-text')

  alertTxt.innerText = msg
  alertTxt.classList.remove('opacity-0')
  alertTxt.classList.add('opacity-100')

  setTimeout(() => {
    alertTxt.classList.remove('opacity-100')
    alertTxt.classList.add('opacity-0')
  }, 2000)
}

function copyToClipboard() {
  resultArea.select()
  navigator.clipboard.writeText(resultArea.value)
  showAlertMsg('Copied to clipboard')
}
