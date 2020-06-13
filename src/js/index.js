import '../css/main.css'

const menu = document.querySelector('.menu')
const target = menu.querySelector('.menu__target')
const items = menu.querySelectorAll('.menu__item')
const sections = document.querySelectorAll('.content__section')
const bg = document.querySelector('.layout__bg')
let active = items[0]

const setTargetPos = (item) => {
  target.style.width = item.offsetWidth + 'px'
  target.style.height = item.offsetHeight + 'px'
  target.style.left = item.offsetLeft + 'px'
  target.style.top = item.offsetTop + 'px'
}

const toggleClass = (elems, index, cls) => {
  for (let i = 0; i < elems.length; i++) {
    if (index == i) {
      elems[i].classList.add(cls)
    } else {
      elems[i].classList.remove(cls)
    }
  }
}

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener('click', e => {
    active = items[i]

    toggleClass(items, i, 'menu__item--active')
    toggleClass(sections, i, 'content__section--active')
    setTargetPos(active)
  })
}

window.addEventListener('resize', () => setTargetPos(active))
window.addEventListener('load', () => setTargetPos(active))