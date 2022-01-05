// selectors
const userInput = document.querySelector('.user-input')
const convertBtn = document.querySelector('.convert-btn')
const resultTxt = document.querySelector('.result-text')
const errorTxt = document.querySelector('.error-text')

// event listeners
convertBtn.addEventListener('click', () => {
  let input = userInput.value
  let isValid = validateUserInput(input)

  if (isValid) {
    let result = parseInt(input, 2)
    showResult(input, result)
    userInput.value = ''
  } else {
    resultTxt.classList.add('hidden')
  }
})

userInput.addEventListener('input', (e) => {
  let input = e.target.value
  validateUserInput(input)
})

// functions
function showError(msg) {
  resultTxt.classList.add('hidden')
  errorTxt.classList.remove('hidden')
  errorTxt.innerText = msg
}

function hideError() {
  errorTxt.classList.add('hidden')
  errorTxt.innerText = ''
}

function validateUserInput(input) {
  let isValid = false

  if (input.length >= 8) {
    showError('You can enter up to 8 binary digits')
  } else if (input.toString().match(/[2-9]/g)) {
    showError('Please enter only 0 or 1')
  } else {
    hideError()
    isValid = true
  }

  return isValid
}

function showResult(input, result) {
  resultTxt.classList.remove('hidden')
  resultTxt.innerText = `${input} => ${result}`
}
