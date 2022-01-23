// selectors and vars
const inputs = document.getElementsByTagName('input')
const startBtn = document.querySelector('.start-btn')
const daysTxt = document.querySelector('.days-text')
const hoursTxt = document.querySelector('.hours-text')
const minutesTxt = document.querySelector('.minutes-text')
const secondsTxt = document.querySelector('.seconds-text')
let eventDetails = { name: '', date: '', time: '' }
let countdownDetails = { days: 0, hours: 0, minutes: 0, seconds: 0 }
let timerID = 0

// event listeners
startBtn.addEventListener('click', startCountDown)

// functions
function startCountDown(e) {
  e.preventDefault()
  let isValid = validateValues()

  if (isValid) {
    // execute actions
    setEventDetails(e)
    calculateLeftDays()
    renderTimeDetails()
    showCountDownContainer()
    countDown()
    finishCountDown()
  }
}

function setEventDetails(e) {
  for (let { name, value } of inputs) {
    eventDetails[name] = value
  }
}

function validateValues() {
  let isValid = false

  if (!inputs[0].value) {
    showErrorMsg('Please provide an event name')
  } else if (!inputs[2].value || !inputs[1].value) {
    showErrorMsg('Please provide a correct time period')
  } else if (constructDate(inputs[1].value, inputs[2].value) <= new Date()) {
    showErrorMsg('Please provide a date in the future')
  } else {
    isValid = true
  }

  return isValid
}

function constructDate(date, time) {
  if (time) {
    let [year, month, day] = splitDate(date)
    let [hours, minutes] = time.split(':')
    return new Date(year, month, day, hours, minutes)
  }

  let [year, month, day] = splitDate(date)
  return new Date(year, month, day)
}

function splitDate(date) {
  let [year, month, day] = date.split('-')
  month = +month > 0 ? +month - 1 : month

  return [year, month, day]
}

function calculateLeftDays() {
  const { date, time } = eventDetails
  const currentDate = new Date()
  const futureDate = constructDate(date, time)

  // calculate hours, mins, secs
  let hoursDiff = futureDate.getHours() - currentDate.getHours()
  let hours = hoursDiff < 0 ? 24 - Math.abs(hoursDiff) : hoursDiff

  let minutesDiff = futureDate.getMinutes() - currentDate.getMinutes()
  let minutes = minutesDiff

  if (minutesDiff < 0) {
    hours = hours - 1 > 0 ? hours - 1 : 0
    minutes = 60 - Math.abs(minutesDiff)
  }

  let secondsDiff = futureDate.getSeconds() - currentDate.getSeconds()
  let seconds = secondsDiff <= 0 ? 59 - Math.abs(secondsDiff) : secondsDiff

  // calcuate days
  let yearsDiff = futureDate.getFullYear() - currentDate.getFullYear()
  let years = yearsDiff * 365

  let monthsDiff = futureDate.getMonth() - currentDate.getMonth()
  let months = getMonthDays(futureDate, monthsDiff, currentDate.getMonth())

  let daysDiff = futureDate.getDate() - currentDate.getDate()
  let days = years + months + daysDiff

  if (hoursDiff <= 0 && minutesDiff < 0) {
    days = days - 1 > 0 ? days - 1 : 0
    hours = 23
  }

  // update values
  countdownDetails = { days, hours, minutes, seconds }
}

function getMonthDays(date, count, start) {
  let daysOfMonths = 0

  if (count > 0) {
    for (let i = start; i < start + count; i++) {
      daysOfMonths += new Date(date.getFullYear(), i, 0).getDate()
    }
  } else {
    daysOfMonths = new Date(date.getFullYear(), count, 0).getDate()
  }

  return daysOfMonths
}

function renderTimeDetails() {
  let { days, hours, minutes, seconds } = countdownDetails

  // set element content
  daysTxt.innerText = days
  hoursTxt.innerText = hours
  minutesTxt.innerText = minutes
  secondsTxt.innerText = seconds
}

function countDown() {
  timerID = setInterval(() => {
    calculateLeftDays()
    renderTimeDetails()
  }, 1000)
}

function showCountDownContainer() {
  const eventTxt = document.querySelector('.event-text span')
  const countdownContainer = document.querySelector('.countdown-container')

  eventTxt.innerText = eventDetails.name
  countdownContainer.classList.remove('opacity-0')
}

function showErrorMsg(msg) {
  const errorTxt = document.querySelector('.error-text')

  errorTxt.innerText = msg
  errorTxt.classList.remove('opacity-0')
  errorTxt.classList.add('opacity-100')

  setTimeout(() => {
    errorTxt.classList.remove('opacity-100')
    errorTxt.classList.add('opacity-0')
  }, 2000)
}

function finishCountDown() {
  setInterval(() => {
    let { days, hours, minutes, seconds } = countdownDetails
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerID)
    }
  }, 950)
}
