function scaleCanvas(){
    var dpr = window.devicePixelRatio || 1;
    boundingBox = canvas.getBoundingClientRect();
    canvas.width = boundingBox.width * dpr;
    canvas.height = boundingBox.height * dpr;
    ctx.scale(dpr, dpr);
    gridWidth =  Math.floor(canvas.width / cellSize); 
    gridHeight = Math.floor(canvas.height / cellSize); 
}


function drawGrid() {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#fff"
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < canvas.height / cellSize - 1; y ++) {
        for (let x = 0; x < canvas.width / cellSize - 1; x ++) {
            let cellPosition = new Vector2(Math.round(x * cellSize) + 0.5, Math.round(y * cellSize) + 0.5);
            ctx.beginPath(); 
            ctx.moveTo(cellPosition.x                  , cellPosition.y + crossSize);
            ctx.lineTo(cellPosition.x                  , cellPosition.y); 
            ctx.lineTo(cellPosition.x + crossSize      , cellPosition.y); 

            ctx.moveTo(cellPosition.x + cellSize - crossSize                 , cellPosition.y);
            ctx.lineTo(cellPosition.x + cellSize                  , cellPosition.y); 
            ctx.lineTo(cellPosition.x + cellSize      , cellPosition.y + crossSize); 

            ctx.moveTo(cellPosition.x + cellSize                  , cellPosition.y + cellSize - crossSize);
            ctx.lineTo(cellPosition.x + cellSize                  , cellPosition.y + cellSize); 
            ctx.lineTo(cellPosition.x + cellSize - crossSize      , cellPosition.y + cellSize); 

            ctx.moveTo(cellPosition.x + crossSize          , cellPosition.y + cellSize);
            ctx.lineTo(cellPosition.x                 , cellPosition.y + cellSize); 
            ctx.lineTo(cellPosition.x     , cellPosition.y + cellSize - crossSize); 
            ctx.stroke()
        }
    }
}


function getEmptyGrid(){
    let grid = []
    
    for (let y = 0; y < canvas.height / cellSize - 1; y ++) {
        let row = []
        for (let x = 0; x < canvas.width / cellSize - 1; x ++) {            
            let cellPosition = new Vector2(Math.round(x), Math.round(y)) 
            let cellInstance = new Cell(cellPosition);
         
            cellInstance.setType("void")
            row.push(cellInstance);
        }
        grid.push(row)
    }

    return grid
}


function copyGrid(gridInstance){
    g = []
    gridInstance.forEach(row => {
        rowCopy = []
        row.forEach(cell => {
            rowCopy.push(Cell.copyCell(cell))
        })
        g.push(rowCopy)
    })

    return g;
}


function drawCells(grid){
    shownGrid = copyGrid(grid)
    drawGrid();

    grid.forEach(row => {  
        row.forEach(cell => {
            cell.drawCell()
        })
    })

    // grid.forEach(row => {  
    //     row.forEach(cell => {
    //         cell.drawDebug()
    //     })
    // })

    // grid.forEach(row => {  
    //     row.forEach(cell => {
    //         cell.drawBackTrack()
    //     })
    // })
}


function drawPath(path){
    prevCell = path[0]
    path.forEach(nextCell => {
        ctx.strokeStyle = "rgb(0, 200, 200)"
        ctx.lineWidth = 3
        ctx.beginPath(); // Start a new path
        ctx.moveTo((prevCell.position.x + 0.5 ) * cellSize, (prevCell.position.y + 0.5 ) * cellSize);
        ctx.lineTo((nextCell.position.x + 0.5 ) * cellSize, (nextCell.position.y + 0.5 ) * cellSize);
        ctx.stroke()
        prevCell = nextCell;
    })
}


function getCellOfType(cellType, grid){
    let searched = null;
    
    grid.forEach(row => {
        row.forEach(cell => {
            if(cell.type == cellType){
                searched = cell
            } 
        })
    })
    return searched
}

function voidCellsOfType(cellType, grid){    
    grid.forEach(row => {
        row.forEach(cell => {
            if(cell.type == cellType){
                console.log(cell)
                cell.setType(CellType.void)
            } 
        })
    })
}

function highLightCell(cell){
    var offset = cellSize * 0.1
    var cellPosition = new Vector2(cell.position.x * cellSize, cell.position.y * cellSize)

    ctx.strokeStyle = "rgb(0, 255, 255)"
    ctx.lineWidth = 2

    ctx.beginPath(); 
    ctx.moveTo(cellPosition.x + offset                , cellPosition.y + crossSize + offset);
    ctx.lineTo(cellPosition.x + offset                  , cellPosition.y + offset); 
    ctx.lineTo(cellPosition.x + crossSize + offset      , cellPosition.y + offset); 

    ctx.moveTo(cellPosition.x + cellSize - crossSize - offset                , cellPosition.y + offset);
    ctx.lineTo(cellPosition.x + cellSize - offset                  , cellPosition.y + offset); 
    ctx.lineTo(cellPosition.x + cellSize - offset     , cellPosition.y + crossSize + offset); 

    ctx.moveTo(cellPosition.x + cellSize                  - offset, cellPosition.y + cellSize - crossSize - offset);
    ctx.lineTo(cellPosition.x + cellSize                  - offset, cellPosition.y + cellSize - offset); 
    ctx.lineTo(cellPosition.x + cellSize - crossSize      - offset, cellPosition.y + cellSize - offset); 

    ctx.moveTo(cellPosition.x + crossSize + offset         , cellPosition.y + cellSize - offset);
    ctx.lineTo(cellPosition.x + offset                 , cellPosition.y + cellSize - offset); 
    ctx.lineTo(cellPosition.x + offset      , cellPosition.y + cellSize - crossSize - offset); 
    ctx.stroke()
}

