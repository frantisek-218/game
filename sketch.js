
let snake;
let food;
let health = 100;
let num;
let speed = 10;
let frame = 0;
let pom;
let gad;
let coin;
let foodImage,gadImage,snakeImage,backgroundImage,packImage,endImage,coinImage;
let time = 0
let hit = false


//nachystani obrazku k vykresleni 
function preload(){
  backgroundImage = loadImage("img/bgrnd.jpg")
  foodImage = loadImage("img/png.png");
  gadImage = loadImage("img/0.png");
  packImage = loadImage("img/pacman.png");
  endImage = loadImage("img/letsgoo.png")
  coinImage = loadImage("img/jidlo.png")
}

//nastaveni vykreslovaci frekvence
window.onload = function(){
  setInterval(mainLoop,1000/60);
}


function mainLoop(){
  
}

// main - charakter
class Snake{

// constructor k nastaveni informaci k mainchar.
  constructor(){
    this.x = width/2
    this.y = height/2
    this.w = 70
    this.h = 70
  }
  
//funkce umožnění pohybu
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
  
  //funkce z knihovny collide
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
  
  //vykresleni vsech prednastavenych inf.
  draw(){
    this.move();
    let c = color('yellow');
    fill(c);
    //rect(this.x,this.y,this.w,this.h)
    image(packImage,this.x,this.y,this.w,this.h)
  }
}

//bot - 1
class Food{
  constructor(){
    this.x =  30
    this.y = random(0,700)
    this.w = 70
    this.h = 70
  }
  
  //pohyb bota - nastaveni jeho x po překrocení na 0
  move(){
this.x += speed;
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

//bot - 2
class Gad{
  constructor(){
    this.x =  random(0,width-this.w)
    this.y = 42
    this.w = 70
    this.h = 70
  }
  
  // pohyb po ose y po prekroceni na y=0
  move(){
    this.y += speed
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
//nedodělana coin - sběr
/*class Coin{
  constructor(){
    this.x = random(0,width-this.w)
    this.y = random(0,height-this.h)
    this.w = 30
    this.h = 30
  }
  draw(){
    image(coinImage,this.x,this.y,this.w,this.h)
  }
}*/



function setup() {
  createCanvas(700, 700);
  snake = new Snake();
  food = new Food();
  gad = new Gad(); 
  //coin = new Coin();
}


function draw() {
  time++;
  background(255)
  image(backgroundImage,0,0,width,height)
  snake.draw();
  food.draw();
  //coin.draw();
  
  
  //char. hry - kdy se co stane + průběžná náročnost
  if(time>=500){
    gad.draw();
  }
  
   if(time>=1500){
    speed = 12;
  }
  
  if(time>=3000){
    speed = 15
  }
  
  if(time>=5000){
    speed = 20
  }
  // nastavime co se stane, když se mainchar. střetne s botem
  if (snake.hits(food)||snake.hit(gad)){
    //console.log("game over")
   health-= 1
    loop()
    //ukončení hry + vypis score a end screenu - po hře
    if(health<=0){
      console.log("game over")
      background(255)
      image(endImage,width/2-180,height/2-180,width/2,height/2)
      textSize(25)
      fill("red")
      textStyle(BOLD);
      text(`Your score: ${time}`,width/2-100,height-250);
      noLoop();
    }
  }

  //vypis ve hře + score - během hry
  textSize(20);
  fill(255)
  text(`Score: ${time}`,width-125,height-670);
  text(`HP: ${health}`,width-250, height-670);
  text(`Speed: ${speed}`,width-400,height-670);
  
}
