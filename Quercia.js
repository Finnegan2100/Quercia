var Quercia = (function(canvasId) {
	
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d");
    
    
    var Ben = {
        
        Sprites: [],
        
        
        init: function(w,h,color,centered) {
            
            this.setCanvasDimensions(w,h);
            this.setCanvasColor(color);
            
            if (centered) {
                this.centerCanvas();
            }
        },
        setCanvasDimensions: function(w,h) {
            canvas.width = w || 0;
            canvas.height = h || 0;
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
        setCanvasColor: function(val) {
            canvas.style.backgroundColor = val;
        },
        resetFillColor: function() {
            context.fillStyle = "";
        },
        createInitialHelloText: function(message,color) {
    
            var w = message.length; 
            //var canvasWidth = canvas.style.width;
            //var proportion = parseInt(canvasWidth) / w;
            
            context.fillStyle = color || "#000";
            context.font = message.length + "px";
            context.fillText(message,100,75);
        },
        drawLine: function (x1,y1,x2,y2,width, color) {
            
            context.save();
            context.fillStyle = color;
            context.lineWidth = width;
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.stroke();
            context.restore();
                
        },
        drawCircle: function(x,y,diameter,color,stroke,name) {
        
             var circle = {id: name, x: x, y: y, diameter: diameter, 
                        color: color, stroke: stroke, type: "circle",
                         order: this.Sprites.length};
            
            this.Sprites.push(circle); 
            this.render();
        },
        drawRect: function(x,y,w,h,color,name) {
        
            var rect = {id: name, x: x, y: y, w: w, h: h, 
                        color: color, type: "rect",
                       order: this.Sprites.length};
            
            this.Sprites.push(rect);
            this.render();
        },
        drawTri: function(x1,y1,x2,y2,x3,y3,color, name) {
        
            var tri = {x1: x1, y1: y1, x2: x2, y2: y2,
                        x3: x3, y3: y3, color: color, type: "tri",
                        order: this.Sprites.length, id: name};
            
            
            this.Sprites.push(tri);
            this.render();
        },
        drawStar: function(x,y,length,color,name) {
      
            var star = {x: x, y: y, length: length, 
                        color: color, id: name,  type: "star",
                        order: this.Sprites.length};
            
            this.Sprites.push(star);
            this.render();
        },
        drawImage: function(name,src,x,y,w,h) {
            
            var name = name || "name";
            name = new Image();
            name.src = src;
            
            window.onload = function() {
                context.drawImage(name,x,y,w,h);
            }
        },
        getSpriteById: function(id) {
    
            for (var i in this.Sprites) {
                if (this.Sprites[i].id === id) {
                    return this.Sprites[i];
                }
            }
        },
        getSpriteOrderNum: function(id) {
            
            for (var i in this.Sprites) {
                if (this.Sprites[i].id === id) {
                    return this.Sprites[i].order;
                }
            }
        },
        findSpriteOrderNum: function(num) {
 
             for (var i in this.Sprites) {
                if (this.Sprites[i].order === num) {
                   return true;
                } else {
                   return false;
                }
            } 
        },
        setSpriteOrderNum: function(id,num) {
            
            for (var i in this.Sprites) {
               
                if (!this.findSpriteOrderNum(num) && this.Sprites[i].id === id) {
                    this.Sprites[i].order = num;
                }
            }
        },
        setSpriteAttribute: function(id,attr,val) {
            
            for (var i in this.Sprites) {
                
                if (this.Sprites[i].id === id) {
                    var value = this.Sprites[i];
                    
                    for (var j in value) {
                         if (j === attr) {
                            this.Sprites[i][j] = val;
                         }
                    }
                }
            }
        },
        getSpriteAttribute: function(id,attr) {
            
            for (var i in this.Sprites) {
                
                if (this.Sprites[i].id === id) {
                    var value = this.Sprites[i];
                    
                    for (var j in value) {
                         if (j === attr) {
                            return this.Sprites[i][j];
                         }
                    }
                }
            }
        },
        lowerOrderNumbers: function(num) {
            for (var i in this.Sprites) {
                if (i >= num) {
                    this.Sprites[i].order--;
                }
            }
        },
        removeSprite: function(id) {
            
            for (var i in this.Sprites) {
                if (this.Sprites[i].id === id) {
                    var num = this.Sprites[i].order;
                    this.Sprites.splice(num,1);
                }
            }
            this.lowerOrderNumbers(num);
            this.render();
        },
        removeAllSprites: function() {
            
            this.Sprites = [];
            
        },
        clearCanvas: function() {
            
            context.clearRect(0,0,canvas.width,canvas.height);
        },
        createSprite: function(type,id) {
                        
            switch (type) {
                case "tri":
                return this.drawTri(400,400,420,410,410,420,"#fff",id);
                break; 
                case "rect":
                return this.drawRect(500,400,20,20,"#fff",id);
                break;
                case "circle":
                return this.drawCircle(100,100,300,"#f00",false,id);
                break;
                case "star":
                return this.drawStar(200,300,30,"#f00",id);
                break;     
            } 
            this.render();
        },
        render: function() {
            
            this.clearCanvas();
            
            for (var i in this.Sprites) { 
                
                switch (this.Sprites[i].type) {
                        
                    case "tri":
                        
                    var x = this.Sprites[i].order;
                    var a1 = this.Sprites[x];
                   
                    context.save();
                    context.fillStyle = a1.color;
                    context.moveTo(a1.x1,a1.y1);
                    context.lineTo(a1.x2,a1.y2);
                    context.lineTo(a1.x3,a1.y3);
                    context.closePath();
                    context.restore();
                    context.fill();
                    break;
                    
                    case "rect":
                        
                    var x2 = this.Sprites[i].order;
                    var a2 = this.Sprites[x];
                    
                    context.save();
                    context.fillStyle = a2.color;
                    context.fillRect(a2.x,a2.y,a2.w,a2.h);
                    context.restore();
                    context.fill();
                    break;
                        
                    case "circle":
                        
                    var x3 = this.Sprites[i].order;
                    var a3 = this.Sprites[x3];
                    
                    context.save();
                    context.fillStyle = a3.color;
                    context.arc(a3.x,a3.y,a3.diameter / 2,0,2 * Math.PI);
                    context.fill();
                    context.restore();
                    break;
           
                    case "star":
       
                    var x4 = this.Sprites[i].order;
                    var a4 = this.Sprites[x4];
            
                    context.save();
                    context.fillStyle = a4.color;
                    context.translate(a4.x, a4.y);
                    context.rotate((Math.PI * 1 / 10));

                    for (var j = 5; j--;) {
                        context.lineTo(0, a4.length);
                        context.translate(0, a4.length);
                        context.rotate((Math.PI * 2 / 10));
                        context.lineTo(0, -a4.length);
                        context.translate(0, -a4.length);
                        context.rotate(-(Math.PI * 6 / 10));
                    }
            
                    context.lineTo(0, a4.length);
                    context.closePath();
                    context.restore();
                    context.fill();
                    break;
                }
            }
        }
    }
    
    return Ben;
    
})("myCanvas");

window.onresize=function(){Quercia.init()};

    
// EXAMPLES....

Quercia.init(760,300,"#ff69b4",true);
//Quercia.drawRect(300,40,200,200,"#f00","myRect");
//Quercia.drawRect(100,100,70,70,"#0f0","myRect2");

//Quercia.drawCircle(500,200,100,"0bb","myCircle1");
Quercia.drawStar(100,200,100,"#ddd","myStar1");
Quercia.drawTri(500,200,510,250,240,510,"#f00","myTri1");
Quercia.setSpriteAttribute("myStar1","x",350);
Quercia.clearCanvas();
Quercia.render();



