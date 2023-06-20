import './styles/style.css'
import Lenis from '@studio-freight/lenis'
import Colcade from 'colcade'
import gsap from 'gsap'
import { Observer } from 'gsap/all'
import ScrollTrigger from 'gsap/ScrollTrigger'

import horizontalLoop from './horizontalLoop'

const sel = (selector) => document.querySelector(selector)

const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

gsap.registerPlugin(Observer, ScrollTrigger)

// logos -------------------
const lo = document.querySelector('.logos__row-wrap')
const logos = gsap.utils.toArray('.logos__row-wrap .logos__row:nth-child(odd) .logos__logo')
const logosReversed = gsap.utils.toArray('.logos__row-wrap .logos__row:nth-child(even) .logos__logo')
const logosTl = horizontalLoop(logos, {
  speed: 0.2,
  paused: false,
  repeat: -1,
  reversed: false,
  draggable: true,
  paddingRight: 30,
})
const logosRevesedTl = horizontalLoop(logosReversed, {
  speed: 0.2,
  paused: false,
  repeat: -1,
  reversed: true,
  draggable: true,
  paddingRight: 30,
})
lo.addEventListener('mouseenter', () => {
  logosTl.pause()
  logosRevesedTl.pause()
})
lo.addEventListener('mouseleave', () => {
  logosTl.play()
  logosRevesedTl.reverse()
})
let clamp = gsap.utils.clamp(-60, 60),
  isOver,
  reversedOnPause
Observer.create({
  target: document.scrollingElement,
  type: 'scroll,wheel',
  onChangeY: (self) => {
    logosTl.timeScale(clamp(self.velocityY * 0.003))
    logosRevesedTl.timeScale(clamp(self.velocityY * -0.003))
    // if (isOver) {
    //   gsap.to(logosTl, { timeScale: 0, duration: 1, overwrite: true })
    // }
  },
})

// colcade masonry -------------------
const masonryCont = document.querySelector('.masonry')
const masonryCol = document.createElement('div')
masonryCol.className = 'grid-col'

for (let i = 0; i < 4; i++) {
  masonryCont.prepend(masonryCol.cloneNode(true))
}
const col = new Colcade('.masonry', {
  columns: '.grid-col',
  items: '.masonry__card',
})
// scrollTrigger
// #
// reveal mask -------------------

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
const revSec9 = sel('.sec-reveal--9')

gsap.set([revHorizontalWrap], { gridArea: '1/1', flexDirection: 'row', width: 'fit-content' })
gsap.set([revFadeWrap], { zIndex: '5' })
gsap.set([revSec1, revSec2, revSec5, revSec6, revSec7, revSec8, revSec9], { gridArea: '1/1' })
const revSecTl = gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    startTrigger: revWrap,
    start: 'top top',
    endTrigger: revSec5,
    end: '150% top', // speed
    toggleActions: 'start none none reverse',
    pin: revWrap,
    scrub: true,
  },
})
revSecTl
  .to(revSec1, { yPercent: '-100' })
  .to(revSec2, { yPercent: '-100' })
  .to(revHorizontalWrap, {
    xPercent: '-50',
    onComplete: function () {
      console.log('qwe')
    },
  })
const revSec5Tl = gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    trigger: revFadeWrap,
    start: 'top top',
    end: '200% top', // speed
    toggleActions: 'start none none reverse',
    pin: true,
    scrub: true,
  },
})
gsap.set(revSec8, { clipPath: 'circle(0% at 75% 50%)' })
revSec5Tl.to(revSec5, { opacity: 0 }).to(revSec6, { opacity: 0 }).to(revSec8, { clipPath: 'circle(100% at 75% 50%)' }).from(revSec9, { yPercent: '100' })

const masonryTl = gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    trigger: masonryCont,
    start: 'top 80%',
    end: 'bottom 50%',
    scrub: 1,
    // markers: true,
    toggleActions: 'start none none reverse',
  },
})
masonryTl.fromTo('.grid-col:nth-child(even)', { y: -20 }, { y: -100 }).to(masonryCont, { duration: 0.2, backgroundColor: 'black' }, '>-=0.2')
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
