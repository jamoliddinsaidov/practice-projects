// selectors & variables
const userId = document.querySelector('#user-id')
const password = document.querySelector('#password')
const loginBtn = document.querySelector('.btn-login')
const cancelBtn = document.querySelector('.btn-cancel')
const credentialsBtn = document.querySelector('.btn-hint')
const alertMsgContainer = document.querySelector('.warning-msg-container')
const alertMsgText = document.querySelector('.warning-msg')
const docStyle = document.documentElement.style
const actualUserId = 'testuser'
const actualPassword = 'mypassword'

// css variables
const userIdInputBg = '--user-id-input-bg'
const userIdInputBorderColor = '--user-id-input-border-color'
const userIdInputTextColor = '--user-id-input-text-color'

const passwordInputBg = '--password-input-bg'
const passwordInputBorderColor = '--password-input-border-color'
const passwordInputTextColor = '--password-input-text-color'

const alertBoxBg = '--warning-bg'
const alertBoxTextColor = '--warning-text-color'

const yellowColor = '#ffcc00'
const whiteColor = '#fff'
const greenColor = '#339900'
const blackColor = '#000'
const redColor = '#cc3300'

// event listeners
loginBtn.addEventListener('click', validateUserInputs)
cancelBtn.addEventListener('click', (e) => {
  e.preventDefault()
  reset()
})
credentialsBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const msg = `User ID: ${actualUserId} \nPassword: ${actualPassword}`
  alert(msg)
})

// functions
function validateUserInputs(e) {
  e.preventDefault()

  const userIdValue = userId.value
  const passwordValue = password.value
  const regex = /\s/g

  if (userIdValue.match(regex) || !userIdValue) {
    docStyle.setProperty(userIdInputBg, yellowColor)
    docStyle.setProperty(userIdInputBorderColor, yellowColor)
    showWarning("User ID shouldn't contain any spaces or be empty", yellowColor)
    resetPasswordInputCSS()
  } else if (userIdValue !== actualUserId) {
    docStyle.setProperty(userIdInputBg, redColor)
    docStyle.setProperty(userIdInputBorderColor, redColor)
    docStyle.setProperty(userIdInputTextColor, whiteColor)
    showWarning('User ID is incorrect', redColor)
    resetPasswordInputCSS()
  } else if (passwordValue.match(regex) || !passwordValue) {
    docStyle.setProperty(passwordInputBg, yellowColor)
    docStyle.setProperty(passwordInputBorderColor, yellowColor)
    showWarning("Password shouldn't contain any spaces or be empty", yellowColor)
    resetUserIdInputCSS()
  } else if (passwordValue !== actualPassword) {
    docStyle.setProperty(passwordInputBg, redColor)
    docStyle.setProperty(passwordInputBorderColor, redColor)
    docStyle.setProperty(passwordInputTextColor, whiteColor)
    showWarning('Password is incorrect', redColor)
    resetUserIdInputCSS()
  } else {
    showSuccess('Successfully logged in!')
    reset()
  }
}

function showWarning(msg, color) {
  if (color === yellowColor) {
    docStyle.setProperty(alertBoxBg, yellowColor)
    docStyle.setProperty(alertBoxTextColor, blackColor)
  } else if (color === redColor) {
    docStyle.setProperty(alertBoxBg, redColor)
    docStyle.setProperty(alertBoxTextColor, whiteColor)
  }

  alertMsgText.innerText = msg
  animateAlert()
}

function showSuccess(msg) {
  docStyle.setProperty(alertBoxBg, greenColor)
  docStyle.setProperty(alertBoxTextColor, whiteColor)
  alertMsgText.innerText = msg
  animateAlert()
}

function animateAlert() {
  alertMsgContainer.classList.remove('hide')
  alertMsgContainer.classList.add('shake')

  setTimeout(() => {
    alertMsgContainer.classList.add('hide')
    alertMsgContainer.classList.remove('shake')
  }, 3000)
}

function reset() {
  // clear input values
  userId.value = ''
  password.value = ''

  // store default css values
  resetUserIdInputCSS()
  resetPasswordInputCSS()
}

function resetUserIdInputCSS() {
  docStyle.setProperty(userIdInputBg, whiteColor)
  docStyle.setProperty(userIdInputBorderColor, blackColor)
  docStyle.setProperty(userIdInputTextColor, blackColor)
}

function resetPasswordInputCSS() {
  docStyle.setProperty(passwordInputBg, whiteColor)
  docStyle.setProperty(passwordInputBorderColor, blackColor)
  docStyle.setProperty(passwordInputTextColor, blackColor)
}
