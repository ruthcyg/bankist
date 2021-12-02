"use strict"


///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");

const section1 = document.querySelector("#section--1");

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');




const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//btnsOpenModal.forEach(btn => btn.addEventListener ('click', openModal))

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// 
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

 // Implementing smooth Scrolling

 //const btnScrollTo = document.querySelector(".btn--scroll-to");

//const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e){
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    console.log(e.target.getBoundingClientRect());
    console.log('Current   scroll  (X/Y)', window.pageXOffset, window.pageYOffset);
    console.log(' height/width viewpoint', 
    document.documentElement.clientHeight,
    document.documentElement.clientWidth);

    // Scrolling 
    //window.scrollTo(s1coords.left + window.pageXOffset,
    //  s1coords.top + window.pageYOffset);

    // or
     // window.scrollTo({
      //  left:s1coords.left + window.pageXOffset,
      //  top:s1coords.top + window.pageYOffset, behavior:'smooth'
     //// });
 // modern
      section1.scrollIntoView({behavior:"smooth"})
});

                         // EVENT DELEGATION

// bEtter ways using event propagation 
// 1. Add Event listerner to common parent element 
// 2. Determine what element originated the event 


document.querySelector('.nav__links').addEventListener('click', function(e){
  // console.log(e.target);
  e.preventDefault();


  // MATCHING STRATEGY 

  if(e.target.classList.contains('nav__link')){
    //console.log("Link");
    // e.preventDefault() 
    // this is to prevent to automatically direct it to the link 
    //console.log("LINK");

    //const id = this.getAttribute("href"); this does not work
    const id = e.target.getAttribute("href");
    console.log(id); // when click the result :#section--1
    // when l used querySelectorAll it did not work  
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
    
  } 
})


// TABBED COMPONENT  REVIEW YOUR HTML AND CSS

// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector(".operations__tab-container");
// const tabsContent = document.querySelectorAll('.operations__content');
 
//tabs.forEach(t=> t.addEventListener('click', () => console.log('TAB')))// THIS IN NOT
// ENCOURAGE BECAUSE WE IT TAKES A LOT OF EFFORT AAND MAKE OUR PAGE TO LOAD SLOW

// WE ARE GOING TO USED THE EVENT PROPAGATION WE ATTACHED THE EVENT LISTENER TO THE 
// COMMON PARENT COMPONENT ELEMENT
// EVENT PROPAGATION IS VERY USEFUL BECAUSE WE CAN USED IN THOUSAND ELEMENT

// operations__tab this is the common parent element check your html  document 

tabsContainer.addEventListener("click", function(e){
const clicked = e.target.closest('.operations__tab');

// read about the closest element
// we used it in  the scenerio to get a general specific parent element no matter where we
// we click we need the same result
//console.log(clicked);

// GUARD CLAUSE  read about it 

if(!clicked) return;

// REMOVE ACTIVE CLASS

// we want the button to move up why other are down 

tabs.forEach(t=> t.classList.remove('operations__tab--active'))

tabsContent.forEach(c => c.classList.remove('operations__content--active'))

// to hide the content when clicked only one should show at a time 

// ACTIVATE CLASS CHECK YOUR CSS 

clicked.classList.add('operations__tab--active');


// Activate content area when clicked its means show the content
//console.log(clicked.dataset.tab);
document.querySelector(`.operations__content--${clicked.dataset.tab}`)
.classList.add('operations__content--active');// read your css and active
})


// PASSING ARGUMENT IN EVENT HANDLER

// Creating the Menu Fade Animation 

// using event delegation  read about addEvenListerner (mouse)

 //const nav = document.querySelector('.nav')
 // here we are not using closest because there is no child element we can accidentally click c
// querySelector is can be used to search

// CREATING TO AVOID DRY 
//const handleHover= function(e, opacity){

// this is because the event listener can accept only one argument   
const handleHover= function(e){

  //console.log(this, e.currentTarget);

  if (e.target.classList.contains('nav__link')){

    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el=> {
      if(el !== link ) el.style.opacity = this;
     // if(el !== link ) el.style.opacity = opacity;
     // el.style.color = "purple"

      




    });
    // logo.style.opacity = opacity; we are using this keyword 
     logo.style.opacity = this;

  }
};


