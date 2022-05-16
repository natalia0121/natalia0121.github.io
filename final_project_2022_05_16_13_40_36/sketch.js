


var drop = [];

var lightning = [];
var offset = 80;
var gens = 6;


//sound
var ThunderSound;

//may not work onari
// Declare a "SerialPort" object
var serial;

// fill in the name of your serial port here:
//copy this from the serial control app
var portName = "/dev/tty.usbmodem101";

//this array will hold transmitted data
var inMessage = 0;

function preload(){
  ThunderSound=loadSound("zapsplat_nature_thunder_crack_designed_001_31228.mp3");
}


function setup() {
  createCanvas(400, 400);
  
  
  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  // serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  serial.open(portName);

  // When you get a list of serial ports that are available
  // serial.on('list', gotList);

  // When you some data from the serial port
  serial.on('data', gotData);
  
   
  for (var i = 0; i < 200; i++) {
    drop[i] = new Drop();
  } 
  
  var startPoint = createVector(width/2, 20);
  var endPoint = createVector(width/2, 700);
  
  generateLightning(startPoint, endPoint);

  
}


// Got the list of ports
// function gotList(thelist) {
//   // theList is an array of their names
//   for (var i = 0; i < thelist.length; i++) {
//     // Display in the console
//     console.log(i + " " + thelist[i]);
//   }
// }

// Called when there is data available from the serial port


function gotData() {
  var currentString = serial.readLine();  // read the incoming data
  trim(currentString);                    // trim off trailing whitespace
  if (!currentString) return;             // if the incoming string is empty, do no more
  console.log(currentString);
  inMessage=currentString; //reassign data from local var to global var
    //for house
  
  
  
}
 
  


function draw() {
  background(0);

  
  
  for (let i = 0; i < 200; i++) {
      drop[i].show();
      drop[i].update();
    }
  
  if (keyIsPressed === true) {
      if(ThunderSound.isPlaying()==false){
        ThunderSound.play();
      
  } else {
    ThunderSound.stop();
    
  }
}
  
  if (inMessage > 700){ 
  // roof
  stroke(0);
  fill(232,144,125);
  triangle(width*17/80 , height/2, width*65.4/80, height/2, width*39.4/80,height*18/80);
  
  
  // house
  fill(255,141,138);
  rect(width*21/80,height/2, width*1/2, height/2);

  
  // door
  fill(150,208,138);
  stroke(1);
  rect(width*31/80,width*3/4, width*3/16,width*1/4);
  
  // door knob
  fill(232,175,125);
  noStroke();
  ellipse(width*41/100, width*177/200, width*1/40,width*1/40);
  
  
  // door rail
  fill(232,144,125);
  stroke(1);
  rect(width*3/5,width*59.8/80,width*3/80,width*21/80);
  
  // door rail 2
  fill(232,144,125);
  stroke(1);
  rect(width*13/40,width*59.8/80,width*3/80,width*21/80);
  
  // door roof
  stroke(1);
  fill(232,144,125);
  triangle(width*25.8/80,width*3/4, width*51/80,width*3/4,width*19/40,width*3/5);
  
  // window
  stroke(1);
  fill(255,192,138);
  ellipse(width*5/8,width*3/5,width*1/8,width*1/8);  line(width*9/16,width*3/5,274,width*3/5);
  line(width*5/8,width*43/80,width*5/8,width*33/50);
    
 
    
  }
  else{
    // roof
  stroke(0);
  fill(232,144,125);
  triangle(width*17/80 , height/2, width*65.4/80, height/2, width*39.4/80,height*18/80);
  
  
  // house
  fill(255,141,138);
  rect(width*21/80,height/2, width*1/2, height/2);

  
  // door
  fill(150,208,138);
  stroke(1);
  rect(width*31/80,width*3/4, width*3/16,width*1/4);
  
  // door knob
  fill(232,175,125);
  noStroke();
  ellipse(width*41/100, width*177/200, width*1/40,width*1/40);
  
  
  // door rail
  fill(232,144,125);
  stroke(1);
  rect(width*3/5,width*59.8/80,width*3/80,width*21/80);
  
  // door rail 2
  fill(232,144,125);
  stroke(1);
  rect(width*13/40,width*59.8/80,width*3/80,width*21/80);
  
  // door roof
  stroke(1);
  fill(232,144,125);
  triangle(width*25.8/80,width*3/4, width*51/80,width*3/4,width*19/40,width*3/5);
  
  // window
  stroke(1);
  fill(255,192,138);
  ellipse(width*5/8,width*3/5,width*1/8,width*1/8);  line(width*9/16,width*3/5,274,width*3/5);
  line(width*5/8,width*43/80,width*5/8,width*33/50);
    
 for (var bolt of lightning) {
   bolt.show();
  }
    
  }
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