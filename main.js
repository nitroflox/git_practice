const canvas = document.getElementById("pallet");
const ctx = canvas.getContext("2d");
const width = canvas.width = 800;
const height = canvas.height = 640;

var mouse = {};
var mousePressed = false;

var squarePen = {
    x: 0,
    y: 0,
    w: 30,
    h: 30,
    use: true
};
var circlePen = {
    x: 0,
    y: 0,
    r: 15,
    use: false
};
var pen = {
    x: 0,
    px: 0,
    y: 0,
    py: 0,
    w: 1,
    h: 1,
    use: false
};
var eraser = {
    x: 0,
    y: 0,
    w: 30,
    h: 30,
    use: false
};


var redSlider = document.getElementById("r");
var redValue = document.getElementById("red");
var greenSlider = document.getElementById("g");
var greenValue = document.getElementById("green");
var blueSlider = document.getElementById("b");
var blueValue = document.getElementById("blue");
redValue.value = redSlider.value;
greenValue.value = greenSlider.value;
blueValue.value = blueSlider.value;

var square = document.getElementById("square");
square.style.backgroundColor = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;

redSlider.addEventListener("change", (e)=>{
    redValue.value = redSlider.value;
    square.style.backgroundColor = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;
});
redValue.addEventListener("keyup", (e)=>{
    redSlider.value = redValue.value;
    square.style.backgroundColor = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;
});

greenSlider.addEventListener("change", (e)=>{
    greenValue.value = greenSlider.value;
    square.style.backgroundColor = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;
});
greenValue.addEventListener("keyup", (e)=>{
    greenSlider.value = greenValue.value;
    square.style.backgroundColor = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;
});

blueSlider.addEventListener("change", (e)=>{
    blueValue.value = blueSlider.value;
    square.style.backgroundColor = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;
});
blueValue.addEventListener("keyup", (e)=>{
    blueSlider.value = blueValue.value;
    square.style.backgroundColor = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;
});

canvas.addEventListener("mousemove", (e)=>{
    mouse.x = e.clientX - 303;
    mouse.y = e.clientY - 6;
    if(squarePen.use) setSquarePos();
    if(circlePen.use) setCirclePos();
    if(eraser.use) setEraserPos();
    if(pen.use) setPenPos();
});

canvas.addEventListener("mousedown", (e)=>{
    if(pen.use) setPrevPenPos();
    mousePressed = true;
});

canvas.addEventListener("mouseup", (e)=>{
    if(pen.use) setPenPos();
    mousePressed = false;
});

var sizeSlider = document.getElementById("size");
var sizeValue = document.getElementById("pen-size");
sizeValue.value = sizeSlider.value;
setCircleSize();
setSquareSize();
setEraserSize();
setPenSize();
sizeSlider.addEventListener("change", (e)=>{
    sizeValue.value = sizeSlider.value;
    if(circlePen.use) setCircleSize();
    if(squarePen.use) setSquareSize();
    if(eraser.use) setEraserSize();
    if(pen.use) setPenSize();
});
sizeValue.addEventListener("keyup", (e)=>{
    if(sizeValue.value <= sizeSlider.min) sizeValue.value = 1;
    if(sizeValue.value >= sizeSlider.max) sizeValue.value = 200;
    sizeSlider.value = sizeValue.value;
    if(circlePen.use) setCircleSize();
    if(squarePen.use) setSquareSize();
    if(eraser.use) setEraserSize();
    if(pen.use) setPenSize();
})

function changeFill(){
    ctx.fillStyle = square.style.backgroundColor;    
    ctx.strokeStyle = square.style.backgroundColor;
    if(eraser.use){
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white"; // change to remove from canvas
    }
}

function clearCanvas(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 640);
    ctx.fillStyle = square.style.backgroundColor;
}

function useSquare(){
    circlePen.use = false;
    eraser.use = false;
    pen.use = false;
    squarePen.use = true;
    setSquareSize();
}

function useCircle(){
    squarePen.use = false;
    eraser.use = false;
    pen.use = false;
    circlePen.use = true;
    setCircleSize();
}

function usePen(){
    squarePen.use = false;
    circlePen.use = false;
    eraser.use = false;
    pen.use = true;
    // setPenSize();
}

function useEraser(){
    squarePen.use = false;
    circlePen.use = false;
    pen.use = false;
    eraser.use = true;
    setEraserSize();
}

function setSquarePos(){
    squarePen.x = mouse.x - squarePen.w / 2;
    squarePen.y = mouse.y - squarePen.h / 2;
}

function setCirclePos(){
    circlePen.x = mouse.x;
    circlePen.y = mouse.y;
}

function setPenPos(){
    pen.x = mouse.x - pen.w / 2;
    pen.y = mouse.y - pen.h / 2;
}
function setPrevPenPos(){
    pen.px = pen.x;
    pen.py = pen.y;
}

function setEraserPos(){
    eraser.x = mouse.x - eraser.w / 2;
    eraser.y = mouse.y - eraser.h / 2;
}

function setSquareSize(){
    squarePen.w = sizeSlider.value;
    squarePen.h = sizeSlider.value;
}

function setCircleSize(){
    if(sizeSlider.value <= 2) circlePen.r = 2;
    else circlePen.r = sizeSlider.value / 2;
}

function setPenSize(){
    pen.w = sizeSlider.value;
    pen.h = sizeSlider.value;
    // ctx.lineWidth = sizeSlider.value;
}

function setEraserSize(){
    eraser.w = sizeSlider.value;
    eraser.h = sizeSlider.value;
}

function draw(){
    if(mousePressed){
        ctx.beginPath();
        if(squarePen.use)
            ctx.rect(squarePen.x, squarePen.y, squarePen.w, squarePen.h);
        if(circlePen.use)
            ctx.arc(circlePen.x, circlePen.y, circlePen.r, 0, Math.PI * 2, false);
        if(eraser.use)
            ctx.rect(eraser.x, eraser.y, eraser.w, eraser.h);
        ctx.fill();
        ctx.closePath();

        if(pen.use){
            ctx.beginPath();
            ctx.moveTo(pen.x, pen.y);
            ctx.lineTo(pen.px, pen.py);
            setPrevPenPos();
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function update(){
    changeFill();
    draw();
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);