// BEST ALTERNATIVE USING THE BIND METHOD
// Passing an "argument "  into a handler 

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1))


////////////////////////////////////////////////////////////////
////////////A BETER WAY : THE INTERSECTION OBSERVER API/////////
///////////////////////////////////////////////////////////////

// where we want the header to be sticky 

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  // using destructuring 
  const [entry] = entries;

  //console.log(entry);

  if (!entry.isIntersecting )nav.classList.add('sticky');

  else nav.classList.remove("sticky")

}
const headerObserver = new IntersectionObserver(stickyNav,{
 root:null,
 threshold: 0,
 //rootMargin:'-90px',
 rootMargin:`${navHeight}px`,

});
headerObserver.observe(header)


////////////////////////////////////////////////////////////////
////////////REVEALING  ELEMENTS ON SCROLL/////////
///// THE ANIMATION IS FROM CSS 
/// removing / reveal section--hidden
// we are using for each because we don't want to create a new ARRAY 
///////////////////////////////////////////////////////////////
 const allSections = document.querySelectorAll('.section')
const revealSection = function (entries, observer){


  const[entry] = entries;
  //console.log(entry);
  ///////////
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection,{

  root:null,
  threshold : 0.15,
});

 allSections.forEach(function(section){
   sectionObserver.observe(section);
   //section.classList.add('section--hidden')
 });



////////////////////////////////////////////////////////////////
////////////lazy  loading image  : for better performance/////////
///////////////////////////////////////////////////////////////

//const imgTargets = document.querySelectorAll('img [data-src]'); wrong because there was space
const imgTargets = document.querySelectorAll('img[data-src]');

const loading = function(entries, observer){

  const [entry] = entries;
 // console.log(entry);

  if(!entry.isIntersecting) return

  // REplace src with data-src

  entry.target.src = entry.target.dataset.src;

 // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function(){
  entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
  
};
const imgObserver = new IntersectionObserver(loading,{
  root:null,
  threshold:0,
  rootMargin:'200px',
})

imgTargets.forEach(img => imgObserver.observe(img) );
//console.log(imgTargets);


 

///////////////////////////////////////////////////////////////
////////////A BETER WAY : BUILDING A SLIDER COMPONENT/////////
///////////////////////////////////////////////////////////////


///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
// const slides =  document.querySelectorAll(".slide");

// const btnLeft = document.querySelector('.slider__btn--left');

// const btnRight = document.querySelector(".slider__btn--right");

// let curSlide =0;
// const maxSlide = slides.length,

// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.4) translateX(-800px)";

// slider.style.overflow= "visible";

// slides.forEach((s, i) => (s.style.transform = `translateX(${100*1}%)`));
//  // 0% , 100%, 200%, 300%

// // next slide

// btnRight.addEventListener("click", function(){
//  // curSlide ++;

//   if(curSlide=== maxSlide -1){
//     curSlide = 0;
//   }
//   else{
//     curSlide ++;
//   }

//   slides.forEach(
//    ( s, i ) =>  (s.style.transfom =  `translateX(${100 * (i- curSlide)}%)`)
//   );
//   // curSlide = 1; -100%, 0%, 100%, 200%

// })




// ////////////////////////////////////////////////////////////////
// ////////////A BETER WAY : THE INTERSECTION OBSERVER API/////////
// ///////////////////////////////////////////////////////////////

// // const obsCallback = function(entries, observer){
// //  entries.forEach(entry => {
// //    console.log (entry)
// //  });
// // }

// // const obsOptions =  {
// //   root:null,
// //   threshold:[0, 0.2 ],

// //   // 0.1 is 10%
// // }
// // const observer = new IntersectionObserver(obsCallback,obsOptions); 

// // observer.observe(section1);

// // where we want the header to be sticky 

// //const header = document.querySelector('.header');


///////////////////////////////////////////////////////
////////// PASSING AN ARGUMENT IN HANDLER //////////////
////////////////////////////////////////////////////////

// other alternative

// nav.addEventListener('mouseover',  function(e){

