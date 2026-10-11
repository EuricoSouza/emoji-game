

let size = 70;
let x = (size /2);
let y = (size /2);

var letra = 0x0;
//var ctx = document.getElementById("canvas1").getContext('2d');

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
    ctx.fillStyle = get_rand_color();
    ctx.fillRect(0, 0, 1650, 1050);
    //ctx.translate(canvas1.width / 2, canvas1.height /2);
    
    //var texto2 = String.fromCodePoint(0x0 + y);
    
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    
    //ctx.rotate(10 * Math.floor(Math.random() * 5));
    for (let j = 0; j < 1000; j+=size){
        for (let i = 0; i < 1600 ; i+=size){
            ctx.fillStyle = get_rand_color();
            ctx.font = size + "px arial";
            var texto = String.fromCharCode(letra);
            ctx.fillText(texto, x + i, y + j);
            ctx.fillStyle = "#000000";
            ctx.font = (size / 10) + "px arial";
            ctx.fillText(letra, x + i + (size / 10)  , y + j + (size / 10) );
            letra++;
            
        }
    
    }
    ctx.fillStyle = "#0";
    ctx.font = "50px arial";
    //ctx.fillText(Date(), 900,200);  

    



    
    //ctx.fillText(canvas1.width, 11, 11);

   
    ctx.restore();
  

    
}

function update(){

  

    }

function init() { 

    setInterval(draw,200);
    //update();   
    draw();
    


}

init();

