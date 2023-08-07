const canvas = document.getElementById("canvas");
const canvasSize = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');
const cellSize = 48;
const crossSize = 4
const maxDepth = 1000;


var boundingBox = canvas.getBoundingClientRect();
var gridWidth =  Math.floor(canvas.width / cellSize); 
var gridHeight = Math.floor(canvas.height / cellSize);


window.onresize = () => {
    scaleCanvas()
    drawGrid()
    eventGrid = getEmptyGrid();
}


window.onload = () => {
    scaleCanvas()
    drawGrid()
    eventGrid = getEmptyGrid()
    randomAstar()
}