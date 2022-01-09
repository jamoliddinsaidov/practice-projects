// selectors
const nameTxt = document.querySelector('.name-text')
const usernameTxt = document.querySelector('.username-text')
const phoneTxt = document.querySelector('.phone-text')
const emailTxt = document.querySelector('.email-text')
const companyTxt = document.querySelector('.company-text')
const addressTxt = document.querySelector('.address-text')
const usersList = document.querySelector('.users-list')
let activeUserId = 1

// functions
async function renderUsersList() {
  let users = await fetchUsers()

  // render users
  users.forEach((user) => {
    let userEl = renderUser(user)

    userEl.addEventListener('click', () => {
      activeUserId = user.id
      renderUserDetails(userEl)
    })

    usersList.append(userEl)

    // default
    renderUserDetails(userEl, user.id)
  })
}

function renderUser({ id, name }) {
  // create & customize text container
  const containerClasses = [
    'w-5/6',
    'mx-auto',
    'mb-4',
    'p-2',
    'cursor-pointer',
    'transition',
    'ease-in-out',
    'delay-50',
    'hover:bg-cyan-400',
    'rounded',
  ]
  const container = createElement('div', containerClasses)
  container.setAttribute('user-id', id)

  // create name paragraph & add its classess
  const textClasses = ['text-white', 'font-semibold', 'text-lg']
  const text = createElement('p', textClasses)
  text.innerText = name

  // add the text to the container
  container.append(text)

  return container
}

async function renderUserDetails(userElement) {
  let users = await fetchUsers()
  let usersContainer = usersList.children

  for (let userContainer of usersContainer) {
    if (+userContainer.getAttribute('user-id') === activeUserId) {
      addClass(userContainer, 'bg-cyan-400')
      const { name, username, email, address, phone, company } = users[activeUserId - 1]
      nameTxt.innerText = name
      usernameTxt.innerText = username
      emailTxt.innerText = email
      phoneTxt.innerText = phone
      companyTxt.innerText = company.name
      addressTxt.innerText = getFullAdress(address)
    } else removeClass(userContainer, 'bg-cyan-400')
  }
}

function createElement(element, classes) {
  let el = document.createElement(element)
  addClasses(el, classes)
  return el
}

function addClasses(element, classes) {
  classes.forEach((c) => addClass(element, c))
}

function removeClasses(element, classes) {
  classes.forEach((c) => removeClass(element, c))
}

function addClass(element, addedClass) {
  element.classList.add(addedClass)
}

function removeClass(element, removedClass) {
  element.classList.remove(removedClass)
}

function getFullAdress({ suite, street, city, zipcode }) {
  return `${suite}, ${street}, ${city}, ${zipcode}`
}

async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  return await response.json()
}

renderUsersList()
