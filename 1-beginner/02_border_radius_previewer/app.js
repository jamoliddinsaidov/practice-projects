//selectors & variables
const inputs = document.querySelectorAll('input')
const box = document.querySelector('.box')
const resultTxt = document.querySelector('.result-textarea')
const copyBtn = document.querySelector('.copy-btn')
const alertTxt = document.querySelector('.alert-text')
let borderRadiusObj = {}
let radiusValue
let borderSide

// event listeners
inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    applyBorderRadius(e)
    generateCSS(e)
  })
})

copyBtn.addEventListener('click', copyToClipboard)

// functions
function applyBorderRadius(e) {
  radiusValue = e.target.value
  borderSide = e.target.name

  if (radiusValue >= 0 && radiusValue !== '') box.style[borderSide] = `${radiusValue}px`
  else box.style[borderSide] = '0px'
}

function generateCSS(e) {
  // add radius value in the global obj
  let borderSide = e.target.name
  constructBorderRadiusName(borderSide)

  // append css property into textarea
  let { name, value } = borderRadiusObj[borderSide]
  let cssContent = resultTxt.innerHTML

  if (cssContent.includes(name)) {
    let contentArr = cssContent.split('\n')
    cssContent = updatePreviousRadiusValue(contentArr, name, value)
  } else {
    cssContent += `${name}: ${value}px;\n`
  }

  resultTxt.innerHTML = cssContent
}

function constructBorderRadiusName(borderSide) {
  let radiusProps = borderSide.split(/[A-Z]/g)
  let index = 0

  radiusProps.forEach((prop, i) => {
    if (i > 0) {
      radiusProps[i] = borderSide[index].toLowerCase() + prop
      index += prop.length + 1
    } else {
      index += prop.length
    }
  })

  let radiusName = radiusProps.join('-')

  borderRadiusObj[borderSide] = {
    name: radiusName,
    value: radiusValue,
  }
}

function updatePreviousRadiusValue(contentArr, name, value) {
  let newContentArr = []

  contentArr.forEach((a) => {
    if (a.includes(name) && value === '') {
      newContentArr.push('')
    } else if (a.includes(name)) {
      newContentArr.push(`${name}: ${value}px;\n`)
    } else {
      newContentArr.push(a + '\n')
    }
  })

  newContentArr = newContentArr.filter((a) => a.trim() !== '')
  return newContentArr.join('')
}

function copyToClipboard() {
  if (resultTxt.value.length === 0) {
    showWarningMsg()
  } else {
    resultTxt.select()
    navigator.clipboard.writeText(resultTxt.value)
    showSuccessMsg()
  }
}

function showWarningMsg() {
  alertTxt.classList.remove('hidden')
  alertTxt.classList.add('text-red-500')
  alertTxt.innerText = "there's nothing to copy"

  setTimeout(() => {
    alertTxt.classList.remove('text-red-500')
    alertTxt.classList.add('hidden')
    alertTxt.innerText = ''
  }, 1000)
}

function showSuccessMsg() {
  alertTxt.classList.remove('hidden')
  alertTxt.classList.add('text-green-500')
  alertTxt.innerText = 'copied to clipboard'

  setTimeout(() => {
    alertTxt.classList.remove('text-green-500')
    alertTxt.classList.add('hidden')
    alertTxt.innerText = ''
  }, 1000)
}
