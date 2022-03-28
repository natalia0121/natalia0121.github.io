let bubbleAnimate = false;
let yPos = 0;
let cnv;
let gif_createImg;
let testBubble = [];
let prevMillis = 400;
let interval = 3400;

function preload() {
 
 gif_createImg = createImg("giphy.gif","stewie")
}

function setup() {
  // createCanvas(400, 400);
  noStroke();
  fill(0, 0, 0, 30);
  cnv = createCanvas(600, 700);
 gif_createImg.parent("gifcontainer");
  cnv.parent("container");
  
}

function draw() {
  console. log(mouseX +"," + mouseY);
  clear();

   if (millis() - prevMillis > interval){
    makeSmoke(); //call function
    prevMillis = millis(); //set new prevMillis value
  }

  for (let i = 0; i < 100; i++) {
    if (bubbleAnimate) {
      testBubble[i].move();
      testBubble[i].display();
    }
  }

  gif_createImg.position(50, 50);
}

function makeSmoke() {
  bubbleAnimate = true;
  for (let i = 0; i < 100; i++) {
    let diam = random (20, 150);
    testBubble[i] = new Bubble(495, 310, diam, diam / 80);
  }
}

class Bubble {
  constructor(xIn, yIn, diameter, speedIn) {
    this.x = xIn;
    this.y = yIn;
    this.diameter = diameter;
    this.speed = speedIn;
  }

  move() {
    this.x +=  random(-10, 10);
    this.y -= this.speed;
  }

  display() {
    fill(131, 135, 132,127);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
