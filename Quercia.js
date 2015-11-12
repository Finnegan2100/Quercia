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
            /*
            context.save();
            context.fillStyle = color;
            context.arc(x,y,diameter / 2,0,2 * Math.PI);
            context.fill();
            context.restore();
            */
             var circle = {id: name, x: x, y: y, diameter: diameter, 
                        color: color, stroke: stroke, type: "circle",
                         order: this.Sprites.length};
            
            this.Sprites.push(circle); 
            this.render();
        },
        drawRect: function(x,y,w,h,color,name) {
            /*
            context.save();
            context.fillStyle = color;
            context.fillRect(x,y,w,h);
            context.restore();
            context.fill();
            */
            var rect = {id: name, x: x, y: y, w: w, h: h, 
                        color: color, type: "rect",
                       order: this.Sprites.length};
            
            this.Sprites.push(rect);
            this.render();
        },
        drawTri: function(x1,y1,x2,y2,x3,y3,color, name) {
            /*
            context.save();
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.lineTo(x3,y3);
            context.closePath();
            context.restore();
            context.fill();
            */
            var tri = {x1: x1, y1: y1, x2: x2, y2: y2,
                        x3: x3, y3: y3, color: color, type: "tri",
                        order: this.Sprites.length, id: name};
            
            
            this.Sprites.push(tri);
            this.render();
        },
        drawStar: function(x,y,length,color,name) {
            /*
            context.fillStyle = color;
            
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
            context.restore();
            context.fill();
            */
            
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
           // this.render();
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
                
                if (this.Sprites[i].type === "tri") {
                    var x = this.Sprites[i].order;
                    var a = this.Sprites[x];
                   
                    context.save();
                    context.fillStyle = a.color;
                    context.moveTo(a.x1,a.y1);
                    context.lineTo(a.x2,a.y2);
                    context.lineTo(a.x3,a.y3);
                    context.closePath();
                    context.restore();
                    context.fill();
                    //Quercia.drawTri(a.x1,a.y1,a.x2,a.y2,a.x3,a.y3,a.color,a.id);
                }
                else if (this.Sprites[i].type === "rect") {
                    var x = this.Sprites[i].order;
                    var a = this.Sprites[x];
                    context.save();
                    context.fillStyle = a.color;
                    context.fillRect(a.x,a.y,a.w,a.h);
                    context.restore();
                    context.fill();
                    //Quercia.drawRect(a.x,a.y,a.w,a.h,a.color,a.id);
                }
                else if (this.Sprites[i].type === "circle") {
                    var x = this.Sprites[i].order;
                    var a = this.Sprites[x];
                    context.save();
                    context.fillStyle = a.color;
                    context.arc(a.x,a.y,a.diameter / 2,0,2 * Math.PI);
                    context.fill();
                    context.restore();
                    //Quercia.drawCircle(a.x,a.y,a.diameter,a.stroke,a.color,a.id);
                }
                else if (this.Sprites[i].type === "star") {
                    var x = this.Sprites[i].order;
                    var a = this.Sprites[x];
                    
                    context.fillStyle = a.color;
            
                    context.save();
                    context.translate(a.x, a.y);
                    context.rotate((Math.PI * 1 / 10));

                    for (var i = 5; i--;) {
                        context.lineTo(0, a.length);
                        context.translate(0, a.length);
                        context.rotate((Math.PI * 2 / 10));
                        context.lineTo(0, -a.length);
                        context.translate(0, -a.length);
                        context.rotate(-(Math.PI * 6 / 10));
                    }
            
                    context.lineTo(0, a.length);
                    context.closePath();
                    context.restore();
                    context.fill();
                    //Quercia.drawStar(a.x,a.y,a.length,a.color,a.id);
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
console.log(Quercia.Sprites);


