function SwipeCarousel() {
  Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._swipeStart = function(e) {
  this.startPosX = e instanceof MouseEvent
    ? e.pageX
    : e.changedTouches[0].pageX
};

SwipeCarousel.prototype._swipeEnd = function(e) {
  this.endPosX = e instanceof MouseEvent
    ? e.pageX
    : e.changedTouches[0].pageX
  if (this.endPosX - this.startPosX > -100) this.prev();
  if (this.endPosX - this.startPosX < 100) this.next();
}
