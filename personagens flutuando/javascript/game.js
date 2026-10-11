var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
// for keyboard controls
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spaceBarPressed = false;

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function get_rand_color()
{
    var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while(color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
}

function get_rand_size() {
    var size = Math.floor(Math.random() * 150 + 100);
    return size ;
  }

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
		function keyDownHandler(e) {
	    if(e.keyCode == 39) {
        rightPressed = true;
	    }
 	   else if(e.keyCode == 37) {
        leftPressed = true;
    }
       else if(e.keyCode == 38) {
        upPressed = true;
    }
       else if(e.keyCode == 40) {
        downPressed = true;
    }
       else if(e.keyCode === 32) {
        spaceBarPressed = true;
  	  }
	}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
  	  }

  	else if(e.keyCode == 38) {
        upPressed = false;
  	  }

  	else if(e.keyCode == 40) {
        downPressed = false;
  	  }

  	else if(e.keyCode == 32) {
        spaceBarPressed = false;
  	  }
	}

  function Character(face, skin, cloth, shoe, x, y, z, a, velX, velY, velZ, velA, color, size) {
    this.face = face;
    this.skin = skin;
    this.cloth = cloth;
    this.shoe = shoe;
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = a;
    this.velX = velX;
    this.velY = velY;
    this.velZ = velZ;
    this.velA = velA;
    this.color = color;
    this.size = size;
    this.bodyAngle = 0;
    this.neckAngle = random(-45,45);
    this.hipsAngle = random(-30,30);
    
    this.leftArmAngle = random(0,160);
    this.leftForearmAngle = random(10,90);
    this.leftHandAngle = random(150,200);
    this.rightArmAngle = random(-160,0);
    this.rightForearmAngle = random(-10,-90);
    this.rightHandAngle = random(160,200);
    this.rightLegAngle = random(-70,70);
    this.rightForelegAngle = random(0,120);
    this.rightFootAngle = random(-30,30);
    this.leftLegAngle = random(-70,70);
    this.leftForelegAngle = random(0,120);;
    this.leftFootAngle = random(-30,30);

    
  }

  Character.prototype.draw = function() {
    var size = (this.size + this.z);
    ctx.textAlign = "center";
    var armSize = size * 0.6;
    var forearmSize = size * 0.5;
    var legSize = size * 0.65;
    var forelegSize = size * 0.60;
    var handSize = size * 0.5;
    var buttSize = size * 0.8;
    var headSize = size * 0.9;
    var leftShoulderX = this.x  - size * 0.5 ;
    var leftShoulderY = this.y - size;
    var rightShoulderX = this.x + size * 0.5;
    var rightShoulderY = this.y - size;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = (size * 0.1);
    ctx.fillStyle = this.skin;

//rotation Character
ctx.save();
ctx.translate(this.X, this.Y);
//ctx.rotate(this.a * Math.PI / 180);
ctx.save();

this.drawLeftArm = function(){
  ctx.font = (armSize * 1.5) + "px serif";
  ctx.textBaseline = "hanging"; 
  ctx.save();
  ctx.translate(leftShoulderX, leftShoulderY);
  ctx.rotate(this.leftArmAngle * Math.PI / 180);
  ctx.strokeText("❙", 0, 0 );
  ctx.save();
  ctx.translate(0, armSize);
  ctx.rotate(this.leftForearmAngle * Math.PI / 180);
  ctx.font = (forearmSize* 1.5) + "px serif";
  ctx.strokeText("❙", 0, 0);
  ctx.save();
  ctx.translate(0, forearmSize);
  ctx.rotate(this.leftHandAngle * Math.PI / 180);
  ctx.textBaseline = "bottom";
  ctx.font = handSize + "px serif";
  ctx.fillText("🤚", 0, 0);
  ctx.restore();
  ctx.textBaseline = "hanging"; 
  ctx.font = (forearmSize* 1.5) + "px serif";
  ctx.fillText("❙", 0, 0);
  ctx.restore();
  ctx.font = (armSize * 1.5) + "px serif";
  ctx.fillText("❙", 0, 0 );
  ctx.restore();
}
this.drawLeftArm();
//rightARM
this.drawRightArm = function(){
  ctx.save();
  ctx.translate(rightShoulderX, rightShoulderY);
  ctx.rotate(this.rightArmAngle * Math.PI / 180);
  ctx.strokeText("❙", 0, 0);
  ctx.save();
  ctx.translate(0, armSize);
  ctx.rotate(this.rightForearmAngle * Math.PI / 180);
  ctx.font = (forearmSize* 1.5) + "px serif";
  ctx.strokeText("❙", 0, 0);
  ctx.save();
  ctx.translate(0, forearmSize);
  ctx.rotate(this.rightHandAngle * Math.PI / 180);
  ctx.textBaseline = "bottom";
  ctx.font = handSize + "px serif";
  ctx.fillText("✋", 0, 0);
  ctx.restore();
  ctx.textBaseline = "hanging"; 
  ctx.font = (forearmSize * 1.4) + "px serif";
  ctx.fillText("❙", 0, 0);
  ctx.restore();
  ctx.font = armSize * 1.4 + "px serif";
  ctx.fillText("❙", 0, 0 );
  ctx.restore();
}
this.drawRightArm();
//hips
    ctx.fillStyle = this.color;
    ctx.font = buttSize + "px serif";
    ctx.textBaseline = "hanging"; 
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.hipsAngle * Math.PI / 180);
    ctx.strokeText("▀", 0, 0);
    ctx.save();
  //rightLeg
  this.drawRightLeg = function(){
    if (this.velX < 0){
      ctx.scale(-1, 1);
    }
    ctx.translate((size * 0.2) , (size * 0.2));
    ctx.rotate(this.rightLegAngle * Math.PI / 180);
    ctx.font = (legSize* 1.5) + "px serif";
    ctx.strokeText("❚", 0, 0);
    ctx.save();
    ctx.translate(0, legSize);
    ctx.rotate(this.rightForelegAngle * Math.PI / 180);
    ctx.font = (forelegSize* 1.5) + "px serif";
    ctx.strokeText("❚", 0, 0);
    ctx.save();
    ctx.translate(0, forelegSize * 0.7);  
    ctx.rotate(this.rightFootAngle * Math.PI / 180);
    ctx.textBaseline = "center"; 
    ctx.textAlign = "center";
  
    ctx.font = forelegSize + "px serif";
    ctx.fillText(this.shoe, ( size * 0.1), 0);
    ctx.restore();
    ctx.font = (forelegSize* 1.5) + "px serif";
    ctx.textBaseline = "hanging"; 
    ctx.textAlign = "center";
    ctx.fillText("❚", 0, 0);
    ctx.restore();
    ctx.font = (legSize* 1.5) + "px serif";
    ctx.fillText("❚", 0, 0);
    ctx.restore();
  }
  this.drawRightLeg();
  ctx.save();

  this.drawLefttLeg = function(){
    if (this.velX < 0){
      ctx.scale(-1, 1);
    }
    ctx.translate((-size * 0.2) , (size * 0.2))
    ctx.rotate(this.leftLegAngle * Math.PI / 180);
    ctx.save();
    ctx.font = (legSize* 1.5) + "px serif";
    ctx.strokeText("❚", 0, 0);
    ctx.translate(0, legSize);
    ctx.save();
    ctx.rotate(this.leftForelegAngle * Math.PI / 180);
    ctx.font = (forelegSize* 1.5) + "px serif";
    ctx.strokeText("❚", 0, 0);
    ctx.save();
    ctx.translate(0, forelegSize* 0.5);
    ctx.rotate(this.leftFootAngle * Math.PI / 180);
    ctx.textAlign = "center";
    ctx.textBaseline = "center"; 

    ctx.font = forelegSize + "px serif";
    ctx.fillText(this.shoe, (size * 0.1), 0);
    ctx.scale(1, 1);
    
    ctx.font = (forelegSize* 1.5) + "px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "hanging"; 
    ctx.restore();
    ctx.fillText("❚", 0, 0);
    
    ctx.restore();
    ctx.restore();
    
    ctx.font = (legSize* 1.5) + "px serif";
    ctx.fillText("❚", 0, 0);
    ctx.restore();
    
    ctx.restore();

  }
  this.drawLefttLeg();

  ctx.textBaseline = "hanging"; 
  ctx.font = buttSize  + "px serif";
  ctx.save();
  ctx.translate(this.x, this.y)
  ctx.rotate(this.hipsAngle * Math.PI / 180);
  ctx.fillText("▀", 0, 0);
  ctx.restore();
  ctx.restore();
  

  ctx.font = (this.size + this.z) + "px serif";
  ctx.textBaseline = "bottom";
  ctx.fillText(this.cloth, this.x, this.y);
  ctx.save();
  ctx.translate(this.x, (this.y - this.z -this.size));
  ctx.rotate(this.neckAngle* Math.PI / 180);
  ctx.font = (headSize) + "px serif";
  ctx.fillText(this.face, 0, 0);
  ctx.restore();

  //
  
  
  ctx.restore();
 ctx.restore();
  }

  Character.prototype.control = function() {
    if (rightPressed){
this.velX += 1;
    }


  }

  Character.prototype.update = function() {
    if(this.x > width) {
      this.velX = -(this.velX);
      this.rightForelegAngle = 0;
      this.leftForelegAngle = 0;
      this.rightLegAngle = 0;
      this.leftLegAngle = 0;
    }
  
    if(this.x < 0) {
      this.velX = -(this.velX);
      this.rightForelegAngle = 0;
      this.leftForelegAngle = 0;
      this.rightLegAngle = 0;
      this.leftLegAngle = 0;
    }
  
    if(this.y >= height) {
      this.velY = 0;
    }
  
    if(this.y <= 0) {
      this.velY = -(this.velY);
    }

    if((this.z + this.size) >= 400) {
      this.velZ = -(this.velZ);
    }
  
    if((this.z + this.size) <= 20) {
      this.velZ = -(this.velZ);
    }

    if(this.a >= 720) {
      this.velA = -(this.velA);
    }
  
    if((this.a) <= -720) {
      this.velA = -(this.velA);
    }
  
    this.x += this.velX;
    this.y += this.velY;
    this.z += this.velZ;
    this.a += this.velA;

    this.leftArmAngle += random(-4,4);
    this.leftForearmAngle += (random(-10,10));
    this.leftHandAngle += random(-4,4);
    this.rightArmAngle += random(-4,4);
    this.rightForearmAngle += (random(-10,10));
    this.rightHandAngle += random(-4,4);
    this.rightLegAngle += random(-4,4);
    this.rightForelegAngle += random(-4,4);
    this.rightFootAngle += random(-4,4);
    this.leftLegAngle += random(-4,4);
    this.leftForelegAngle += random(-10,10);
    this.leftFootAngle += random(-4,4);

    if (this.leftArmAngle <= -5 || this.leftArmAngle > 180){
      this.leftArmAngle = 90
    };

    if (this.leftForearmAngle <= -90 || this.leftForearmAngle > 90){
      this.leftForearmAngle = 0
    };

    if (this.leftHandAngle <= 150 || this.leftHandAngle > 200){
      this.leftHandAngle = 150
    };
    
    if (this.rightArmAngle <= -160 || this.rightArmAngle > 0){
      this.rightArmAngle = -160
    };

    if (this.rightForearmAngle <= -90 || this.rightForearmAngle > -90){
      this.rightForearmAngle = -10
    };

    if (this.rightHandAngle <= 160 || this.rightHandAngle > 200){
      this.rightHandAngle = 160
    };

    if (this.rightLegAngle <= -70 || this.rightLegAngle > 40){
      this.rightLegAngle = 0
    }; 

    if (this.rightForelegAngle <= 0 || this.rightForelegAngle > 120){
      this.rightForelegAngle = 50
    }; 
    
    if (this.rightFootAngle <= -10 || this.rightFootAngle > 60){
      this.rightFootAngle = -10
    }; 


    if (this.leftLegAngle <= -70 || this.leftLegAngle > 70){
      this.leftLegAngle = -70
    }; 
    
    if (this.leftForelegAngle <= 0 || this.leftForelegAngle > 120){
      this.leftForelegAngle = 50
    }; 

    if (this.leftFootAngle <= -10 || this.leftFootAngle > 60){
      this.leftFootAngle = -10
    }; 
    
  };

