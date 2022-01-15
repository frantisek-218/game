
let snake;
let food;
let num;
let frame = 0;
let pom;
let gad;
let foodImage,gadImage,snakeImage,backgroundImage,packImage;
let time = 0

function preload(){
  backgroundImage = loadImage("img/bgrnd.jpg")
  foodImage = loadImage("img/png.png");
  gadImage = loadImage("img/0.png");
  packImage = loadImage("img/pacman.png");
}

window.onload = function(){
  setInterval(mainLoop,1000/60);
}
function mainLoop(){
  
}

class Snake{
  constructor(){
    this.x = width/2
    this.y = height/2
    this.w = 70
    this.h = 70
  }
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      if (this.x > 0) this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.x < width - this.w) this.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      if (this.y > 0) this.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      if (this.y < height - this.h) this.y += 5;
    }
  }
  draw(){
    this.move();
    let c = color('yellow');
    fill(c);
    //rect(this.x,this.y,this.w,this.h)
    image(packImage,this.x,this.y,this.w,this.h)
  }
}
class Food{
  constructor(){
    this.x =  30
    this.y = random(0,700)
    this.w = 70
    this.h = 70
  }
  move(){
this.x += 10;
  if(this.x>width){
    this.x= 0;
    this.y= Math.floor(Math.random() * (700-this.h));
  }
  }
  draw(){
    this.move()
    fill ("red");
    //circle(this.x,this.y,this.size)
    image(gadImage,this.x,this.y,this.w,this.h)
    
  }
}
class Gad{
  constructor(){
    this.x =  random(0,width-this.w)
    this.y = 42
    this.w = 70
    this.h = 70
  }
  move(){
this.y += 10
  if(this.y>height){
    this.x= Math.floor(Math.random() * (700-this.h));
    this.y= 0 -this.h;
  }
  }
  draw(){
    this.move()
    fill ("blue");
    //circle(this.x,this.y,this.size)
    image(foodImage,this.x,this.y,this.w,this.h)
  }
}

function setup() {
  createCanvas(700, 700);
  snake = new Snake();
  food = new Food();
  gad = new Gad(); 
}

function draw() {
  time++;
  background(255)
  image(backgroundImage,0,0,width,height)
  snake.draw();
  food.draw();
  if(time>=1000){
    gad.draw();
  }
  text(`Score: ${time}`,width-100, height-670);
}