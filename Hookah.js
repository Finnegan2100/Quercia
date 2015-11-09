var Quercia = (function(canvasId) {
	
    var canvas = document.getElementById(canvasId),
        context = canvas.getContext("2d");
    
    return {

        setCanvasDimensions: function(w,h) {
            canvas.style.width = w || "300px";
            canvas.style.height = h || "300px";
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
        }    
    }
    
})("myCanvas");

    
// EXAMPLES....
    
Quercia.setCanvasDimensions("400px","400px");
Quercia.setBGColor("#ff0");
Quercia.removeInitialMargins();
Quercia.createInitialHelloText("Welcome to Quercia","#0b0");
console.log(Quercia.getCanvasDimensions());

