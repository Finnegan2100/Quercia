var Quercia = (function(canvasId) {
	
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d");
    
    var Ben = {
        
        Sprites: [],
        
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
        centerCanvas: function() {
            var halfCanvasWidth = canvas.width;
            var halfCanvasHeight = canvas.height;
            var halfWindowWidth = window.innerWidth / 2;
            var halfWindowHeight = window.innerHeight / 2;
            
            if(canvas.width < window.innerWidth && canvas.height < window.innerHeight) {
                
                canvas.style.marginLeft = (halfWindowWidth) - 
                    (halfCanvasWidth / 2).toString() + "px";
                canvas.style.marginTop = (halfWindowHeight) - 
                    (halfCanvasHeight / 2).toString() + "px";
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                document.documentElement.style.overflow = 'hidden'; 
            }
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
        drawLine: function (x1,y1,x2,y2,width, color, id) {
            
            context.save();
            context.fillStyle = color;
            context.lineWidth = width;
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.stroke();
            context.restore();
                
        },
        drawCircle: function(x,y,diameter,color,stroke) {
     
            context.save();
            context.fillStyle = color;
            context.arc(x,y,diameter / 2,0,2 * Math.PI);
            context.fill();
            context.restore();
        },
        drawRect: function(x,y,w,h,color,name) {
            
            context.save();
            context.fillStyle = color;
            context.fillRect(x,y,w,h);
            context.fill();
            context.restore();
            
            var rect = {id: name, x: x, y: y, w: w, h: h, 
                        color: color};
            
            this.Sprites.push(rect);     
        },
        drawTriangle: function(x1,y1,x2,y2,x3,y3,color, name) {
        
            context.save();
            context.fillStyle = color;
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.lineTo(x3,y3);
            context.closePath();
            context.fill();
            
            context.restore();
            
            var tri = {id: name, x1: x1, y1: y1, x2: x2, y2: y2,
                        y3: y3, color: color};
            
            this.Sprites.push(tri); 
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
        },
        getSpriteById(id) {
    
            for (var i in this.Sprites) {
                if(this.Sprites[i].id === id) {
                    return this.Sprites[i];
                }
            }
        }
    }
    
    return Ben;
    
})("myCanvas");

    
// EXAMPLES....
    
Quercia.setCanvasDimensions(800,600);
Quercia.setBGColor("#bbb");
Quercia.createInitialHelloText("Welcome to Quercia","#0b0");
//console.log(Quercia.getCanvasDimensions());
Quercia.drawCircle(170,170,100,"#f00");
Quercia.drawRect(10,10,200,50,"#f00","myRect");
Quercia.drawRect(320,300,200,50,"#f00","myRect2");
Quercia.drawTriangle(10,10,50,10,50,80,"#00f","myTri");
Quercia.drawStar(200,300,30,"#f00");
Quercia.drawImage("bloop","BenGreen.jpg",250,200,100,100);
Quercia.centerCanvas();
Quercia.getSpriteById("myTri");
Quercia.drawLine(200,200,300,300,10,"#300","myLine");

//console.log(Quercia.Sprites);


