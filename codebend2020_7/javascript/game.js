
var x = 1;
var y = 0;
var z = 1;
var r = 1;
var d = 0;
var ctx = document.getElementById("canvas1").getContext('2d');

function get_rand_color()
{
    var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while(color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
}

canvas1.width = window.innerWidth;
canvas1.Heigth = window.innerHeight;

function draw(){
    
    var ctx = document.getElementById("canvas1").getContext('2d');
    ctx. save();
    ctx.translate(canvas1.width / 2, canvas1.height /2);
    var texto = String.fromCodePoint(0x1F000 + y);
    var texto2 = String.fromCodePoint(0x0 + y);
    ctx.strokeStyle = get_rand_color();
    ctx.strokeWidth = "40px arial";
    ctx.fillStyle = get_rand_color();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = z + "px arial";
    ctx.rotate(Math.sin(y)/(Math.sin(d + x * Math.PI / 180) ));
    
    ctx.fillText(texto, Math.floor(z), z);
    ctx.strokeText(texto, Math.floor(z), z);
    
    
    //ctx.fillText(texto2, x, 2 * z);
    //ctx.strokeText(texto, x, 2 * z);
    ctx.rotate(Math.sin(y+x) *Math.PI / 90);

    
    //ctx.fillText(canvas1.width, 11, 11);

   
    ctx.restore();
    
x = x +  r;
z = z + 0.1;
d = d + 90;
y++;   
}

function update(){


    }

function init() { 

    setInterval(draw,20);
    //update();   
    draw();


}

init();

