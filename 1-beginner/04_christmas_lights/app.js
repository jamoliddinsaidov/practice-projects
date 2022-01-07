const onBtn = document.querySelector('.on-btn')
const offBtn = document.querySelector('.off-btn')
const runBtn = document.querySelector('.run-btn')
const rangeInput = document.querySelector('.range-input')
const errorTxt = document.querySelector('.error-text')
const lightbulbs = document.querySelectorAll('.lightbulb')
const bgColors = [
  'bg-red-500',
  'bg-yellow-500',
  'bg-cyan-500',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-cyan-500',
  'bg-green-500',
]
const shadowColors = [
  'shadow-red-500',
  'shadow-yellow-500',
  'shadow-cyan-500',
  'shadow-green-500',
  'shadow-red-500',
  'shadow-yellow-500',
  'shadow-cyan-500',
  'shadow-green-500',
]
const defaultBgColor = 'bg-neutral-900'
let range = 2
let isOddTurn = true
let isRunning = false
let timerID

// event listeners
onBtn.addEventListener('click', turnOnLightbulbs)
offBtn.addEventListener('click', turnOffLightbulbs)
runBtn.addEventListener('click', () => {
  let currRange = +rangeInput.value

  if (currRange > 0 && currRange <= 5 && isRunning) {
    range = currRange
    stopAnimation()
    startAnimation()
  } else if (!isRunning) {
    showErrorMsg('lights are off')
  } else {
    showErrorMsg('please enter numbers between 1 and 5')
  }
})

// functions
function turnOnLightbulbs() {
  if (!isRunning) {
    lightbulbs.forEach((bulb, index) => {
      changeClasses(bulb, defaultBgColor, bgColors[index])
    })

    isRunning = !isRunning
    startAnimation()
  }
}

function turnOffLightbulbs() {
  if (isRunning) {
    lightbulbs.forEach((bulb, index) => {
      changeClasses(bulb, bgColors[index], defaultBgColor)
      changeClasses(bulb, shadowColors[index])
    })

    isRunning = !isRunning
    stopAnimation()
  }
}

function startAnimation() {
  timerID = setInterval(() => {
    if (isOddTurn) {
      lightbulbs.forEach((bulb, index) => {
        if (index % 2 !== 0) animateShadow(bulb, index)
      })
    } else {
      lightbulbs.forEach((bulb, index) => {
        if (index % 2 === 0) animateShadow(bulb, index)
      })
    }

    isOddTurn = !isOddTurn
  }, range * 200)
}

function stopAnimation() {
  clearInterval(timerID)
}

function animateShadow(bulb, index) {
  changeClasses(bulb, '', shadowColors[index])

  setTimeout(() => {
    changeClasses(bulb, shadowColors[index])
  }, 250)
}

function changeClasses(element, removedClass, addedClass) {
  if (removedClass) element.classList.remove(removedClass)
  if (addedClass) element.classList.add(addedClass)
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
