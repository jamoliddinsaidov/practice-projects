const onBtn = document.querySelector('.on-btn')
const offBtn = document.querySelector('.off-btn')
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
let isOddTurn = true
let timerID

onBtn.addEventListener('click', turnOnLightbulbs)
offBtn.addEventListener('click', turnOffLightbulbs)

function turnOnLightbulbs() {
  lightbulbs.forEach((bulb, index) => {
    changeClasses(bulb, defaultBgColor, bgColors[index])
  })

  startAnimation()
}

function turnOffLightbulbs() {
  lightbulbs.forEach((bulb, index) => {
    changeClasses(bulb, bgColors[index], defaultBgColor)
    changeClasses(bulb, shadowColors[index])
  })

  stopAnimation()
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
  }, 500)
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
