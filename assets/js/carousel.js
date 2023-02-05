function Carousel(params) {
  this.container = document.querySelector('#carousel');
  this.slides = this.container.querySelectorAll('.slide');
}

Carousel.prototype={
_initProps(){
  this.isPlaying = true;
  this.currentSlide = 0;
  this.interval = 2000;

  this.SLIDES_COUNT = this.slides.length;
  this.CODE_ARROW_LEFT = 'ArrowLeft';
  this.CODE_ARROW_RIGHT = 'ArrowRight';
  this.CODE_SPACE = 'Space';
  this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
  this.FA_PREV = '<i class="fas fa-angle-left"></i>';
  this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
},

_initControls (){
const controls = document.createElement('div');
const PAUSE = ` <div class="control control-pause" id="pause-btn">${this.FA_PAUSE}</div>`
const PREV = ` <div class="control control-prev" id="prev-btn">${this.FA_PREV}</div>`
const NEXT = `  <div class="control control-next" id="next-btn">${this.FA_NEXT}</div>`

controls.setAttribute('class', 'controls');
controls.innerHTML = PAUSE + PREV + NEXT;

this.container.append(controls);

this.pauseBtn = this.container.querySelector('#pause-btn');
this.prevBtn = this.container.querySelector('#prev-btn');
this.nextBtn = this.container.querySelector('#next-btn');
},

_initIndicators (){
  const indicators = document.createElement('div');

  indicators.setAttribute('class', 'indicators');
  
for (let i = 0; i < this.SLIDES_COUNT; i++){
  const indicator = document.createElement('div');

indicator.setAttribute('class', i===0 ?'indicator active': 'indicator');
indicator.dataset.slideTo = `${i}`;
indicators.append(indicator);
};

  this.container.append(indicators);

this.indicatorsContainer = this.container.querySelector('.indicators');
this.indicators = this.container.querySelectorAll('.indicator');
},

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('mousedown', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
    this.container.addEventListener('mouseup', this._swipeEnd.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  },

    _gotoNth(n) {
      this.slides[this.currentSlide].classList.toggle('active');
      this.indicators[this.currentSlide].classList.toggle('active');
      this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
      this.indicators[this.currentSlide].classList.toggle('active');
      this.slides[this.currentSlide].classList.toggle('active');
  },
  _gotoPrev () {
    this._gotoNth(this.currentSlide - 1);
  },

   _gotoNext () {
    this._gotoNth(this.currentSlide + 1);
  },

     _pause() {
    if (this.isPlaying) {
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
      clearInterval(this.timerID);
    }
  },
   _play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
    this._tick();
  },

   _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this._pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  },

   _pressKey(e) {
    if (e.code === this.CODE_ARROW_LEFT) this.prev();
    if (e.code === this.CODE_ARROW_RIGHT) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  _tick(){
    this.timerID = setInterval(()=>this._gotoNext(), this.interval);
  },

  pausePlay() {
    if (this.isPlaying) {
      this._pause();
    } else {
      this._play();
    }
  },

  prev() {
    this._pause();
    this._gotoPrev();
  },

   next() {
    this._pause();
    this._gotoNext();
  },

   initApp() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  }
};

Carousel.prototype.constructor = Carousel;