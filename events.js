const Event = {
    stPlace:"stPlace",
    tgPlace:"tgPlace",
    solidPlace:"solidPlace",
    voidPlace:"voidPlace"
}

const buttons = document.querySelectorAll("button.big-button")

const gCostDebug = document.querySelector("#g-cost")
const hCostDebug = document.querySelector("#h-cost")
const fCostDebug = document.querySelector("#f-cost")
const typeDebug = document.querySelector("#cell-type")
const positionDebug = document.querySelector("#position")


var showCells = document.querySelector("#showCells").checked
let eventState;


var eventGrid;
var shownGrid;
var computedPath;

function updateCells(){
    showCells = document.querySelector("#showCells").checked
    runAstar()
}

function toggleActive(element){
    let addActive = !element.classList.contains("active")
    buttons.forEach(button => {
        button.classList.remove("active")
    });
    if(addActive){
        element.classList.add("active")
    }

}

function setEvent(element, eventType){
    if(eventState == eventType){
        eventState = null
        toggleActive(element) 
    }
    else{
        eventState = eventType
        toggleActive(element)
    }
}

function runAstar(){
    let grid = copyGrid(eventGrid);
    let stc = getCellOfType(CellType.start, grid) 
    let tgc = getCellOfType(CellType.target, grid)
    
    if(stc == null || tgc == null){
        // fire prompt to do stuff
        console.error("Cells not set")
        return
    }

    computedPath = astar(grid, stc, tgc)
    shownGrid = grid;
    drawCells(grid)

    if(computedPath == null){
        console.error("no path exists")
        return
    }
    drawPath(computedPath)
}



canvas.addEventListener("click", (ctx) => {

    let xIndex = Math.floor(ctx.offsetX / cellSize)
    let yIndex = Math.floor(ctx.offsetY / cellSize)
    let activeCell = null;

    switch(eventState){
        case Event.stPlace:
            activeCell = getCellOfType(CellType.start, eventGrid)
            if(activeCell != null){
                activeCell.setType(CellType.void)
            }

            activeCell = getCellFromGrid(xIndex, yIndex, eventGrid)
            activeCell.setType(CellType.start)
            break

        case Event.tgPlace:
            activeCell = getCellOfType(CellType.target, eventGrid)
            
            if(activeCell != null){
                activeCell.setType(CellType.void)
            }

            activeCell = getCellFromGrid(xIndex, yIndex, eventGrid)
            activeCell.setType(CellType.target)
            break

        case Event.solidPlace:
            activeCell = getCellFromGrid(xIndex, yIndex, eventGrid)
            if(activeCell.type == CellType.start || activeCell.type == CellType.target) break
            activeCell.setType(CellType.solid)
            break

        case Event.voidPlace:
            activeCell = getCellFromGrid(xIndex, yIndex, eventGrid)
            if(activeCell.type == CellType.start || activeCell.type == CellType.target) break
            activeCell.setType(CellType.void)
            break
        default:
            break
    }
    runAstar()
})

var mouseDown = false;
var lastX = -1;
var lastY = -1;

canvas.addEventListener("mousemove",(ctx) => {
    let xIndex = Math.floor(ctx.offsetX / cellSize)
    let yIndex = Math.floor(ctx.offsetY / cellSize)
    
    if(lastX == xIndex && lastY == yIndex) return
    lastX = xIndex
    lastY = yIndex
    
    let debugCell = getCellFromGrid(xIndex, yIndex, eventGrid)
    if(debugCell == null) return
    
    if(mouseDown && !(debugCell.type == CellType.start || debugCell.type == CellType.target)){
        switch (eventState) {
            case Event.solidPlace:
                debugCell.setType(CellType.solid)
                break;
            
            case Event.voidPlace:
                debugCell.setType(CellType.void)
                break;
            
            default:
                break;
        }
    }
    
    gCostDebug.innerHTML = debugCell.gCost
    hCostDebug.innerHTML = debugCell.hCost
    fCostDebug.innerHTML = debugCell.fCost
    typeDebug.innerHTML = debugCell.type
    positionDebug.innerHTML = `(${debugCell.position.x},${debugCell.position.y})`

    runAstar()
    highLightCell(debugCell)
})



document.addEventListener("mousedown",(ctx) => {if(ctx.button == 0) mouseDown = true})
document.addEventListener("mouseup",(ctx) => {if(ctx.button == 0) mouseDown = false})