import './styles/style.css'
import Lenis from '@studio-freight/lenis'
import Colcade from 'colcade'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const sel = (selector) => document.querySelector(selector)

const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// colcade -------------------
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

// reveal mask -------------------
gsap.registerPlugin(ScrollTrigger)
const revWrap = sel('.sec-reveal-wrap')
const revCurtainWrap = sel('.sec-reveal__curtain-wrap')
const revHorizontalWrap = sel('.sec-reveal__horizontal-wrap')
const revFadeWrap = sel('.sec-reveal__fade-wrap')
const revClipWrap = sel('.sec-reveal__clip-wrap')
const revSec1 = sel('.sec-reveal--1')
const revSec2 = sel('.sec-reveal--2')
const revSec3 = sel('.sec-reveal--3')
const revSec4 = sel('.sec-reveal--4')
const revSec5 = sel('.sec-reveal--5')
const revSec6 = sel('.sec-reveal--6')
const revSec7 = sel('.sec-reveal--7')
const revSec8 = sel('.sec-reveal--8')
console.log(revWrap, revCurtainWrap, revHorizontalWrap, revFadeWrap, revClipWrap, revSec1, revSec2, revSec3, revSec4, revSec5, revSec6, revSec7, revSec8)

gsap.set('.sec-slide-wrap', { position: 'sticky', paddingBottom: '100vh' })
gsap.set('.sec-reveal--00', { position: 'absolute' })
// gsap.set(revWrap, { marginTop: '100vh' })
ScrollTrigger.create({
  trigger: '.sec-slide-wrap',
  start: 'top ',
  end: 'bottom ',
  scrub: true,
  animation: gsap.to('.sec-reveal--00', { ease: 'none', yPercent: '-100' }),
  // pin: true,
})
ScrollTrigger.create({
  trigger: '.sec-reveal--0',
  start: 'top ',
  end: 'bottom ',
  scrub: true,
  // pin: '.sec-reveal--0',
  animation: gsap.fromTo('.sec-reveal--0 .sec-reveal__rt', { y: 50 }, { y: -50 }),
})

// create scrollTrigger that pins rev1Sec and reveals rev2Sec through growing mask attached to .sec-reveal__image
const secRevealTl = gsap.timeline({
  defaults: { ease: 'power1.in' },
  scrollTrigger: {
    trigger: revWrap,
    start: 'top top',
    end: '120% top', // speed
    toggleActions: 'start none none reverse',
    onEnter: () => gsap.set('.sec-reveal--0', { opacity: 0, pointerEvents: 'none' }),
    onLeaveBack: () => gsap.set('.sec-reveal--0', { opacity: 1 }),
    pin: true,
    scrub: true,
  },
})
gsap.set('.sec-reveal', { gridArea: '1/1' })
gsap.set(rev2Sec, { clipPath: 'circle(0% at 75% 50%)' })
secRevealTl.fromTo('.sec-reveal__rt', { y: 50 }, { y: -50 }).to(rev2Sec, { clipPath: 'circle(100% at 75% 50%)' }, '<1%')

// --------------------
const itemClassName = 'item-'
const imgClassName = 'img__item'
const infoClassName = 'info__rt'
const infoNodeList = document.querySelectorAll(`[class^='${infoClassName}'][class*='${itemClassName}']`)
const imgNodeList = document.querySelectorAll(`[class^='${imgClassName}'][class*='${itemClassName}']`)

const infoList = [...infoNodeList] // spread domTokenList to array
const imgList = [...imgNodeList] // spread NodeList to domTokenList array
imgList.forEach((element, index) => {
  // gsap.set(element, { opacity: 0 })
})

infoList.forEach((element, index) => {
  // console.log(element.classList)
  const classList = [...element.classList]
  const className = classList.filter((str) => new RegExp(itemClassName).test(str)).toString() // find regex itemClassName
  const imgPair = document.querySelector(`[class^='${imgClassName}'][class*='${className}']`)

  if (index > 0) {
    gsap.set(imgPair, { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%' })
    // gsap.set(imgPair, { x: 200 })
    ScrollTrigger.create({
      // markers: true,
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'restart none none reverse',
      animation: gsap.to(imgPair, { duration: 0.5, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }),
    })
  }
  // get css background color of element
  const elementBgColor = window.getComputedStyle(element).getPropertyValue('background-color')
  console.log(elementBgColor)
  ScrollTrigger.create({
    // markers: true,
    trigger: element,
    start: 'top 90%',
    end: 'bottom 90%',
    toggleActions: 'start none none reverse',
    animation: gsap.to('.info', { backgroundColor: elementBgColor, immediateRender: false }),
    scrub: true,
  })
})
// console.log(Math.min(...infoList.map((element) => element.offsetBottom))) // the least offsetTop value
const topInfoListItem = infoList.reduce((leastTop, element) => (leastTop.offsetTop < element.offsetTop ? leastTop : element)) // element with least offsetTop value
const bottomInfoListItem = infoList.reduce((mostTop, element) => (mostTop.offsetTop > element.offsetTop ? mostTop : element)) // element with most offsetTop value

ScrollTrigger.create({
  // markers: true,
  trigger: infoList,
  start: 'top bottom',
  startTrigger: topInfoListItem,
  end: 'bottom top',
  endTrigger: bottomInfoListItem,
  animation: gsap.fromTo('.img-wrap', { y: 50 }, { y: -50 }),
  scrub: true,
})
