const CellType = {
    start:"start",
    target:"target",
    solid:"solid",
    void:"void",
    locked:"locked",
    active:"active",
    path:"path"
}

class Cell{
    constructor(position){
        this.position = position;
        this.type;
        this.backTrack;
        
        this._cellColor = "#0000"
        this._cellFillColor = "#0000"
        
        this._gCost = Number.POSITIVE_INFINITY; // distance from start
        this._hCost = 0; // distance to finish
        this.locked = false;
        this.fCost = Number.POSITIVE_INFINITY; // sum of g and h
    }

    get cellColor(){
        if(showCells || this.type == CellType.start || this.type == CellType.target || this.type == CellType.solid)
            return this._cellColor;
        else if(!showCells)
            return "#fff0"    
        
    }

    get cellFillColor(){
        if(showCells || this.type == CellType.start || this.type == CellType.target || this.type == CellType.solid)
            return this._cellFillColor;
        else if(!showCells)
            return "#0000"    
        
    }

    set cellColor(value){
        this._cellColor = value
    }

    set cellFillColor(value){
        this._cellFillColor = value
    }
    

    set gCost(value){
        this._gCost = value;
        this.fCost = this.gCost + this.hCost;
    }

    get gCost(){
        return this._gCost
    }

    set hCost(value){
        this._hCost = value;
        this.fCost = this.gCost + this.hCost;
    }
    get hCost(){
        return this._hCost
    }

    setType(type) {
        this.type = type;
        switch (type) {
            case "start":
                this.cellColor = 'rgb(0, 255, 47)'
                this.cellFillColor = 'rgb(0, 168, 14)'
                this.gCost = 0
                this.locked = true; 
                break;

            case "target":
                this.cellColor = 'rgb(255, 0, 0)'
                this.cellFillColor = 'rgb(165, 0, 0)'
                this.hCost = 0
                this.locked = true; 
                break;

            case "active":
                this.cellColor = '#6fff00'
                break;
            
            case "solid":
                this.cellColor = 'rgb(200, 200, 200)'
                this._cellFillColor = 'rgb(120, 120, 120)'
                this.locked = true;
                break;   
            
            case "void":
                this.cellColor = '#0000'
                this._gCost = Number.POSITIVE_INFINITY
                this.fCost = Number.POSITIVE_INFINITY
                this._hCost = 0
                this.locked = false;
                break;   
            
            case "locked":
                this.cellColor = '#b60094'
                this.locked = true;
                break;  
                
            case "path":
                this.cellColor = '#5d00ff' 
                break;
            
            default:
                console.error("Unsupported cell type")
                break;
        }
    }

    drawCell(){
        ctx.strokeStyle = this.cellColor
        ctx.fillStyle = this.cellFillColor
        // console.log(this.cellFillColor)

        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.clearRect(this.position.x * cellSize + 1, this.position.y * cellSize + 1, cellSize - 1, cellSize - 1)
        ctx.arc((this.position.x + 0.5) * cellSize, (this.position.y + 0.5) * cellSize, cellSize * 0.25, 0, 2 * Math.PI);
        ctx.fill()
        ctx.stroke(); 
    }


    drawDebug(){
        let ignoreTypes = [CellType.solid, CellType.start, CellType.target, CellType.void, null]
        if(!ignoreTypes.includes(this.type)){
            ctx.font = "0.75em Roboto";
            ctx.fillStyle = "#fff"
            ctx.fillText(this.gCost, this.position.x * cellSize + 4, this.position.y * cellSize + 12);
            ctx.fillText(this.hCost, this.position.x * cellSize + 4, this.position.y * cellSize + 28);
            ctx.fillText(this.fCost, this.position.x * cellSize + 4, this.position.y * cellSize + 44);
        }
    }

    drawBackTrack(){
        ctx.strokeStyle = "#fff"
        if(this.backTrack != null){
            ctx.beginPath()
            ctx.moveTo((this.position.x + 0.5 ) * cellSize, (this.position.y + 0.5) * cellSize)
            ctx.lineTo((this.backTrack.position.x + 0.5) * cellSize, (this.backTrack.position.y + 0.5) * cellSize)
            ctx.stroke()
        }
    }

    static copyCell(cellInstance){
        let copy = new Cell(cellInstance.position);
        copy.type = cellInstance.type;
        copy.cellColor = cellInstance.cellColor;
        copy.cellFillColor = cellInstance.cellFillColor
        copy._gCost = cellInstance._gCost
        copy._hCost = cellInstance._hCost
        copy.locked = cellInstance.locked
        copy.fCost = cellInstance.fCost;
        return copy;
    }
}