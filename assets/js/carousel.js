class Carousel {
  constructor(params){
    const settings = {...{containerID:'#carousel',slideID: '.slide', interval: 5000, isPlaying: true}, ...params};
    
    this.container = document.querySelector(settings.containerID);
    this.slideItems = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }
   
  _initProps(){
    this.currentSlide = 0;
  
    this.SLIDES_COUNT = this.slideItems.length;
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  }
  
  _initControls (){
  const controls = document.createElement('div');
  const PAUSE = ` <div class="control pause" id="pause-btn">
                      <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                      <span id="fa-play-icon">${this.FA_PLAY}</span>
                  </div>`
  const PREV = ` <div class="control prev" id="prev-btn">${this.FA_PREV}</div>`
  const NEXT = `  <div class="control next" id="next-btn">${this.FA_NEXT}</div>`
  
  controls.setAttribute('class', 'controls');
  controls.innerHTML = PAUSE + PREV + NEXT;
  
  this.container.append(controls);
  
  this.pauseBtn = this.container.querySelector('#pause-btn');
  this.prevBtn = this.container.querySelector('#prev-btn');
  this.nextBtn = this.container.querySelector('#next-btn');

  this.pauseIcon = this.container.querySelector('#fa-pause-icon')
  this.playIcon = this.container.querySelector('#fa-play-icon')
  this.isPlaying ? this._pauseVisible() : this._playVisible()
  }
  
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
  this.indicatorItems = this.indicatorsContainer.querySelectorAll('.indicator');
  }
  
    _initListeners() {
      document.addEventListener('keydown', this._pressKey.bind(this));
      this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
      this.prevBtn.addEventListener('click', this.prev.bind(this));
      this.nextBtn.addEventListener('click', this.next.bind(this));
      this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
      this.container.addEventListener('mouseenter', this._pause.bind(this));
      this.container.addEventListener('mouseleave', this._play.bind(this));
    }
  
      _gotoNth(n) {
        this.slideItems[this.currentSlide].classList.toggle('active');
        this.indicatorItems[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.indicatorItems[this.currentSlide].classList.toggle('active');
        this.slideItems[this.currentSlide].classList.toggle('active');
    }
    _gotoPrev () {
      this._gotoNth(this.currentSlide - 1);
    }

     _gotoNext () {
      this._gotoNth(this.currentSlide + 1);
    }
  
       _pause() {
      if (this.isPlaying) {
       this._playVisible()
        this.isPlaying = false;
        clearInterval(this.timerID);
      }
    }
     _play() {
      if(!this.isPlaying){
        this._pauseVisible()
         this.isPlaying = true;
         this._tick();
      }
    }
  
     _indicate(e) {
      const target = e.target;
      if (target && target.classList.contains('indicator')) {
        this._pause();
        this._gotoNth(+target.dataset.slideTo);
      }
    }
  
     _pressKey(e) {
      if (e.code === this.CODE_ARROW_LEFT) this.prev();
      if (e.code === this.CODE_ARROW_RIGHT) this.next();
      if (e.code === this.CODE_SPACE) this.pausePlay();
    }
  
    _tick(flag= true){
      if(!flag) return;
      this.timerID = setInterval(()=>this._gotoNext(), this.interval);
    }

    _pauseVisible(isVisible = true){
this.pauseIcon.style.opacity = isVisible ? 1: 0;
this.playIcon.style.opacity = !isVisible ? 1: 0;
    }
    _playVisible(){
      this._pauseVisible(false);
    }

    pausePlay() {
      if (this.isPlaying) {
        this._pause();
      } else {
        this._play();
      }
    }
  
    prev() {
      this._pause();
      this._gotoPrev();
    }
  
     next() {
      this._pause();
      this._gotoNext();
    }
  
     initApp() {
      this._initProps();
      this._initControls();
      this._initIndicators();
      this._initListeners();
      this._tick(this.isPlaying);
    }
}

export default Carousel;