function setRandomPath(grid){
    voidCellsOfType(CellType.start, grid)
    voidCellsOfType(CellType.target, grid)

    let sx = Math.floor(Math.random() * gridWidth)
    let sy = Math.floor(Math.random() * gridHeight)

    while(getCellFromGrid(sx,sy,grid).type == CellType.solid){
        sx = Math.floor(Math.random() * gridWidth)
        sy = Math.floor(Math.random() * gridHeight)
    }

    
    let tx = Math.floor(Math.random() * gridWidth);
    let ty = Math.floor(Math.random() * gridHeight)
    
    while(Vector2.distance(new Vector2(sy,sx),new Vector2(ty,tx)) <= 10 || getCellFromGrid(tx,ty,grid).type == CellType.solid){
        tx = Math.floor(Math.random() * gridWidth);
        ty = Math.floor(Math.random() * gridHeight)
    }
    
    startCell = getCellFromGrid(sx, sy, grid)
    startCell.setType(CellType.start)
 
    targetCell = getCellFromGrid(tx, ty, grid)
    targetCell.setType(CellType.target)

    return [startCell, targetCell]
}

function randomAstar(){
    let grid = copyGrid(eventGrid)
    let [stc,tgc] = setRandomPath(grid)
    eventGrid = copyGrid(grid)
    
    let path = astar(grid, stc, tgc)
    
    drawCells(grid)
    drawPath(path)
}