var Quercia = (function(canvasId) {
	
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d");
    
    
    var Ben = {
        
        Sprites: [],
        Images: [],
        
        
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
            context.strokeStyle = color;
            context.lineWidth = width;
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.stroke();
            context.restore();
                
        },
        drawCurve: function (x1,y1,x2,y2,x3,y3,curveType,width,color) {
          
            context.save();
            context.strokeStyle = color;
            context.lineWidth = width;
            
            if (curveType === "bezier") {
              
                context.beginPath();
                context.moveTo(x1,y1);
                context.bezierCurveTo(x1,y1,x2,y2,x3,y3);
                context.stroke();
            } else if (curveType === "quadratic") {
                 
                context.beginPath();
                context.quadraticCurveTo(x1,y1,x2,y2);
                context.stroke();  
            }
            
            context.restore();
        },
        drawCircle: function(x,y,diameter,color,name) {
        
             var circle = {id: name, x: x, y: y, diameter: diameter, 
                        color: color, type: "circle",
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
            this.render();
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
        scale: function(scaleX,scaleY) {
            
            this.clearCanvas();
            
            for (var i in this.Sprites) { 
                
                switch (this.Sprites[i].type) {
                        
                    case "tri":
                        
                    var x = this.Sprites[i].order;
                    var a1 = this.Sprites[x];
        
                    context.rotate((Math.PI / 180) * degrees);    
                    //context.save();
                    context.fillStyle = a1.color;
                    context.moveTo(a1.x1,a1.y1);
                    context.lineTo(a1.x2,a1.y2);
                    context.lineTo(a1.x3,a1.y3);
                    context.closePath();
                    //context.restore();
                    context.fill();
                    break;
                    
                    case "rect":    
                        
                    var x = this.Sprites[i].order;
                    var a2 = this.Sprites[x];
                        
                    var cx = a2.x + 0.5 * a2.w,
                        cy = a2.y + 0.5 * a2.h;
                           
                    context.save();
                    context.translate(cx, cy);       
                    context.scale(scaleX,scaleY); 
                    context.translate(-cx, -cy);       
                    context.fillStyle = a2.color;
                    context.fillRect(a2.x,a2.y,a2.w,a2.h);
                    context.restore();
                    context.fill();
                    break;
                        
                    case "circle":
                      
                    var x = this.Sprites[i].order;
                    var a3 = this.Sprites[x];
                        
                    var cx = a3.x + 0.5 * a3.w,
                        cy = a3.y + 0.5 * a3.h;    
        
                    //context.save();
                    context.scale(scaleX,scaleY);       
                    context.fillStyle = a3.color;
                    context.arc(a3.x,a3.y,a3.diameter / 2,0,2 * Math.PI);
                    context.fill();
                    //context.restore();
                    break;
           
                    case "star":
       
                    var x = this.Sprites[i].order;
                    var a4 = this.Sprites[x];
            
                    context.fillStyle = a4.color;
                    context.save();
                    
                    //context.rotate(0,degrees);       
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
        },
        rotate: function(degrees) {
            
            this.clearCanvas();
            
            for (var i in this.Sprites) { 
                
                switch (this.Sprites[i].type) {
                        
                    case "tri":
                        
                    var x = this.Sprites[i].order;
                    var a1 = this.Sprites[x];
        
                    //context.save();
                    context.fillStyle = a1.color;
                    context.moveTo(a1.x1,a1.y1);
                    context.lineTo(a1.x2,a1.y2);
                    context.lineTo(a1.x3,a1.y3);
                    context.closePath();
                    //context.restore();
                    context.fill();
                    break;
                    
                    case "rect":    
                        
                    var x = this.Sprites[i].order;
                    var a2 = this.Sprites[x];
                        
                    var cx = a2.x + 0.5 * a2.w,
                        cy = a2.y + 0.5 * a2.h;
                           
                    context.save();
                    context.translate(cx, cy);       
                    context.rotate((Math.PI / 180) * degrees);
                    context.translate(-cx, -cy);       
                    context.fillStyle = a2.color;
                    context.fillRect(a2.x,a2.y,a2.w,a2.h);
                    context.restore();
                    context.fill();
                    break;
                        
                    case "circle":
                      
                    var x = this.Sprites[i].order;
                    var a3 = this.Sprites[x];
                        
                    var cx = a3.x + 0.5 * a3.w,
                        cy = a3.y + 0.5 * a3.h;    
        
                    //context.save();
                    context.rotate(0,degrees);       
                    context.fillStyle = a3.color;
                    context.arc(a3.x,a3.y,a3.diameter / 2,0,2 * Math.PI);
                    context.fill();
                    //context.restore();
                    break;
           
                    case "star":
       
                    var x = this.Sprites[i].order;
                    var a4 = this.Sprites[x];
            
                    context.fillStyle = a4.color;
                    context.save();
                    
                    context.rotate(0,degrees);       
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
        },
        render: function() {
            
            this.clearCanvas();
            
            for (var i in this.Sprites) { 
                
                switch (this.Sprites[i].type) {
                        
                    case "tri":
                        
                    var x = this.Sprites[i].order;
                    var a1 = this.Sprites[x];
                   
                    //context.save();
                    context.fillStyle = a1.color;
                    context.moveTo(a1.x1,a1.y1);
                    context.lineTo(a1.x2,a1.y2);
                    context.lineTo(a1.x3,a1.y3);
                    context.closePath();
                    //context.restore();
                    context.fill();
                    break;
                    
                    case "rect":    
                        
                    var x = this.Sprites[i].order;
                    var a2 = this.Sprites[x];
                    
                    context.save();
                    context.fillStyle = a2.color;
                    context.fillRect(a2.x,a2.y,a2.w,a2.h);
                    context.restore();
                    context.fill();
                    break;
                        
                    case "circle":
                      
                    var x = this.Sprites[i].order;
                    var a3 = this.Sprites[x];
        
                    //context.save();
                    context.fillStyle = a3.color;
                    context.arc(a3.x,a3.y,a3.diameter / 2,0,2 * Math.PI);
                    context.fill();
                    //context.restore();
                    break;
           
                    case "star":
       
                    var x = this.Sprites[i].order;
                    var a4 = this.Sprites[x];
            
                    context.fillStyle = a4.color;
                    context.save();
                    
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
Quercia.drawRect(100,100,60,60,"#f00","myRect");
Quercia.scale(1.4,1.4);
Quercia.rotate(-30);





