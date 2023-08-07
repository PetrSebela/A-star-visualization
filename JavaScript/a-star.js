function calculateHeuristics(grid, cell, targetPosition){
    let reachedTarget = false
    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            if(y == 0 && x == 0) continue
            let cellInstance = getCellFromGrid(cell.position.x + x, cell.position.y + y, grid)

            if(cellInstance == null) continue
            if(cellInstance.type == CellType.locked) continue
            
            if(cellInstance.type == CellType.target){
                reachedTarget = true;
                cellInstance.backTrack = cell;
            }
            
            if(!cellInstance.locked){
                let igCost = cell.gCost + calculateCellDistance(cell, cellInstance)
                let ihCost = calculateCellDistance(cellInstance, targetPosition)
                let ifCost = igCost + ihCost;
                
                if(ifCost < cellInstance.fCost){
                    cellInstance.gCost = igCost
                    cellInstance.hCost = ihCost
                    cellInstance.backTrack = cell;
                }
                cellInstance.setType(CellType.active)
            }            
        }        
    }
    return reachedTarget;
}

function getBestCell(grid){
    let cellFound = false;
    let bestCell = new Cell();

    grid.forEach(row => {
        row.forEach(cell => {
            if(cell.type == CellType.active){
                cellFound = true
                if(cell.fCost < bestCell.fCost){
                    bestCell = cell;
                }
                else if(cell.fCost == bestCell.fCost && cell.hCost < bestCell.hCost){
                    bestCell = cell;
                }
            }
        })
    })
    if(cellFound)
        return bestCell;
    return null
}


function calculateCellDistance(c1, c2){
    let tracker = c1.position
    let limiter = 0;
    let distance = 0;

    while(c2.position.compareTo(tracker) != 0){
        if(limiter++ > 100){
            console.error("Took to long to compute distance")
            break;
        }


        let closestDistance = Number.POSITIVE_INFINITY;
        let closestPosition;
        
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if(y == 0 && x == 0) continue
                
                let checkedPosition = new Vector2(tracker.x + x, tracker.y + y);
                let distance = Vector2.distance(checkedPosition, c2.position);
                
                if( distance < closestDistance){
                    closestDistance = distance;
                    closestPosition = checkedPosition; 
                }
            }        
        }
        distance += Math.round(Vector2.distance(tracker, closestPosition) * 10);
        tracker = closestPosition;
    }

    return distance;
}


function astar(grid, startCell, targetCell){
    let activeCell = startCell;
    let depth = 0
    let reachedTarget = false

    calculateHeuristics(grid, activeCell, targetCell)
    while (!reachedTarget && depth++ < maxDepth) {
        activeCell = getBestCell(grid)
        if(activeCell == null){
            console.error("no path found")
            return null
        }
        activeCell.setType(CellType.locked)
        reachedTarget = calculateHeuristics(grid, activeCell, targetCell)
    }

    if(depth != maxDepth + 1){
        let path = []
        let backTrackCell = targetCell;

        while(startCell.position.compareTo(backTrackCell.position) != 0){
            path.push(backTrackCell)
            drawPath(path)    
            backTrackCell = backTrackCell.backTrack;
            if(backTrackCell.type != CellType.start)
                backTrackCell.setType(CellType.path);
        }

        path.push(startCell)
        return path
    }
}



