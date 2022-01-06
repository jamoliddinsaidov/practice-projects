// selectors & global variables
const buttonTxts = ['C', 'CA', '±', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '', '0', '=']
const classes = [
  'border',
  'border-cyan-100',
  'font-semibold',
  'text-2xl',
  'transition',
  'ease',
  'delay-50',
  'hover:bg-cyan-200',
  'hover:text-slate-900',
]
const calContainer = document.querySelector('.calculator-container')
const deleteBtn = document.querySelector('.delete-btn')
const resultTxt = document.querySelector('.result-text')
const errorTxt = document.querySelector('.error-text')
let calculator = { value1: '', value2: '', operator: '' }

// event listeners
window.addEventListener('DOMContentLoaded', () => {
  buttonTxts.map((text) => createBtn(text))
})

deleteBtn.addEventListener('click', () => {
  animateBtn(deleteBtn)
  removeLastDigit()
})

// functions
function createBtn(text) {
  // create btn, add content and class
  const btn = document.createElement('button')
  btn.innerText = text
  if (text) {
    classes.forEach((c) => btn.classList.add(c))
    if (btn.innerText === '=') btn.classList.add('col-span-2')
  }

  // get btn props
  let btnText = btn.innerText
  let isNumber = btnText.match(/[0-9]/g)
  let isOperator = btnText.match(/[+-/x]/g)

  // add listeners
  btn.addEventListener('click', () => {
    animateBtn(btn)

    if (resultTxt.innerText.length < 8 || btnText.match(/[+-/x=±.'C''CA']/g)) {
      implementCalculatorFunctions(btnText, isNumber, isOperator)
    } else {
      showErrorMsg("You can't enter more than 8 digits")
    }
  })

  calContainer.appendChild(btn)
}

function implementCalculatorFunctions(btnText, isNumber, isOperator) {
  let { value1, value2, operator } = calculator

  if (btnText === 'CA') {
    clearEverything()
  } else if (btnText === 'C') {
    clearCurrentInput()
  } else if (btnText === '=' && value1 && value2) {
    let result = calculate(calculator)
    resultTxt.innerText = result
    restoreCalcValues(result)
  } else if (isNumber && !value2 && !operator) {
    changeCalcValue1(btnText)
  } else if (value1 && isOperator) {
    changeCalcOperator(btnText)
  } else if (isNumber && value1) {
    changeCalcValue2(btnText)
  } else if (btnText === '±' && value1 && operator) {
    changeCalcValue2Sign(value2)
  } else if (btnText === '±' && !value2 && !operator) {
    changeCalcValue1Sign(value1)
  } else if (btnText === '.' && value1 && operator && !value2.includes('.')) {
    changeCalcValue2(btnText)
  } else if (btnText === '.' && !value2 && !operator && !value1.includes('.')) {
    changeCalcValue1(btnText)
  }
}

function calculate({ value1, value2, operator }) {
  if (value2.includes('0')) {
    showErrorMsg("That's not gonna happen :)")
    return ''
  }

  value1 = parseInt(value1)
  value2 = parseInt(value2)
  let result

  switch (operator) {
    case '+':
      result = value1 + value2
      break
    case '-':
      result = value1 - value2
      break
    case 'x':
      result = value1 * value2
      break
    case '/':
      result = value1 / value2
      if (isFloat(result)) result = result.toFixed(2)
      break
    default:
      result = ''
      break
  }

  if (result > 99999999) {
    showErrorMsg('Operation result exceeded 8 digits\nEverything is cleared')
    clearEverything()
    return ''
  }

  return result
}

function changeCalcValue1(value, isReset) {
  if (isReset || resultTxt.innerText === '0') calculator.value1 = value
  else calculator.value1 += value
  resultTxt.innerText = calculator.value1
}

function changeCalcValue2(value, isReset) {
  if (isReset || resultTxt.innerText === '0') calculator.value2 = value
  else calculator.value2 += value
  resultTxt.innerText = calculator.value2
}

function changeCalcOperator(value) {
  calculator.operator = value
  resultTxt.innerText = calculator.value2
}

function restoreCalcValues(value) {
  calculator.value1 = value
  calculator.value2 = ''
  calculator.operator = ''
}

function clearEverything() {
  changeCalcValue1('', true)
  changeCalcValue2('', true)
  changeCalcOperator('')
}

function clearCurrentInput() {
  if (calculator.value1 && calculator.operator && calculator.value2) changeCalcValue2('', true)
  else if (calculator.operator && calculator.value1 && !calculator.value2) changeCalcOperator('')
  else if (calculator.value1 && !calculator.operator && !calculator.value2) changeCalcValue1('', true)
}

function removeLastDigit() {
  if (calculator.operator && !calculator.value2) {
    calculator.value1.length = calculator.value2.slice(0, calculator.value2.length - 1)
    resultTxt.innerText = calculator.value2
  } else if (!calculator.operator && calculator.value1) {
    calculator.value1 = calculator.value1.slice(0, calculator.value1.length - 1)
    resultTxt.innerText = calculator.value1
  }
}

function changeCalcValue1Sign(value1) {
  if (value1.includes('-')) changeCalcValue1(value1.slice(1, value1.length), true)
  else changeCalcValue1('-' + value1, true)
}

function changeCalcValue2Sign(value2) {
  if (value2.includes('-')) changeCalcValue2(value2.slice(1, value2.length), true)
  else changeCalcValue2('-' + value2, true)
}

function animateBtn(btn) {
  btn.classList.add('scale-90')

  setTimeout(() => {
    btn.classList.remove('scale-90')
  }, 80)
}

function showErrorMsg(msg) {
  errorTxt.innerText = msg
  errorTxt.classList.remove('opacity-0')
  errorTxt.classList.add('opacity-100')

  setTimeout(() => {
    errorTxt.classList.remove('opacity-100')
    errorTxt.classList.add('opacity-0')
  }, 2000)
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0
}
