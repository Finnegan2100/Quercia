var Quercia = (function(canvasId) {
	
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d");
    
    return {

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
        removeInitialMargins: function() {
            //body.style.margin = "0px";
            //html.style.margin = "0px";
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
            context.arc(x,y,diameter / 2,0,2 * Math.PI);
            context.fill();
        },
        drawRect: function(x,y,w,h,color) {
            
            context.fillStyle = color;
            context.fillRect(x,y,w,h);
            context.fill();
        }
    }
    
})("myCanvas");

    
// EXAMPLES....
    
Quercia.setCanvasDimensions(400,400);
Quercia.setBGColor("#ff0");
Quercia.removeInitialMargins();
Quercia.createInitialHelloText("Welcome to Quercia","#0b0");
console.log(Quercia.getCanvasDimensions());
Quercia.drawCircle(170,170,200,"#f00",true);
Quercia.drawRect(10,10,50,50,"#f00");

