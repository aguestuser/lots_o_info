//property
var property =
    {
        //ids
        borough: '', // Str matching: /^(1|2|3|4|5)$/
        block: '', // Str matching: /^\d{5}$/
        lot: '', // Str matching: /^\d{4}$/
        bbl: function(){ 
            return ( this.borough + this.block + this.lot)
        },
        
        location: {
            geo: '', // Reference to GeoJSON Id
            house_number: '',
            street: '',
            street_suffix: '',
            borough: '',
            zip: '',
            address: function(){
                //concat above properites
            },
            map_references:{
                sanborn: '',
                tax: '',
                zoning: '' 
            }
        },
        
        specs: {
            num_buildings: 0, // Num (int)
            num_floors: 0, // Num (int)
            units_res: 0, 
            units_total: 0,
            lot_front: 0, // Num (int)
            lot_depth: 0, // Num (int)
            floor_area: {
                total: 0,
                commercial: 0,
                office: 0,
                retail: 0,
                garage: 0,
                storage: 0,
                factory: 0,
                other: 0,
                source: '', // Str [0-9]
            },
            landmark_name: '', // Str
            is_landmarked: false, // Bool
            year_built: 1917, // num
            years_altered: [], // Arr of Nums (YYYY)
            building_class: '', // Str matching pattern
            land_use_category: '', // Str matching pattern
            num_easements: 0
        },
        
        zoning: { // ARR OF ZONING ID REFERENCES???
            zonings: [], // Array(4) of Strs matching zoning code pattern
            overlay: [], // Array(2) of Strs mathcing overlay code pattern
            special_purpose_district: [], // Array(2) of Strs matching SPD code pattern
            limited_height_district: '', // Str matching code pattern
            FAR: {
                residential: 0.00,
                commercial: 0.00,
                facility: 0.00,
                built: 0.00
            } 
        },
        
        value: {
            assessed: {
                land: 00000000000,
                total: 00000000000                 
            },
            exempt: {
                land: 00000000000,
                total: 00000000000  
            }
        },
        
        district: {
            school: '',//Str /^\d{2}$/
            council: 0, //Num 0 < num <= 52
            police: '',//Str /^(\d{3}|MTS|MTN)$/
            fire: '', //Str /^(E|L|Q)\d{3}$/
            community_board: '', // Str /^\d{3}$/
            congressional: '',
            assembly: '',
            election: '',
            historic: '' // Str or null
        },
        
        ownerships: [
            {
                type: '', // Str matching /^(C|M|O|P|X|\s)$/
                owner: '' // Reference to Owner Id
            }
        ]
    }

//owner
var owner = {
    type: '', // Enum { 'person', 'company', 'agency }
    name: '', // Str
    //has_many: companies, properties
}

//company
var company = {
    type: '', //Enum { 'unknown', 'contractor', 'bank', 'real estate firm' }
    name: '',
    owner: [],// Arr of References to 
    //if contractor:
    //if firm:
    firm_type: '', //Enum { 'llc', 'inc', 'corp' } 
    //if bank:
    
}

//agency

//permit
var permit = {
    date: Object, // Date
    property: '', // Property reference
    contractor: '', // Company reference
    permitee: '', //Company reference
}

var deed = {
    property: //reference
    price: 000.00, // Num (dollars)
    date: Object, // Date
    new_owner: {
        owner: 
        signatory:  
    },
    old_owner: {
        
    }
}