//   handleHover(e, 0.5)
// })
// nav.addEventListener('mouseout', function(e){
// handleHover(e, 1);

// })


///////////////

//  nav.addEventListener('mouseover', function (e){

//   if (e.target.classList.contains('nav__link')){

//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el=> {
//       if(el !== link ) el.style.opacity = 0.5;




//     });
//      logo.style.opacity = 0.5;

//   }
//  })

//  // undo the mouseover
//  nav.addEventListener('mouseout', function(e){

//   if (e.target.classList.contains('nav__link')){

//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el=> {
//       if(el !== link ) el.style.opacity = 1;
//      // el.style.color =  "purple" // beautiful




//     });
//      logo.style.opacity = 1;

//   }

// })



//// Implementing A Sticky Navigation 
//  const initialCoords = section1.getBoundingClientRect();
//  console.log(initialCoords);

// window.addEventListener('scroll',function(e){
//   console.log(window.scrollY  ) ;

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky');

// })




// // DOM TRAVERSING

// const h1 = document.querySelector('h1');

// // Going downwards: child   ALWAYS CHECK SPELLING

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// // instead use
// console.log(h1.children); // this only work for only direct children

// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "red";

// // going upwards : parent

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)'; 
// // with space between the var was not working l don't if its my slow server 
// h1.closest('h1').style.background = 'var( --gradient-primary)';
// // this is a css property
// //h1.closest('.header').style.background = "red" // this work 
// //`var (--gradient-secondary)`; this i am little confused
// //console.log("lice");



// // selecting sibling

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);


// // though its html collection  not array its still  iterable 
// [...h1.parentElement.children].forEach(function(el) {
//    if (el !==h1) el.style.transform = 'scale(0.5)'
// })

// Page navigation  

// document.querySelectorAll('.nav__link').forEach(function(el){

//   el.addEventListener('click', function (e){
//     e.preventDefault() 
//     // this is to prevent to automatically direct it to the link 
//     //console.log("LINK");

//     const id = this.getAttribute("href");
//     console.log(id); // when click the result :#section--1
//     // when l used querySelectorAll it did not work  
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//     })
// })




// creating random rgb(255, 255, 255)


// const randomInt = (min , max) =>
// Math.floor(Math.random() *( max -min + 1 )+ min);
// const randomColor = () =>
// `rgb(${randomInt(0,255)}, ${randomInt(0,255) } , ${randomInt(0, 255)})`
  
// console.log(randomColor(0,255));

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   //console.log("link");
//   this.style.backgroundColor = randomColor();
//   console.log('LINK' , e.target , e.currentTarget);
//   console.log(e.currentTarget === this); // this e.currentTarget is equal to this key word
//   // result : true

//   // we can stop the event progapation 

//   //e.stopPropagation(); // very necessary read about it  and its not good idea
//   // before the whole parent  element  used to change current but now only the 
//   // the specific element change 
// })

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   //console.log("link");
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER' , e.target, e.currentTarget);
// })

// document.querySelector('.nav').addEventListener('click', function(e){
//  // console.log("link");
//   this.style.backgroundColor = randomColor();
//   console.log('NAV' , e.target, e.currentTarget);
// });
// //true)

///////////////////////////////////////////////////////
////////// LIFECYCLE  DOM EVENTS //////////////
////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function(e){
  console.log(`HTML parsed and DOM tree built !`,e);
});
window.addEventListener('load', function(e){
console.log('Page Fully Loaded');

});

// window.addEventListener('beforeunload',  function(e){

//   e.preventDefault();
//   console.log(e);
//   e.returnvValue - ''
// })



































































































































































































































































































































/*
//EXAMPLE TO CHANGE CSS VARIABLE FROM JAVASCRIPT
// STYLES

//document.documentElement.style.setProperty ('--color-primary', 'orangered')

// ATRRIBUTES only this three work  in images 



const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo" // we can write and manipulate alt description  here


//// ATTRIBUTES
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');

console.log(link.href);
console.log(link.getAttribute('href'));
*/




//  Data ATTRIbutes 

//console.log(logo.dataset.versionNumber);

// Classes this is a fake  c to just make a point 

 // Implementing smooth Scrolling
