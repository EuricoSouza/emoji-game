window.onload = function(){
  init();
  //window.addEventListener('resize', init, false);
}

const FONT_NAME = 'NotoColorEmoji.ttf';

function renderText() {
	  let ctx = document.querySelector('canvas').getContext('2d');
    ctx.font = `48px "${FONT_NAME}"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Waka Waka', 150, 50);
}
//document.fonts.load('10pt "EmojiOne"').then(renderText);
document.fonts.load('10pt "NotoColorEmoji"').then(renderText);


var faceTypes = new Array('💀', '💀','😡','😤', '😠', '😭', '😢', '😖', '😵', '😷',
    '😰', '🤢', '🤕', '🤒', '😳', '😨', '😬', '😧', '😦', '🙁', '😒', '😯', '😮',
    '😐', '😶', '🙄', '😏', '😌', '🙂', '😊', '😁', '😅', '😂', 
    '😆', '😎','😛', '😜', '😝', '😍', '😘', '😙', '😚', '😗', '😴', '🤑', 
    '🙃', '😱', '🤧', '🤤');

    var foodTypes = new Array("🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍐", 
    "🍑", "🍒", "🍓", "🥝", "🍅", "🥑", "🥜", "🌰",
    '🍆', '🥒', '🥕', '🌽', '🌶', '🥔', '🍠',
    '🍔', '🍕', '🌭', '🍟', '🍿', '🥙', '🌮', '🌯', 
    '🍗', '🍖', '🍤', '🥓', '🧀', '🥗', '🍣',
    '🍬', '🍭', '🍫', '🍮', '🍦', '🍧', '🍨', '🍩',
    '🍰', '🍪', '🍢', '🍡', '🎂', '🍯');

    var boozeTypes = new Array('🍹', '🍸', '🥃', '🍺', '🍷', '🍶', '🍾');

var treeTypes = new Array(
        ['🌲', 180],
        ['🌳', 225],
        ['🌴', 180],
        ['🌵', 80],
        ['🌻', 30],
        ['🌼', 30],
        ['🌷', 30],
        ['🍄', 30]);

var moonTypes = new Array('🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', 
    '🌙', '🌚', '🌛', '🌝', '🌜' );

var starTypes = new Array('⭐', '🌟', '✳', '·', '✦', '✫', '*', '˚', '+', 
    '🟉', '🟄', '✴', '🟎');

var buildingTypes = new Array('🏘', '🕍', '🏠', '🏡', '🏚', '🎪',
        '🏣', '🏤', '🏥', '🏨', '🏪', '🏫', '🏩', '💒', '⛪', '️',
        '🕌', '🕍', '🏦', '🏢', '🏬');

var carTypes = new Array(
        ['🚗', 200],
        ['🚕', 200],
        ['🚙', 200],
        ['🚌', 220],
        ['🚓', 200],
        ['🚑', 220],
        ['🚒', 220],
        ['🚐', 200],
        ['🚚', 220],
        ['🚛', 220],
        ['🚜', 200],
        ['🚔', 140],
        ['🚍', 170],
        ['🚘', 150],
        ['🚖', 150],
        ['🚎', 210],
        ['🏍', 120],
        ['🏎', 200]);

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var width = window.innerWidth;
var height = window.innerHeight;

// for keyboard controls
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spaceBarPressed = false;

var w = 0;
var relativeX;

ctx.font = "NotoColorEmoji";

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

  function Tree(type, size, x, y, z){
    this.type = type;
    this.size = size;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  Tree.prototype.draw = function(){
    var size = (this.size + this.z);
    ctx.textAlign = "center";
    ctx.textBaseline = "botton"; 
    ctx.font = size + "50px NotoColorEmoji";
    ctx.fillText("🌳", this.x, this.y);  
  }

  function Character(face, skin, cloth, shoe, x, y, z, a, velX, velY, velZ, velA, clothColor, clothColor2, size) {
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
    this.clothColor = clothColor;
    this.clothColor2 = clothColor2;
    this.size = size;
    this.relativeX = 0;
    this.neckAngle = 0;
    this.hipsAngle = 0;
    
    this.leftArmAngle = 0;
    this.leftForearmAngle = 0;
    this.leftHandAngle = 180;
    this.rightArmAngle = 0;
    this.rightForearmAngle = 0;
    this.rightHandAngle = 180;
    this.rightLegAngle = 0;
    this.rightForelegAngle = 0;
    this.rightFootAngle = 0;
    this.leftLegAngle = 0;
    this.leftForelegAngle = 0;
    this.leftFootAngle = 0;
  }

  // Character.prototype.animate = function(){
  //   this.a = random(-1,1)
  //   this.neckAngle = random(-45,45);
  //   this.hipsAngle = 0;
  //   this.leftArmAngle = random(0,16);
  //   //this.leftForearmAngle = random(10,90);
  //   this.leftHandAngle = 0;
  //   this.rightArmAngle = random(-16,0);
  //   //this.rightForearmAngle = random(-10,-90);
  //   this.rightHandAngle = 0;
  //   this.rightLegAngle = 0;
  //   //this.rightForelegAngle = 0;
  //   this.rightFootAngle = random(-30,30);
  //   this.leftLegAngle = 0;
  //   //this.leftForelegAngle = 0;
  //   this.leftFootAngle = random(-30,30);
  // }

  Character.prototype.draw = function() {
    var size = (this.size + this.z);
    var y = (this.y + this.z)
    ctx.textAlign = "center";
    var armSize = size * 0.8;
    //var forearmSize = size * 0.5;
    var legSize = size * 0.9;
    var forelegSize = size * 0.60; //se tirar essa linha fode
    var handSize = size * 0.40;
    var buttSize = size * 0.8;
    var headSize = size * 0.7;
    var leftShoulderX = this.x  - size * 0.4 ;
    var leftShoulderY = this.y - size * 0.7;
    var rightShoulderX = this.x + size * 0.4;
    var rightShoulderY = this.y - size* 0.7;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = (size * 0.1);
    
//rotation Character
ctx.save();
ctx.translate(this.x, y);
ctx.save();
ctx.translate(this.x, y);
ctx.rotate(this.a * Math.PI / 180);
ctx.translate(-this.x, -y);
ctx.save();

this.drawLeftArm = function(){
  ctx.font = (armSize * 1.5) + "px serif";
  ctx.textBaseline = "hanging"; 
  ctx.save();
  if (this.velX < 0){
    ctx.translate(leftShoulderX + size * 0.1, leftShoulderY);
    ctx.scale(-1, 1);
  } else if (this.velX > 0) {
    ctx.translate(leftShoulderX + size * 0.15, leftShoulderY);
  } else {
    ctx.translate(leftShoulderX, leftShoulderY);
  }
  ctx.rotate(this.leftArmAngle * Math.PI / 180);
  ctx.textBaseline = "middle";
  ctx.fillStyle = this.clothColor2;
  //ctx.strokeText("•", 0, 0);
  ctx.fillText("•", 0, 0);  
  ctx.textBaseline = "hanging";
  ctx.fillStyle = this.skin;
  ctx.fillText("❙", 0, 0 );
  ctx.save();
  ctx.translate(0, armSize);
  // ctx.rotate(this.leftForearmAngle * Math.PI / 180);
  // ctx.font = (forearmSize* 1.5) + "px serif";
  // ctx.strokeText("❙", 0, 0);
  this.drawLeftHand = function(){
    ctx.save();
    //ctx.translate(0, armSize);
    ctx.font = handSize + "px NotoColorEmoji";
    ctx.textBaseline = "middle";
    ctx.font = "NotoColorEmoji";
    if('1'){
      
      if (this.velX < 0){
        ctx.rotate(this.leftHandAngle + 210 * Math.PI / 180);
        ctx.scale(-1, 1);
        ctx.fillText("🤛",  - handSize * 0.2, handSize * 0.2);
        ctx.scale(1, 1);
      } else {
        ctx.rotate(this.rightHandAngle + 30* Math.PI / 180);
        ctx.fillText("🤛", - handSize * 0.1, handSize * 0.2);
      }
    } else if (this.velX = 0){
      ctx.rotate(this.leftHandAngle * Math.PI / 180);
      if (this.velX < 0){
        ctx.scale(-1, 1);
        ctx.fillText("✋",  handSize * 0.2, 0);
        ctx.scale(1, 1);
      } else {
        ctx.fillText("🤚", - handSize * 0.2, 0);
      }
    }

    
    ctx.restore();
  }
this.drawLeftHand();

  // ctx.textBaseline = "hanging"; 
  // ctx.font = (forearmSize* 1.5) + "px NotoColorEmoji";
  // ctx.fillText("❙", 0, 0);
  ctx.restore();
  ctx.font = (armSize * 1.5) + "px NotoColorEmoji";
  ctx.fillText("❙", 0, 0 );
  ctx.restore();
}

//rightARM
this.drawRightArm = function(){
  ctx.font = (armSize * 1.5) + "px serif";
  ctx.save();
  if (this.velX < 0){
    ctx.translate(rightShoulderX - size * 0.1, rightShoulderY);
    ctx.scale(-1, 1);
  } else if (this.velX > 0) {
    ctx.translate(rightShoulderX - size * 0.15, rightShoulderY);
  } else {
    ctx.translate(rightShoulderX, rightShoulderY);
  }
  ctx.rotate(this.rightArmAngle * Math.PI / 180);
  ctx.textBaseline = "middle";
  ctx.fillStyle = this.clothColor2;
  //ctx.strokeText("•", 0, 0);
  ctx.fillText("•", 0, 0);  
  ctx.textBaseline = "hanging";
  ctx.fillStyle = this.skin;
  ctx.fillText("❙", 0, 0);
  ctx.save();
  // ctx.translate(0, armSize);
  // ctx.rotate(this.rightForearmAngle * Math.PI / 180);
  // ctx.font = (forearmSize* 1.5) + "px NotoColorEmoji";
  // ctx.strokeText("❙", 0, 0);
  this.drawRightHand = function(){
    ctx.save();
    ctx.translate(0, armSize);
    ctx.rotate(this.rightHandAngle * Math.PI / 180);
    ctx.textBaseline = "middle";
    ctx.font = handSize + "px NotoColorEmoji";
    if (1){
      if (this.velX < 0){
        ctx.rotate(this.rightHandAngle + 215* Math.PI / 180);
        ctx.fillText("🤛", - handSize * 0.2, handSize * 0.2);
      } else {
          ctx.scale(-1, 1);
          ctx.rotate(this.rightHandAngle + 210* Math.PI / 180);
          ctx.fillText("🤛",  handSize * 0.1, handSize * 0.2);
          ctx.scale(1, 1);
        }
      }

    if (0){
      if (this.velX <= 0){
        ctx.rotate(this.rightHandAngle * Math.PI / 180);
        ctx.fillText("🤚", - handSize * 0.2, 0);
      } else {
        ctx.scale(-1, 1);
        ctx.fillText("✋",  handSize * 0.2, 0);
        ctx.scale(1, 1);
      }

    }
    
    ctx.restore();
  }
  this.drawRightHand();

  // ctx.textBaseline = "hanging"; 
  // ctx.font = (forearmSize * 1.4) + "px NotoColorEmoji";
  // ctx.fillText("❙", 0, 0);
  ctx.restore();
  ctx.font = armSize * 1.4 + "px NotoColorEmoji";
  ctx.fillText("❙", 0, 0 );
  ctx.restore();
}

//hips
this.drawHips = function(){
  ctx.fillStyle = this.clothColor;
    ctx.font = buttSize + "px serif";
    ctx.textBaseline = "hanging"; 
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.hipsAngle * Math.PI / 180);
    //ctx.strokeText("▀", 0, 0);
    ctx.save();



  //rightLeg
  this.drawRightLeg = function(){
    
    ctx.translate((-size * 0.15) , (size * 0.2));
    if (this.velX <= 0){
      ctx.scale(-1, 1);
    }
    ctx.rotate(this.rightLegAngle * Math.PI / 180);
    ctx.font = (legSize* 1.5) + "px NotoColorEmoji";
    ctx.fillText("❚", 0, 0);
    ctx.save();
    ctx.translate(0, legSize);
    // ctx.rotate(this.rightForelegAngle * Math.PI / 180);
    // ctx.font = (forelegSize* 1.5) + "px NotoColorEmoji";
    // ctx.strokeText("❚", 0, 0);
    ctx.save();
    // ctx.translate(0, forelegSize * 0.7);  
    ctx.rotate(this.rightFootAngle * Math.PI / 180);
    ctx.textBaseline = "center"; 
    ctx.textAlign = "center";
  
    ctx.font = forelegSize + "px NotoColorEmoji";
    ctx.fillText(this.shoe, ( size * 0.15), 0);
    ctx.restore();
    // ctx.font = (forelegSize* 1.5) + "px NotoColorEmoji";
    // ctx.textBaseline = "hanging"; 
    // ctx.textAlign = "center";
    // ctx.fillText("❚", 0, 0);
    ctx.restore();
    // ctx.font = (legSize* 1.5) + "px NotoColorEmoji";
    // ctx.fillText("❚", 0, 0);
    ctx.restore();
  }
  
  ctx.save();

  this.drawLefttLeg = function(){

    ctx.translate((size * 0.15) , (size * 0.2))
    if (this.velX < 0){
      ctx.scale(-1, 1);
    }
    ctx.rotate(this.leftLegAngle * Math.PI / 180);
    ctx.save();
    ctx.font = (legSize* 1.5) + "px NotoColorEmoji";
    ctx.fillText("❚", 0, 0);
    ctx.translate(0, legSize);
    ctx.save();
    // ctx.rotate(this.leftForelegAngle * Math.PI / 180);
    // ctx.font = (forelegSize* 1.5) + "px NotoColorEmoji";
    // ctx.strokeText("❚", 0, 0);
    // ctx.save();
    // ctx.translate(0, forelegSize* 0.7);
    ctx.rotate(this.leftFootAngle * Math.PI / 180);
    ctx.textAlign = "center";
    ctx.textBaseline = "center"; 
    ctx.font = forelegSize + "px NotoColorEmoji";
    ctx.fillText(this.shoe, (size * 0.15), 0);
    // ctx.font = (forelegSize* 1.5) + "px NotoColorEmoji";
    // ctx.textAlign = "center";
    // ctx.textBaseline = "hanging"; 
    // ctx.restore();
    // ctx.fillText("❚", 0, 0);
    ctx.restore();
    ctx.restore();
    
    ctx.font = (legSize* 1.5) + "px NotoColorEmoji";
    ctx.fillText("❚", 0, 0);
    ctx.restore();
    ctx.restore();
    

  }

  if (this.velX < 0){
    this.drawRightLeg();
    this.drawLefttLeg();
  } else {
    this.drawLefttLeg();
    this.drawRightLeg();
  }

  ctx.textBaseline = "hanging"; 
  ctx.font = buttSize  + "px serif";
  ctx.save();
  ctx.translate(this.x, this.y)
  ctx.rotate(this.hipsAngle * Math.PI / 180);
  ctx.fillText("▀", 0, 0);
  
  ctx.restore();
  
  ctx.restore();

}
  
  this.drawCloth = function(){
    ctx.translate(this.x, this.y);
    ctx.font = (this.size + this.z) + "px serif";
    ctx.textBaseline = "bottom";
    // if (this.cloth == "▮") {
    //   ctx.strokeText(this.cloth, 0, 0);
    // }
    ctx.fillStyle = this.clothColor2;
    ctx.fillText(this.cloth, 0, 0);
    ctx.fillStyle = "#e0e0eb";
    ctx.font = (forelegSize * 0.75) + "px serif";
    if (this.velX > 0){
      ctx.fillText("Ⓐ", size * 0.1, - size * 0.4);
    } else if (this.velX < 0){
      ctx.fillText("Ⓐ", - size * 0.1, - size * 0.4);
    } else {
      ctx.fillText("Ⓐ", 0, - size * 0.4);
    }
  
    ctx.restore();
  }

  if (this.velX < 0){
    this.drawLeftArm();
    this.drawCloth();
    this.drawHips();
    this.drawRightArm();
  } else {
    this.drawRightArm();
    this.drawCloth();
    this.drawHips();
    this.drawLeftArm(); 
  }
 
  ctx.translate(this.x, (this.y - this.z -this.size));
  ctx.textBaseline = "bottom";
  ctx.rotate(this.neckAngle* Math.PI / 180);
  ctx.font = (headSize) + "px NotoColorEmoji";
  if (this.velX < 0){
    ctx.scale(-1, 1);
  }
  if (this.face == "🙂"){
    
    ctx.fillText(this.face, 0, (size * 0.1));
    ctx.font = (headSize* 0.6) + "px serif";
    ctx.fillStyle = 'black';
    ctx.strokeText("⋘", 0, -(size * 0.5));
    ctx.fillText("⋘", 0, -(size * 0.5));
    ctx.font = (headSize ) + "px serif";
    
  } else {
    ctx.fillText(this.face, 0, (size * 0.1)); 
  }
  ctx.scale(1, 1);
  ctx.restore();
  
  
  }

  Character.prototype.control = function() {
    if (rightPressed && this.velX < 8){
      this.velX = this.velX + 0.1 ;
    }
    if (leftPressed && this.velX > -8){
      
      this.velX = this.velX - 0.1 ;
          }
  
    if (upPressed){
      this.velZ = this.velZ - (this.size * 0.001);
    } else if (downPressed){
      this.velZ = this.velZ + (this.size * 0.001);
    } else {
      this.velZ = 0;
    }

    if (downPressed){
      this.velZ = this.velZ + (this.size * 0.0001);
    }

    if (spaceBarPressed){
      this.velY =  this.velY -0.1 ;
    }
  


}

Character.prototype.updateNPC = function() {
  //this.x -= hero.velX /20;
}


  Character.prototype.update = function() {

  

 if((this.z + this.size) >= 300) {
  this.velZ = -(this.velZ);
}

if((this.z + this.size) <= 20) {
  this.velZ = -(this.velZ);
}

    this.relativeX += this.velX;
    this.y += this.velY;
    this.z += this.velZ;
    this.a += this.velA;
    this.x += this.velX;
    
 

    

    if (this.velX != 0){
      this.leftArmAngle = (7 * this.velX * Math.sin(w));
      //this.leftForearmAngle = -40 + (6 * this.velX * Math.sin(w));
      //this.leftHandAngle += random(-1,1);
      this.rightArmAngle = - (7 * this.velX * Math.sin(w));
      //this.rightForearmAngle = -40 - (6 * this.velX * Math.sin(w));;
      //this.rightHandAngle += random(-1,1);
      this.rightLegAngle =  - (6 * this.velX * Math.sin(w));
      //this.rightForelegAngle = 38 - (7 * this.velX * Math.sin(w+180));
      this.rightFootAngle = -15 + (7 * this.velX * Math.sin(w));
      this.leftLegAngle = 15 + (6 * this.velX * Math.sin(w));
      //this.leftForelegAngle = 38 + (7 * this.velX * Math.sin(w+180));
      this.leftFootAngle =   - (7 * this.velX * Math.sin(w));
      this.y -= Math.cos(w) *0.3 ;
      w = w + this.velX * 0.015;
    }



    return relativeX;
    
  };

Character.prototype.drawScene = function (){
 
  ctx.save();
  // ctx.textAlign = "center";
  // ctx.textBaseline = "botton"; 

  // ctx.fillText("🛸", -280 - this.relativeX / 40, 120);
  // ctx.fillStyle = "#0fc83d";
  // ctx.fillText( window.innerWidth + " " + window.innerHeight , this.width / 2, this.height / 2 );
  // ctx.font = 900  + "px NotoColorEmoji";
  // ctx.fillText("⛰", -8000 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", -300 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", 700 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", 2800 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", 5600 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", 7900 - this.relativeX / 40, 510);

  // ctx.font = 900  + "px segoeui";
  // ctx.fillText("⛰", -1000 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", -500 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", 500 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", 2500 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", 5000 - this.relativeX / 40, 510);
  // ctx.fillText("⛰", 7500 - this.relativeX / 40, 510);
  
  // ctx.font = 150  + "px NotoColorEmoji";
  // ctx.fillText("🏢", -1000 - this.relativeX / 8, 555);
  // ctx.fillText("🌳", -500 - this.relativeX / 8, 555);
  // ctx.fillText("🏡", 500 - this.relativeX / 8, 555);
  // ctx.fillText("🌳", 2500 - this.relativeX / 8, 555);
  // ctx.fillText("🌴", 5000 - this.relativeX / 8, 555);
  // ctx.fillText("🌳", 7500 - this.relativeX / 8, 555);

  // ctx.font = 150  + "px segoeui";
  // ctx.fillText("🏢", -8000 - this.relativeX / 8, 555);
  // ctx.fillText("🌳", -300 - this.relativeX / 8, 555);
  // ctx.fillText("🏡", 400 - this.relativeX / 8, 555);
  // ctx.fillText("🌳", 2700 - this.relativeX / 8, 555);
  // ctx.fillText("🌴", 4000 - this.relativeX / 8, 555);
  // ctx.fillText("🌳", 6500 - this.relativeX / 8, 555);

  // ctx.font = 300  + "px OpenMoji-Color";
  // ctx.fillText("🌳", -500 - this.relativeX / 4, 560);
  // ctx.fillText("🏡", 500 - this.relativeX / 4, 560);
  // ctx.fillText("🌳", 2500 - this.relativeX / 4, 560);
  // ctx.fillText("🌴", 5000 - this.relativeX / 4, 560);
  // ctx.fillText("🌳", 7500 - this.relativeX / 4, 560);
  // ctx.font = 125  + "px NotoColorEmoji";
  // ctx.fillText("🚗", 1550 - this.relativeX / 4, 575);
  // ctx.font = 600  + "px NotoColorEmoji";
  // ctx.fillText("🌲", -14000 - this.relativeX / 4, 575);
  // ctx.fillText("🌲", -12000 - this.relativeX / 4, 575);
  // ctx.fillText("🌲", -10000 - this.relativeX / 4, 575);
  // ctx.fillText("🏢", -1000 - this.relativeX / 2, 575);
  // ctx.fillText("🌳", -500 - this.relativeX / 2, 570);
  // ctx.fillText("🏡", 500 - this.relativeX / 2, 570);
  // ctx.fillText("🏠", 1750 - this.relativeX / 2, 570);
  
  // ctx.fillText("🏠", 2250 - this.relativeX / 2, 570);
  // ctx.fillText("🌳", 3500 - this.relativeX / 2, 570);
  // ctx.fillText("🏠", 4750 - this.relativeX / 2, 570);
  // ctx.fillText("🌳", 7000 - this.relativeX / 2, 570);
  // ctx.fillText("🌳", 9500 - this.relativeX / 2, 570);
  // ctx.font = 1200  + "px OpenMoji-Color";
  // ctx.fillText("🏪", -17000 - this.relativeX, 590);
  // ctx.fillText("🏬", -15000 - this.relativeX, 590);
  // ctx.fillText("🌲", -14000 - this.relativeX, 590);
  // ctx.fillText("🏠", -12000 - this.relativeX, 590);
  // ctx.fillText("🌲", -10000 - this.relativeX, 590);
  // ctx.fillText("🏢", -9000 - this.relativeX, 590);
  // ctx.fillText("🏠", -5000 - this.relativeX, 590);
  // ctx.fillText("🏠", -2500 - this.relativeX, 590);
  // ctx.fillText("🌳", -500 - this.relativeX, 590);
  // ctx.fillText("🏡", 500 - this.relativeX, 590);
  // ctx.fillText("🌳", 2500 - this.relativeX, 590);
  // ctx.fillText("🌳", 5000 - this.relativeX, 590);
  // ctx.fillText("🌳", 7500 - this.relativeX, 590);
  // ctx.font = 600  + "px OpenMoji-Color";
  // ctx.fillText("🚗", 1550 - this.relativeX, 660);
  // ctx.textBaseline = "alphabetic"; 
  // ctx.font = 100  + "px segoeui";
  ctx.fillText('ᚙ𐰕', 4044 - this.relativeX / 4000, 200);
 

}

let characters = [];

  let hero = new Character(
    "🙂",
    "rgb(247, 220, 45)",
    "▮", 
    "👟", 
    400, //x onde aparece o personagem
    300, //y onde aparece o personagem
    0,
    0,
    0,
    0,
    0,
    0,
    "#0066cc",
    "#666699",
    60 //tamanho que aparece o personagem
  );


  function camera() {

    
  }

  function update(){
    this.x = this.velX;

  }


function loop() {
  
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  
  ctx.font = "NotoColorEmoji";
    ctx.fillStyle = 'rgb(95, 38, 203)'; // sky color
    ctx.fillRect(0, 0, innerWidth, 600); // proportion of sky/ground
    ctx.fillStyle = 'rgb(23, 143, 115)'; // Ground color
    ctx.fillRect(0,600, innerWidth, innerHeight);
    hero.drawScene();

    
    //this.camera();
    hero.draw();
    hero.control();
    hero.update();
    //renderText();
  
    requestAnimationFrame(loop);
  }

  loop();



