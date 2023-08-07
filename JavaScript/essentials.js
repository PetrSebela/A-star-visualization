class Vector2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }


    static distance(a,b){
        return Math.sqrt(Math.pow(b.x - a.x,2) + Math.pow(b.y - a.y,2));
    }

    compareTo(position){
        if(this.x == position.x && this.y == position.y){
            return 0;
        }
        return 1;
    }
}

function getCellFromGrid(x, y, grid){
    if(x < gridWidth && y < gridHeight && x >= 0 && y >= 0){
        return grid[y][x]
    }
    return null
}