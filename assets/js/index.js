import SwipeCarousel from './carousel-swipe.js';

const carousel = new SwipeCarousel({
  // containerID:'#carousel',
  // slideID: 'item', 
  interval: 2000,
  isPlaying:false
});

carousel.initApp();


window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});