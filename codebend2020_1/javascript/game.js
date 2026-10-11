            var x =1;
            var y = 1;
            var z = 0;
            var w = 0;
            var b = 0x0000;
            var leftBtn;
            var rightBtn;


            function get_random_color() 
{
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
}

function get_rand_color()
{
    var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while(color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
}

function get_rand_size()
{
    var size = Math.floor(Math.random() * 100 + 90);
    return size + "px serif" ;
}

function get_rand_size2()
{
    var size = Math.floor(Math.random() * 100 + 40);
    return size + "px serif" ;
}

    function draw(){
             var ctx = document.getElementById("canvas").getContext('2d');
            var texto = b;
            var texto2 = String.fromCodePoint(0x1F000 + Math.floor(b));
            var texto3 = String.fromCodePoint(0x0 + Math.floor(b));
            var i=2;
            


            b++;


            z = Math.floor(Math.random() * 1620 + 10);
            w = Math.floor(Math.random() * 780 + 20);


            ctx. save();

            ctx.font = get_rand_size();
            ctx.fillStyle = get_random_color();
           
            ctx.stroketext = "none";

            ctx.fillText(texto2, z, w);
            ctx.font = get_rand_size() + " symbola";
            ctx.fillStyle = get_random_color();
            
            ctx.fillText(texto3, z, w);
            ctx.font = get_rand_size() + " symbola";
            ctx.fillStyle = get_random_color();
         
            ctx.font = "20px serif";
            ctx.fillText(texto, 300, 300);
/*
            var texto = String.fromCodePoint(0x1F600 + Math.floor(b / 100), 0x1F600 + b, 0x01000 + b, 0x10ffff - b, 0x0000 + b + 0xffff - b, 0x0000 + b, 0x1F900 + Math.floor(b / 10),  );
			var texto2 = String.fromCodePoint(0x1F0A1 + Math.floor(b / 100), 0x1F000 + Math.floor(b / 100) , 0x13000 + Math.floor(b / 10), 0x10ffff - b, 0x0000 + b + 0xffff - b, 0x0000 + b, 0x1F900 + Math.floor(b / 10),  );
			ctx.font = get_rand_size();
*/
            ctx.restore();
    }

    function update(){


    }

        function init() { 

        setInterval(draw,20);
        //window.setTimeout(draw, 1000 / 60);
        update();   
        draw();


        }

    init();