function drawScene(){
  ctx.textAlign = "start";
  ctx.textBaseline = "Botton"; 
  ctx.font = 600  + "px serif";
  ctx.fillText("🏡", this.width / 2, this.height / 2 );
  ctx.font = this.width  + "px serif";
  ctx.fillStyle = "#0fc83d";
  ctx.fillText("▬", 0, this.height * 1.25);


}

let characters = [];

  let hero = new Character(
    "😀",
    "#ffc83d",
    "👕", 
    "👟", 
    (width / 2),
    (height / 2),
    0,
    random(-10,10),
    random(-10,10),
    random(-10,10),
    random(-10,10),
    random(-1,1),
    get_rand_color(),
    100
  );
  characters.push(hero);

  let cat = new Character(
    "😼",
    "#ffc83d",
    "🧇", 
    "👢",  
    (width / 2),
    (height / 2),
    0,
    0,
    random(-90,90),
    random(-5,5),
    random(-5,5),
    random(-1,1),
    get_rand_color(),
    100
  );
  characters.push(cat);

  let alien = new Character(
    "👽",
    "#79db75",
    "🦺", 
    "🥾",  
    (width / 2),
    (height / 2),
    0,
    random(-90,90),
    random(-3,3),
    random(-3,3),
    random(-3,3),
    random(-2,2),
    get_rand_color(),
    100
  );
  characters.push(alien);

  let alienMonster = new Character(
    "👾",
    "#886ce4",
    "🧥", 
    "🥾",  
    (width / 2),
    (height / 2),
    0,
    random(-90,90),
    random(-3,3),
    random(-3,3),
    random(-3,3),
    random(-2,2),
    get_rand_color(),
    100
  );
  characters.push(alienMonster);

  let devil = new Character(
    "👿",
    "#f03a17",
    "👔", 
    "👢",  
    (width / 2),
    (height / 2),
    0,
    0,
    random(-90,90),
    random(-5,5),
    random(-5,5),
    random(-1,1),
    get_rand_color(),
    100
  );
  characters.push(devil);

  let muslin = new Character(
    "👳🏾",
    "#8e562e",
    "👔", 
    "👞",  
    (width / 2),
    (height / 2),
    0,
    0,
    random(-90,90),
    random(-3,3),
    random(-3,3),
    random(-1,1),
    get_rand_color(),
    100
  );
  characters.push(muslin);

  let elder = new Character(
    "👨🏿‍🦳",
    "#613d30",
    "👔", 
    "👞",  
    (width / 2),
    (height / 2),
    0,
    0,
    random(-90,90),
    random(-3,3),
    random(-3,3),
    random(-1,1),
    get_rand_color(),
    100
  );
  characters.push(elder);


  let girl = new Character(
    "👧",
    "#ffc83d",
    "👘",  
    "👡", 
    (width / 2),
    (height / 2),
    0,
    0,
    random(-90,90),
    random(-3,3),
    random(-3,3),
    random(-1,1),
    get_rand_color(),
    100
  );
  characters.push(girl);

  let girl2 = new Character(
    "👩🏼‍🦰",
    "#d8b094",
    "👚",  
    "👠", 
    (width / 2),
    (height / 2),
    0,
    0,
    random(-90,90),
    random(-3,3),
    random(-3,3),
    random(-1,1),
    get_rand_color(),
    100
  );
  characters.push(girl2);

  let girl3 = new Character(
    "👱🏻‍♀️",
    "#f7d7c4",
    "👚",  
    "🥿", 
    (width / 2),
    (height / 2),
    0,
    0,
    random(-90,90),
    random(-3,3),
    random(-3,3),
    random(-1,1),
    get_rand_color(),
    100
  );
  characters.push(girl3);

  let pumpkin = new Character(
    "🎃",
    "#f7630c",
    "🎽",  
    "👞", 
    (width / 2),
    (height / 2),
    0,
    0,
    random(-90,90),
    random(-5,5),
    random(-5,5),
    random(-1,1),
    get_rand_color(),
    100
  );
  characters.push(pumpkin);


function loop() {
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(20, 50, 150, 1)';
    ctx.fillRect(0, 0, width, height);
    drawScene();
  function compare(a,b){
    const characterA = a.z;
    const characterB = b.z;

    let comparison = 0;
  if (characterA > characterB) {
    comparison = 1;
  } else if (characterA < characterB) {
    comparison = -1;
  }
  return comparison;
}


characters.sort(compare);

    for (let i = 0; i < characters.length; i++) {
      characters[i].draw();
      characters[i].update();
    }
    


    //characters.hero.control();
    
    
  
    requestAnimationFrame(loop);
  }

  loop();



