let pageNum = 1; //declare a variable to hold current page number (current state)
let numPages = 5; //declare a variable to hold total number of pages (states)
let sunCol;

//declare variable for vector object globally
let starField = [];
let numStars = 200;
var drop = [];

var lightning = [];
var offset = 80;
var gens = 6;

//sound
var ThunderSound;


function preload(){
  ThunderSound=loadSound("zapsplat_nature_thunder_crack_designed_001_31228.mp3");
}


function setup() {
  createCanvas(400, 400);
  console.log(pageNum); //during setup, print current page (zero)

  for (let i = 0; i < numStars; i++) {
    starField[i] = createVector(
      random(0, width),
      random(0, height),
      random(0, 255)
    );
  }
  for (var i = 0; i < 200; i++) {
    drop[i] = new Drop();
  }
  
 
  var startPoint = createVector(width/2, 20);
  var endPoint = createVector(width/2, 700);
  
  generateLightning(startPoint, endPoint);

  
}

function draw() {
  if (pageNum == 1) {
    background(0);
    sunCol = color(67, 70, 84);

    push();
    for (let i = 0; i < numStars; i++) {
      fill(starField[i].z);
      ellipse(starField[i].x, starField[i].y, 2, 2);
      drawScene(true);
    }
  } else if (pageNum == 2) {
    background(112, 177, 255);
    sunCol = color(255, 229, 87);
    drawScene(true);
    
    //body
    fill(255,0,0)
    noStroke()
    rect(240, 244, 20, 20);
    
    
    //head
    fill(210,180,140);
    noStroke();
    ellipse(width*5/8,width*3/5, 30, 30);
    
    //lips
    fill(0);
    stroke(0.5);
    line(245, 248, 257, 248);
    
    //eye1
    fill(0);
    stroke(0.5);
    line(245, 239, 245, 232);
    
    //eye2
    fill(0);
    stroke(0.5);
    line(257, 239, 257, 232);
    
    
    
  
  } else if (pageNum == 3) {
     background(40);
    
    sunCol = color(0);
    drawScene(false);
    if (keyIsPressed === true) {
      if(ThunderSound.isPlaying()==false){
        ThunderSound.play();
        drawScene(false);
      }
     for (var bolt of lightning) {
   bolt.show();
     }
  } else {
    ThunderSound.stop();
    drawScene(false);
  }
 
  


    
    
    
    
    
    
    
  
  
    
    
    
  } else if (pageNum == 4) {
    background(0);
    for (let i = 0; i < 200; i++) {
      drop[i].show();
      drop[i].update();
    }
    drawScene(false);
    
  } else if (pageNum == 5) {
      background(0);
      for (let i = 0; i < 200; i++) {
        drop[i].show();
        drop[i].update();
      }
    drawScene(false);
  }
  if (keyIsPressed === true) {
      if(ThunderSound.isPlaying()==false){
        ThunderSound.play();
        
      }
     for (let bolt of lightning) {
   bolt.show();
     }
  } else {
    ThunderSound.stop();
    
  }
}
function drawScene(sun) {
  // roof
  stroke(0);
  fill(232, 144, 125);
  triangle(
    (width * 17) / 80,
    height / 2,
    (width * 65.4) / 80,
    height / 2,
    (width * 39.4) / 80,
    (height * 18) / 80
  );

  // house
  fill(255, 141, 138);
  rect((width * 21) / 80, height / 2, (width * 1) / 2, height / 2);

  // door
  fill(150, 208, 138);
  stroke(1);
  rect((width * 31) / 80, (width * 3) / 4, (width * 3) / 16, (width * 1) / 4);

  // door knob
  fill(232, 175, 125);
  noStroke();
  ellipse(
    (width * 41) / 100,
    (width * 177) / 200,
    (width * 1) / 40,
    (width * 1) / 40
  );

  if (sun == true){
    // sun
    noStroke();
    fill(sunCol);
    ellipse(
      (width * 3) / 20,
      (width * 3) / 20,
      (width * 3) / 20,
      (width * 3) / 20
    );
  }
  // door rail
  fill(232, 144, 125);
  stroke(1);
  rect(
    (width * 3) / 5,
    (width * 59.8) / 80,
    (width * 3) / 80,
    (width * 21) / 80
  );

  // door rail 2
  fill(232, 144, 125);
  stroke(1);
  rect(
    (width * 13) / 40,
    (width * 59.8) / 80,
    (width * 3) / 80,
    (width * 21) / 80
  );

  // door roof
  stroke(1);
  fill(232, 144, 125);
  triangle(
    (width * 25.8) / 80,
    (width * 3) / 4,
    (width * 51) / 80,
    (width * 3) / 4,
    (width * 19) / 40,
    (width * 3) / 5
  );

  // window
  stroke(1);
  fill(255, 192, 138);
  ellipse((width * 5) / 8, (width * 3) / 5, (width * 1) / 8, (width * 1) / 8);
  line((width * 9) / 16, (width * 3) / 5, 274, (width * 3) / 5);
  line((width * 5) / 8, (width * 43) / 80, (width * 5) / 8, (width * 33) / 50);
}

function Drop() {
  this.x = random(0, width);
  this.y = random(0, -height);

  this.show = function () {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, random(1, 5), random(1, 5));
  };
  this.update = function () {
    this.speed = random(5, 10);
    this.gravity = 1.05;
    this.y = this.y + this.speed * this.gravity;

    if (this.y > height) {
      this.y = random(0, -height);
      this.gravity = 0;
    }
  };
}

function generateLightning(start, end) {
  var maxAngle = 0.5;
  var temp = [];
  
  lightning.push(new Bolt(start, end, 3));
  lightning.push(new Bolt(createVector(width/2, 20), createVector(600, 500), 3));
  temp = lightning.slice();
  
  for (var i = 0; i < gens; i ++) {
    temp = lightning.slice();
    for (var bolt of temp) {
      lightning.splice(lightning.indexOf(bolt), 1);

      var mp = createVector((bolt.start.x + bolt.end.x) / 2, (bolt.start.y + bolt.end.y) / 2); 
      mp.x += random(-offset, offset);
      mp.y += random(-offset, offset);

      lightning.push(new Bolt(bolt.start, mp, bolt.thickness));
      lightning.push(new Bolt(mp, bolt.end, bolt.thickness));
      
      if (random(1) <= 0.5) {
        dir = mp.copy().sub(bolt.start);
        splitEnd = p5.Vector.rotate(dir, random(0, maxAngle)).mult(0.9).add(mp);
        lightning.push(new Bolt(mp, splitEnd, bolt.thickness * 0.4));
      }
    }
    offset/=1.6;
  }
}

//mousePressed() function will run each time the mouse is clicked
function mousePressed() {
  //if the numerical value of the current page is less than the total number of pages, we can increment the pageNum variable's value and move to the next page
  if (pageNum < numPages) {
    pageNum++;
  }

  //otherwise, reset to first page
  else {
    pageNum = 1;
  }

  //after each click, print the current page number to the console
  console.log(pageNum);
}

