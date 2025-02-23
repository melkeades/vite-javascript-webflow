import './styles/style.css'
import Colcade from 'colcade'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// masonry - colcade -------------------
const masonry = document.querySelector('.masonry')
const masonryCol = document.createElement('div')
masonryCol.className = 'grid-col'

for (let i = 0; i < 4; i++) {
  masonry.prepend(masonryCol.cloneNode(true))
}
const col = new Colcade('.masonry', {
  columns: '.grid-col',
  items: '.masonry__card',
})

// scrollTrigger
gsap.registerPlugin(ScrollTrigger)

const itemClassName = 'item-'
const imgClassName = 'img__item'
const infoClassName = 'info__rt'
const infoNodeList = document.querySelectorAll(`[class^='${infoClassName}'][class*='${itemClassName}']`)
const imgNodeList = document.querySelectorAll(`[class^='${imgClassName}'][class*='${itemClassName}']`)

const infoList = [...infoNodeList] // spread domTokenList to array
const imgList = [...imgNodeList] // spread NodeList to domTokenList array
imgList.forEach((element, index) => {
  gsap.set(element, { opacity: 0 })
})

infoList.forEach((element, index) => {
  // console.log(element.classList)
  const classList = [...element.classList]
  const className = classList.filter((str) => new RegExp(itemClassName).test(str)).toString() // find regex itemClassName
  const imgPair = document.querySelector(`[class^='${imgClassName}'][class*='${className}']`)

  ScrollTrigger.create({
    // markers: true,
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'restart none none reverse',
    animation: gsap.to(imgPair, { opacity: 1 }),
  })
  // tl.to(imgPair, { opacity: 1 })
  // let tl = gsap.timeline({
  //   scrollTrigger: {
  //     markers: true,
  //     trigger: element,
  //     start: 'top 80%',
  //     end: 'bottom 20%',
  //     toggleActions: 'restart none none reverse',
  //     animation: gsap.to(imgPair, { opacity: 1 }),
  //   },
  // })

  // tl.to(imgPair, { opacity: 1 })
})
// console.log(Math.min(...infoList.map((element) => element.offsetBottom))) // the least offsetTop value
const topInfoListItem = infoList.reduce((top, element) => (top.offsetTop < element.offsetTop ? top : element)) // element with least offsetTop value
const bottomInfoListItem = infoList.reduce((top, element) => (top.offsetTop > element.offsetTop ? top : element)) // element with most offsetTop value

ScrollTrigger.create({
  // markers: true,
  trigger: infoList,
  start: 'top bottom',
  startTrigger: topInfoListItem,
  end: 'bottom top',
  endTrigger: bottomInfoListItem,
  animation: gsap.fromTo('.img-wrap', { y: 100 }, { y: -100 }),
  scrub: true,
})

// create ScroolTrigger for each img with class name Bubbles to fade for 3 seconds
