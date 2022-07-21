var menuBtn = document.querySelector('.menu-btn');
var nav = document.querySelector('nav');
var lineOne = document.querySelector('nav .menu-btn .line--1');
var lineTwo = document.querySelector('nav .menu-btn .line--2');
var lineThree = document.querySelector('nav .menu-btn .line--3');
var link = document.querySelector('nav .nav-links');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    lineOne.classList.toggle('line-cross');
    lineTwo.classList.toggle('line-fade-out');
    lineThree.classList.toggle('line-cross');
    link.classList.toggle('fade-in');
})

/*sticky navbar js */

window.onscroll = function() {myFunction()};
var navbar = document.getElementById('navbar');
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageXOffset >= sticky ){
    navbar.classList.add('sticky')
  }else {
    navbar.classList.remove('sticky')
  }
}
// preloader

var loader = document.getElementById('preloader')

window.addEventListener('load', function(){
  loader.style.display = 'none'
})


/* background*/

class Canvas{
    constructor(canvas) {
      this.canvas = canvas;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.ctx = this.canvas.getContext('2d');
      this.canvas.style.background = '';
      this.numberOfLines = 1;
      this.lineWidth = 25;
      this.lineGutter = 10;
      this.lines = [];
      this.grid = {x:0, y: 0};
      
      
      this.init();
    }
    
    init() {
      window.mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
      this.addEvents();
      this.resizeCanvas();
      this.addLines();
      
      this.ctx.beginPath();
      this.ctx.rect(0,0,this.width,this.height);
      this.ctx.closePath();
      this.ctx.clip();
      
      this.render();
      this.canvas.width = this.width = window.innerWidth;
      this.canvas.height = this.height = window.innerHeight;
    }
    
    resizeCanvas() {
      this.canvas.width = this.width = window.innerWidth;
      this.canvas.height = this.height = window.innerHeight;
      
      this.grid.x = Math.round((this.width) / (this.lineWidth + this.lineGutter)) + 1;
      this.grid.y = Math.round((this.height) / (this.lineWidth)) + 1;
    }
    
    addEvents() {
      document.addEventListener('mousemove', this.mousemove.bind(this));
      window.addEventListener('resize', this.resizeCanvas.bind(this));
    }
    
    mousemove(e) {
      window.mouse.x = e.clientX;
      window.mouse.y = e.clientY;
    }
    
    addLines() {
      for (let x = 0; x < this.grid.x; x++) {
        let posX = (this.lineWidth * x) + (this.lineGutter * x);
        for (let y = 0; y < this.grid.y; y++) {
          let posY = (this.lineWidth * y) + (this.lineGutter * y);
          this.lines.push(new Line(this.ctx, posX, posY, this.lineWidth));
        }
      }
    }
    
    render() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (let i = 0; i < this.lines.length; i++) {
        this.lines[i].draw();
    
      }
      window.requestAnimationFrame(this.render.bind(this));
    }
  }
  
  class Line{
    constructor(ctx, x, y, width = 50){
      this.width = width;
      this.x = x;
      this.y = y;
      this.ctx = ctx;
      this.sine = 0;
      this.draw = this.draw.bind(this);
    }
    
    draw() {
      this.sine++;
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.getAngle());
  
      this.ctx.beginPath();
      this.ctx.moveTo(-(this.width / 2), -5);
      this.ctx.lineTo( this.width / 2, -5);
      this.ctx.lineWidth = Math.pow(this.getDistance() / (Math.abs(Math.sin(this.sine / 200) * 300)), 3.5);   
      this.ctx.strokeStyle = "#7D55D7";
      this.ctx.stroke();
      
      this.ctx.restore();
    }
    
    
    getAngle() {
      return Math.atan2(window.mouse.y - this.y, window.mouse.x - this.x);
    }
    
    getDistance() {
      const a = this.x - window.mouse.x;
      const b = this.y - window.mouse.y;
      return Math.sqrt( a*a + b*b );
    }
    
    
  }
  new Canvas(document.getElementById('canvas'));

  //about animation

  jQuery(document).ready(function($) {

    //Count nr. of square classes
    var countSquare = $('.square').length;
  
    //For each Square found add BG image
    for (i = 0; i < countSquare; i++) {
      var firstImage = $('.square').eq([i]);
      var secondImage = $('.square2').eq([i]);
  
      var getImage = firstImage.attr('data-image');
      var getImage2 = secondImage.attr('data-image');
  
      firstImage.css('background-image', 'url(' + getImage + ')');
      secondImage.css('background-image', 'url(' + getImage2 + ')');
    }
  
  });
  // reveal on scroll

//get the form by its id
const form = document.getElementById("contact-form"); 

//1.
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

  //2.
  let mail = new FormData(form);

  //3.
  sendMail(mail);
})

const sendMail = (mail) => {
  //1.
  fetch("/send", {
    method: "post", //2.
    body: mail, //3.

  }).then((response) => {
    return response.json();
  });
};
