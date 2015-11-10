var Quercia = (function(canvasId) {
	
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d");
    
    var Ben = {
        
         setCanvasDimensions: function(w,h) {
            canvas.width = w || 200;
            canvas.height = h || 200;
        },
        getCanvasDimensions: function() {
            var canvasObject = {
                w: parseInt(canvas.style.width),
                h: parseInt(canvas.style.height)
            };
            return canvasObject;
        },  
        setBGColor: function(val) {
            canvas.style.backgroundColor = val;
        },
        createInitialHelloText: function(message,color) {
    
            var w = message.length; 
            //var canvasWidth = canvas.style.width;
            //var proportion = parseInt(canvasWidth) / w;
            
            context.fillStyle = color || "#000";
            context.font = message.length + "px";
            context.fillText(message,100,75);
        },
        drawCircle: function(x,y,diameter,color,stroke) {
            
            /*
            stroke = stroke || false;
            
            if (!stroke) {
                context.strokeStyle = null;
                context.fillStyle = color;
            } else {
                context.fillStyle = undefined;
                context.strokeStyle = color;
            }
            */
            context.save();
            context.fillStyle = color;
            context.arc(x,y,diameter / 2,0,2 * Math.PI);
            context.fill();
            context.restore();
        },
        drawRect: function(x,y,w,h,color) {
            
            context.save();
            context.fillStyle = color;
            context.fillRect(x,y,w,h);
            context.fill();
            context.restore();
        },
        drawTriangle: function(x1,y1,x2,y2,x3,y3,color) {
        
            context.save();
            context.fillStyle = color;
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.lineTo(x3,y3);
            context.fill();
            context.closePath();
            context.restore();
        },
        drawStar: function(x,y,length,color) {
            
            context.save();
            context.translate(x, y);
            context.rotate((Math.PI * 1 / 10));

            for (var i = 5; i--;) {
                context.lineTo(0, length);
                context.translate(0, length);
                context.rotate((Math.PI * 2 / 10));
                context.lineTo(0, -length);
                context.translate(0, -length);
                context.rotate(-(Math.PI * 6 / 10));
            }
            context.lineTo(0, length);
            context.closePath();
            context.fill();
            context.restore();
        },
        drawImage(name,src,x,y,w,h) {
            
            var name = name || "name";
            name = new Image();
            name.src = src;
            window.onload = function() {
                context.drawImage(name,x,y,w,h);
            }
        }
    }
    
    return Ben;
    
})("myCanvas");

    
// EXAMPLES....

console.log(Quercia.drawImage);
    
Quercia.setCanvasDimensions(400,400);
Quercia.setBGColor("#ff0");
Quercia.createInitialHelloText("Welcome to Quercia","#0b0");
//console.log(Quercia.getCanvasDimensions());
Quercia.drawCircle(170,170,100,"#f00",true);
Quercia.drawRect(10,10,200,50,"#f00");
Quercia.drawTriangle(10,10,50,10,50,80,"#00f");
Quercia.drawStar(200,300,30,"#f00");
Quercia.drawImage("bloop","BenGreen.jpg",250,200,100,100);


