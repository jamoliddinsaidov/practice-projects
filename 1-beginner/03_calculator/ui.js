const container = document.querySelector('.calculator-container')
const deleteBtn = document.querySelector('.delete-btn')
const buttonTxts = [
  'C',
  'CA',
  '+/-',
  '/',
  '7',
  '8',
  '9',
  'x',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '',
  '0',
  '.',
  '=',
]
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

// event listeners
window.addEventListener('DOMContentLoaded', () => {
  buttonTxts.map((text) => createBtn(text))
})

deleteBtn.addEventListener('click', () => {
  animateBtn(deleteBtn)
})

// functions
function createBtn(text) {
  const btn = document.createElement('button')
  btn.innerText = text

  // add defined classes
  if (text) classes.forEach((c) => btn.classList.add(c))

  // add click animation
  btn.addEventListener('click', () => {
    animateBtn(btn)
  })

  container.appendChild(btn)
}

function animateBtn(btn) {
  btn.classList.add('scale-90')

  setTimeout(() => {
    btn.classList.remove('scale-90')
  }, 80)
}
