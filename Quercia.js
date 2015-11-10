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
        drawCircle: function(x,y,diameter,color,stroke,name) {
     
            context.save();
            context.fillStyle = color;
            context.arc(x,y,diameter / 2,0,2 * Math.PI);
            context.fill();
            context.restore();
            
             var circle = {id: name, x: x, y: y, diameter: diameter, 
                        color: color, stroke: stroke, type: "circle",
                         order: this.Sprites.length};
            
            this.Sprites.push(circle); 
        },
        drawRect: function(x,y,w,h,color,name) {
            
            context.save();
            context.fillStyle = color;
            context.fillRect(x,y,w,h);
            context.fill();
            context.restore();
            
            var rect = {id: name, x: x, y: y, w: w, h: h, 
                        color: color, type: "rect",
                       order: this.Sprites.length};
            
            this.Sprites.push(rect);     
        },
        drawTri: function(x1,y1,x2,y2,x3,y3,color, name) {
        
            context.save();
            context.fillStyle = color;
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.lineTo(x3,y3);
            context.closePath();
            context.fill();
            
            context.restore();
            
            var tri = {id: name, x1: x1, y1: y1, x2: x2, y2: y2,
                        y3: y3, color: color, type: "tri",
                        order: this.Sprites.length};
            
            this.Sprites.push(tri); 
        },
        drawStar: function(x,y,length,color,name) {
            
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
            
            var star = {id: name, x: x, y: y, length: length, 
                        color: color, type: "star",
                        order: this.Sprites.length};
            
            this.Sprites.push(star);
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
            
            console.log(num);
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
                    console.log(this.Sprites[i].order);
                    this.Sprites[i].order = num;
                    
                }
            }
        },
        changeSpriteAttribute: function(id,attr,val) {
            
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
            
            this.Sprites = [];
            this.clearCanvas();
            this.render();
        },
        removeSprite: function(id) {
            
            for (var i in this.Sprites) {
                if (this.Sprites[i].id === id) {
                    this.Sprites.splice(i, 1);
                }
            }
        },
        removeAllSprites: function() {
            
            this.Sprites = [];
            this.render();
            
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
            
            for (var i in this.Sprites) { 
                if (this.Sprites[i].type === "tri") {
                    Quercia.drawTri(this.Sprites[i].id);
                }
                if (this.Sprites[i].type === "rect") {
                    Quercia.drawRect(this.Sprites[i].id);
                }
                if (this.Sprites[i].type === "circle") {
                    Quercia.drawCircle(this.Sprites[i].id);
                }
                if (this.Sprites[i].type === "star") {
                    Quercia.drawStar(this.Sprites[i].id);
                }
            }
        }
    }
    
    return Ben;
    
})("myCanvas");

    
// EXAMPLES....

Quercia.init(800,600,"#bbb",true);
Quercia.createSprite("star","myStar");
Quercia.createSprite("rect","myRect");
Quercia.setSpriteOrderNum("myStar",1); //STILL NOT SETTING ORDER NUMBER PROPERLY

console.log(Quercia.Sprites);
Quercia.changeSpriteAttribute("myStar","id","super squid");
