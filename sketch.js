
let snake;
let food;
let health = 100;
let num;
let frame = 0;
let pom;
let gad;
let foodImage,gadImage,snakeImage,backgroundImage,packImage,endImage;
let time = 0
let hit = false

function preload(){
  backgroundImage = loadImage("img/bgrnd.jpg")
  foodImage = loadImage("img/png.png");
  gadImage = loadImage("img/0.png");
  packImage = loadImage("img/pacman.png");
  endImage = loadImage("img/letsgoo.png")
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
      if (this.x > 0) this.x -= 7;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      if (this.x < width - this.w) this.x += 7;
    }
    if (keyIsDown(UP_ARROW)) {
      if (this.y > 0) this.y -= 7;
    }
    if (keyIsDown(DOWN_ARROW)) {
      if (this.y < height - this.h) this.y += 7;
    }
  }
  
   hits(food) {
    return collideRectRect(
      this.x,
      this.y,
      this.w,
      this.h,
      food.x,
      food.y,
      food.h,
      food.w,
    );
  }
  hit(gad) {
    return collideRectRect(
      this.x,
      this.y,
      this.w,
      this.h,
      gad.x,
      gad.y,
      gad.h,
      gad.w,
    );
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
    hits(snake) {
    return collideRectRect(
      this.x,
      this.y,
      this.size,
      this.size,
      Snake.x,
      Snake.y,
      Snake.w,
      Snake.h
    );
  }
  draw(){
    this.move()
    this.hits()
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
   hits(snake) {
    return collideRectRect(
      this.x,
      this.y,
      this.size,
      this.size,
      Snake.x,
      Snake.y,
      Snake.w,
      Snake.h
    );
  }
  draw(){
    this.move()
    this.hits()
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
  if(time>=500){
    gad.draw();
  }
  if (snake.hits(food)||snake.hit(gad)){
    //console.log("game over")
   health-= 1
    loop()
    if(health<=0){
      console.log("game over")
      background(255)
      image(endImage,width/2-180,height/2-180,width/2,height/2)
      text(`Your score: ${time}`,width/2-50,height-250);
      noLoop();
    }
  }

  //}/*if (snake.hit(gad)){
    //console.log("game over2")
    
 // }*/
  /*if (health = 0){
    console.log("this game is over")
  }*/
text(`Score: ${time}`,width-100,height-670);
  text(`HP: ${health}`,width-200, height-670);
  
}