
function Lot(){
    this.district // Districts Obj    
    this.stats // LotStats Obj 
    this.bbl // BBL
    this.owners // Arr of Owners
    
    this.currentOwner = function(){
        return this.owners[0]
    }
}


function LotStats(){
    this.numBldgs // 
    this.numFloors //
    this.lotFront
    this.lotDepth //
    
    
}

function Zoning(){
    this.designations // Arr of Enum of Strings
    this.overlays // Arr of Enum of Strings
    this.FAR //
    
    
    this.designation = function(){
        return this.designations[0]
    }
    
}

function Owner(){
    this.type // Enum [ 'Person', 'Firm', 'Agency' ]
    
}

function Firm(){
    this.type // [ 'LLC', 'Inc', 'Corp', 'Private Equity', 'Government Agency' ]
}

function Agency(){
    this.name // Str 
}


function District(){
    //yellow in pluto ss
    this.school // Int (in some range)
    this.council
    this.fire
    this.police
    this.communityBoard
}

function BBL(){
    var BOROUGH_NAMES = { 
        1: 'Manhattan', 
        2: 'Bronx',  
    
    }
    
    this.borough // Int
    this.block // Int
    this.lot // Int
    
    // methods
    this.boroughName = function(){
        BOROUGH_NAMES[this.borough]
    } 
    this.value = function(){
        this.borough + '-' this.block
    }
}

function Building(){
    this.unitsRes
    this.unitsTotal
    
}




function Block(){
    this.num // Int
    this.lot //Lot
}



function BBL(borough, block, lot){
    
}

