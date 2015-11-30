
var Quercia = (function(canvasId) {
	
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d"),
        DYNAMIC_MODE = "";
        undefCounter = 1;
        Clicks = [];
        Mouse = {
            w: 1,
            h: 1
        };
    
    var Ben = {
        
        Sprites: [],
        Images: [],

        
        init: function(w,h,color,centered,border,borderWidth,borderColor) {
            
			var borderWidth = borderWidth || 5;
			var borderColor = borderColor || "#fff";
			
            this.setCanvasDimensions(w,h);
            this.setCanvasColor(color);
            
            if (centered) {
                this.centerCanvas();
            }
			if (border) {
				this.addCanvasBorder(borderWidth,borderColor);
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
		addCanvasBorder: function(borderWidth,borderColor) {
			canvas.style.border = borderWidth + "px" + " solid " + borderColor;	
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
        keyDown: function() {
            console.log("key pressed!");  
        },
        drawLine: function (x1,y1,x2,y2,width, color, name) {
            
            /*
            if (this.color === undefined && this.Sprites.length >= 1) {
                color = this.Sprites[this.Sprites.length - 1].color;
            } else if (this.Sprites.length === 0) {
                color = "#000";   
            }
            */
            /*
            context.save();
            context.strokeStyle = color;
            context.lineWidth = width;
            context.moveTo(x1,y1);
            context.lineTo(x2,y2);
            context.stroke();
            context.restore();
            */
            //console.log(color);
             var line = {id: name, x1: x1, y1: y1, x2: x2, y2: y2, 
                        color: color, width: width, type: "line",
                         order: this.Sprites.length};
            this.Sprites.push(line); 
            this.render();
                
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
        drawImage: function(src,x,y,w,h,id) {
            
            var name = id || "name";
            name = new Image();
            name.src = src;
            
            var image = {x: x, y: y, w: w, h: h, src: src, id: id, type: "image",
                         order: this.Sprites.length};
            
            this.Sprites.push(image);
            this.render();
            
            ///window.onload = function() {
               // context.drawImage(name,x,y,w,h);
            //}
            
        },
        drawAnimation: function(name,src,numFrames,sX,sY,sW,sH,x,y,w,h,id) {
            
            var name = name || "name";
            name = new Image();
            name.src = src;
                        
            window.onload = function() {
                context.drawImage(name,sX,sY,sW,sH,x,y,w,h);
            }
            
            var animation = {name: name, sX: sX, sY: sY,sW: sW, sH: sH,
                             x: x, x: y, w: w, h: h, numFrames: numFrames,
                            order: this.Sprites.length, id: id};
            
            this.Images.push(animation); 
        },
        animateAnimation: function(id) {
            
            for (var i in this.Images) {
            
                if (this.Images[i].id === id) {
                    
                    if (this.Images[i].sX < 360) {
                        
                       this.Images[i].sX += 120;
                    } else {
                        
                        this.Images[i].sX = 0;
                    }
                }
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
		setSpriteAttributes: function(id,obj) {
            
            for (var i in this.Sprites) {
                
                if (this.Sprites[i].id === id) {
                    var value = this.Sprites[i];
                    
                    for (var j in value) {
						//ADD IN A TECHNIQUE FOR GETTING INFO FROM AN OBJECT
						
                        //if (j === attr) {
                          //  this.Sprites[i][j] = val;
                        //}
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
		 getAllSpriteAttributes: function(id) {
            
            for (var i in this.Sprites) {
                
                if (this.Sprites[i].id === id) {
                    var value = this.Sprites[i];
                    return value;
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
			this.render();
            
        },
        clearCanvas: function() {
            
            context.clearRect(0,0,canvas.width,canvas.height);
        },
		setGlobalOpacity: function(ga) {
			context.globalAlpha = ga;	
		},
		getGlobalOpacity: function() {
			return context.globalAlpha;
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
        getCenterX: function(id) {

            for (var i in this.Sprites) {
                if (this.Sprites[i].id === id) {
                    
                    switch (this.Sprites[i].type) {
                            
                        case "rect":
                        var cent = this.Sprites[i].x + this.Sprites[i].w / 2;  
                        return cent; 
                        break;
                            
                        case "circle":
                        return this.Sprites[i].x;
                        break;
                    }
                }
            }  
        },
        getCenterY: function(id) {
            
                for (var i in this.Sprites) {
                if (this.Sprites[i].id === id) {
                    
                    switch (this.Sprites[i].type) {
                            
                        case "rect":
                        var cent = this.Sprites[i].y + this.Sprites[i].h / 2;     
                        return cent; 
                        break;
                            
                        case "circle":
                        return this.Sprites[i].y;
                        break;
                    }
                }
            }  
            
        },
        getHalfWidth: function(id) {
            
             for (var i in this.Sprites) {
                if (this.Sprites[i].id === id) {
                    
                    switch (this.Sprites[i].type) {
                            
                        case "rect":
                        return this.Sprites[i].w / 2;
                        break;
                            
                        case "circle":
                        return this.Sprites[i].diameter / 2;
                        break;
                    }
                }
            }
        },
        getHalfHeight: function(id) {
            
             for (var i in this.Sprites) {
                if (this.Sprites[i].id === id) {
                    
                    switch (this.Sprites[i].type) {
                            
                        case "rect":
                        return this.Sprites[i].h / 2;
                        break;
                            
                        case "circle":
                        return this.Sprites[i].diameter / 2;
                        break;
                    }
                }
            }
        },
        checkCollision: function(s1,s2) {
            
            var vx = Quercia.getCenterX(s1) - Quercia.getCenterX(s2),
                vy = Quercia.getCenterY(s1) - Quercia.getCenterY(s2),
            combinedHalfWidths = Quercia.getHalfWidth(s1) + Quercia.getHalfWidth(s2),
            combinedHalfHeights = Quercia.getHalfHeight(s1) + Quercia.getHalfHeight(s2);

             if (Math.abs(vx) < combinedHalfWidths) {
                if (Math.abs(vy) < combinedHalfHeights) {
                    return true;
                } else {
                    return false;
                }
            }   
            else {
                return false;
            }
        },
        checkCollisionWithMouse: function(s1) {
            
            var vx = Mouse.x - Quercia.getCenterX(s1),
                vy = Mouse.y - Quercia.getCenterY(s1),
            combinedHalfWidths = Mouse.w + Math.round(Quercia.getHalfWidth(s1)),
            combinedHalfHeights = Mouse.h + Math.round(Quercia.getHalfHeight(s1));
            console.log(vx,vy,combinedHalfWidths,combinedHalfHeights);
             if (Math.abs(vx) < combinedHalfWidths) {
                if (Math.abs(vy) < combinedHalfHeights) {
                    return true;
                } else {
                    return false;
                }
            }   
            else {
                return false;
            }
        },
        createUpdateLoop: function(ms) {
        
            loop();
            
            function loop() {
                
                
                window.setTimeout(loop,ms);
                context.clearRect(0,0,canvas.width,canvas.height);
                Quercia.render();
            }
        },
        
        move: function(id,vx,vy,canRun) {
            
			 if (canRun) {
             for (var i in this.Sprites) {
                    if (this.Sprites[i].id === id) {
                        var value = this.Sprites[i];

							for (var j in value) {
									if (j === "x") {
										//this.Sprites[i].vx = vx;

										this.Sprites[i][j] += vx
										this.render();
									}
									if (j === "y" && this.Sprites[i][j] !== 0) {
										this.Sprites[i][j] += vy;
										this.render();
									}
							}
						} //else {
							
							//this.Sprites[i].vx = 0;
						//}
			 		}
            }  
        },
		stop: function(id) {
            
             for (var i in this.Sprites) {
                    if (this.Sprites[i].id === id) {
                        var value = this.Sprites[i];
						
                        for (var j in value) {
                                if (j === "x") {
                                    this.Sprites[i].vx = 0;
                                    this.render();
                                }
                                if (j === "y") {
                                    this.Sprites[i].vy = 0;
									this.render();
                                }
                        }
                    }
            }  
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
                    this.Sprites[i].scaleX = scaleX;
                    this.Sprites[i].scaleY = scaleY;
                    break;
                        
                    case "circle":
                      
                    var x = this.Sprites[i].order;
                    var a3 = this.Sprites[x];
                        
                    var cx2 = a3.x + 0.5 * a3.diameter,
                        cy2 = a3.y + 0.5 * a3.diameter;    
        			
					//this.clearCanvas();
					//this.render();
                    //context.save();
					context.translate(cx2, cy2); 	
                    context.scale(scaleX,scaleY);
					context.translate(-cx2, -cy2); 	
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
                        
                    var cx = a1.x + 0.5 * a1.w,
                        cy = a1.y + 0.5 * a1.h;    
        
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
                    this.Sprites[i].rotation = degrees;
                    break;
                        
                    case "circle":
                      
                    var x = this.Sprites[i].order;
                    var a3 = this.Sprites[x];
                        
                    var cx = a3.x + 0.5 * a3.w,
                        cy = a3.y + 0.5 * a3.h;    
        
                    context.save();
                    context.rotate(0,degrees);       
                    context.fillStyle = a3.color;
                    context.arc(a3.x,a3.y,a3.diameter / 2,0,2 * Math.PI);
                    context.fill();
                    context.restore();
                    break;
           
                    case "star":
       
                    var x = this.Sprites[i].order;
                    var a4 = this.Sprites[x];
                        
                    var cx = a4.x + 0.5 * a4.length,
                        cy = a4.y + 0.5 * a4.length;     
            
                    context.fillStyle = a4.color;
                    context.save();
                    this.clearCanvas();
                        
                    context.translate(cx, cy);       
                    context.rotate((Math.PI / 180) * degrees);
                    context.translate(-cx, -cy);        
                        
                    //context.rotate(degrees);       
                    //context.translate(a4.x, a4.y);
                    //context.rotate((Math.PI * 1 / 10));

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
        
                if (this.Sprites[i].id === undefined) {
                    this.Sprites[i].id = "undef" + undefCounter;
                    undefCounter++;
                }
                
                switch (this.Sprites[i].type) {
                        
                    case "line":
                        
                    var x = this.Sprites[i].order;
                    var a01 = this.Sprites[x];
                       
                    console.log(a01);    
                    /*    
                     if (a01.color === undefined && this.Sprites.length >= 1) {
                        a01.color = this.Sprites[this.Sprites.length - 1].a01.color;
                    } else if (this.Sprites.length === 0) {
                        a01.color = "#000";   
                    }
                    */
            
                    context.save();
                    context.strokeStyle = a01.color;
                    context.lineWidth = a01.width;
                    context.moveTo(a01.x1,a01.y1);
                    context.lineTo(a01.x2,a01.y2);
                    context.stroke();
                    context.restore(); 
                    break;    
                       
                    case "image":
                    var x = this.Sprites[i].order;
                    var a0 = this.Sprites[x];
                    
                   
                    var name = a0.id;
                    name = new Image();
                    name.src = a0.src;  
                        
                    context.drawImage(name,a0.x,a0.y,a0.w,a0.h);
                    break;    
                        
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
                    context.beginPath();
                    context.fillStyle = a2.color;
                    context.fillRect(a2.x,a2.y,a2.w,a2.h);
                    this.scale(this.Sprites[i].scaleX,this.Sprites[i].scaleY);
                    this.rotate(this.Sprites[i].rotation);
                    context.restore();
                    context.fill();
                    break;
                        
                    case "circle":
                      
                    var x = this.Sprites[i].order;
                    var a3 = this.Sprites[x];
        			
					
                   	context.save();	
                    context.fillStyle = a3.color;
                    context.arc(a3.x,a3.y,a3.diameter / 2,0,2 * Math.PI);
                    context.fill();
                   	context.restore();
					
                    break;
           
                    case "star":
       
					context.save();		
                    var x = this.Sprites[i].order;
                    var a4 = this.Sprites[x];
            
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
                    
                    context.fill();
					context.restore();	
                    break;
                }
            }
        }
    }
    
    addEventListener("keydown",function keyDown(evt) {
        
        
        var textArea = document.getElementById("textBox");
        if (evt.keyCode === 82) {
            textArea.value = "";
            textArea.value += "BEGIN ADDING RECTANGLE COORDINATES";
            DYNAMIC_MODE = "RECT";
            Clicks = [];
        } 
        if (evt.keyCode === 83) {
            textArea.value = "";
            textArea.value += "BEGIN ADDING STAR COORDINATES";
            DYNAMIC_MODE = "STAR";
            Clicks = [];
        }
        if (evt.keyCode === 67) {
            textArea.value = "";
            textArea.value += "BEGIN ADDING CIRCLE COORDINATES";
            DYNAMIC_MODE = "CIRCLE";
            Clicks = [];
        } 
        if (evt.keyCode === 76) {
            textArea.value = "";
            textArea.value += "BEGIN ADDING LINE COORDINATES";
            DYNAMIC_MODE = "LINE";
            Clicks = [];
        } 
        if (evt.keyCode === 85) {
            textArea.value = "";
            textArea.value += "DELETE";
            Q.Sprites.pop();
            Clicks.pop();
            Q.render();
        }   
    });
    addEventListener("mousemove",function onMouseMove(evt) {
    
        var canvas = document.getElementById("myCanvas"),
        
        x = evt.x,
        y = evt.y;

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        
        Mouse.x = x;
        Mouse.y = y;
        
         for (var i = 0; i < Q.Sprites.length; i++) {
            
             console.log(Q.Sprites[i]);
            if (Q.Sprites.length >= 1) {
                console.log(Q.checkCollisionWithMouse(Q.Sprites[i].id));   
            }
        }
    
    });    
    addEventListener("click",function onClick(evt) {
        
        var canvas = document.getElementById("myCanvas");
        var coordsBox = document.getElementById("coords");
        var coordsBox2 = document.getElementById("coords2");

            x = evt.x;
            y = evt.y;

            x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
        
        var coords = {"x": x,"y": y};
        Clicks.push(coords);
        coordsBox.value = " ";
        coordsBox.value += Clicks[0].x + " " + Clicks[0].y;
        coordsBox2.value = " ";
        coordsBox2.value += Clicks[1].x + " " + Clicks[1].y;
        
        //coordsBox.value += coords.y;
        
        if (DYNAMIC_MODE === "RECT") {
       
            if (Clicks.length === 2) {

                if (Clicks[0].x < Clicks[1].x && Clicks[0].y < Clicks[1].y) {

                    Q.drawRect(Clicks[0].x,Clicks[0].y,Clicks[1].x - Clicks[0].x,Clicks[1].y -
                        Clicks[0].y);
                } 
                if (Clicks[0].x > Clicks[1].x && Clicks[0].y < Clicks[1].y) {

                    Q.drawRect(Clicks[1].x,Clicks[0].y,Clicks[0].x - Clicks[1].x,Clicks[1].y -
                        Clicks[0].y);
                }
                if (Clicks[0].x > Clicks[1].x && Clicks[0].y > Clicks[1].y) {

                    Q.drawRect(Clicks[1].x,Clicks[1].y,Clicks[0].x - Clicks[1].x,Clicks[0].y -
                        Clicks[1].y);
                }
                if (Clicks[0].x < Clicks[1].x && Clicks[0].y > Clicks[1].y) {

                    Q.drawRect(Clicks[0].x,Clicks[1].y,Clicks[1].x - Clicks[0].x,Clicks[0].y -
                        Clicks[1].y);
                }

                Clicks = [];
            }  
        }
        if (DYNAMIC_MODE === "STAR") {
       
            if (Clicks.length === 2) {
                
                context.closePath();
                context.save();
                context.beginPath();
                Q.drawStar(Clicks[0].x,Clicks[0].y,Math.abs(Clicks[0].x - Clicks[1].x));
                context.restore();
                Clicks = [];
                console.log(Q.Sprites); 
            }  
        }
        if (DYNAMIC_MODE === "CIRCLE") {
       
            if (Clicks.length === 2) {
                
                Q.drawCircle(Clicks[0].x,Clicks[0].y,Math.abs(Clicks[0].x - Clicks[1].x));
                Clicks = [];
                console.log(Q.Sprites); 
            }  
        }
         if (DYNAMIC_MODE === "LINE") {
       
            if (Clicks.length === 2) {
                
                Q.drawLine(Clicks[0].x,Clicks[0].y,Clicks[1].x,Clicks[1].y);
                Clicks = [];
                console.log(Q.Sprites); 
            }  
        }
    });
    
    return Ben;
    
})("myCanvas");

window.Quercia = window.Q = Quercia;
     

window.onresize=function(){Quercia.init()};

    
// EXAMPLES....

Q.init(760,300,"rgb(33,00,330)",true,true,10,"#3bf");


//Q.drawRect(0,0,200,200);


/*
loop();

function loop() {
    
    setTimeout(loop,10);
    Q.clearCanvas();
    Q.drawRect(200,100,40,70,"#dd1","myRect1");
    console.log(Q.checkCollisionWithMouse("myRect1"));
}
*/






