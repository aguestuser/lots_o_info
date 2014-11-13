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
        owner: REF_TO_OWNER
    }
    
// DOB STUFF

var property = {
    
}

var job = {
    number: 0,
    doc_number: 0,
    type: ''.
    status: '',
    latest_action_date: new Date(),
    scope: {
        plumbing: false,
        ...$
        other: false,
        other_description: ''
    }
    date: {
        pre_filing: ,
        
        paid: ,
        fully_paid: ,
        assigned: ,
        approved: ,
        fully_permitted: 
    }
    cost: 0,
    total_fee: 0,
    fee_status: '', //enum
    changes ={
        sq_feet: {
            existing: 0,
            proposed: 0
        }
        sq_feet: 0,
        proposed_sq_feet: 0,
        horiz_enlargement: false,
        vert_enlargement: false,
        //frontage
        stories: {
            existing: 0,
            proposed: 0
        }
        height:{
            existing: 0,
            proposed: 0
        }
        units: {
            existing: 0,
            proposed: 0
        },
        occupancy: {
            existing: '', //enum
            proposed: ''
        }
        
        
        
    }
    
        
    property: {}, //Property
    description: '...',
    permits: [] // Arr of Permits
}

//OWNER FIELDS
// owner_type: enum { 'CORPORATION', 'PARTNERSHIP', 'INDIVIDUAL', 'GOV', 'GOV - OTHER', 'OTHER' }
// owner_name, owner_business

// we know:
// owner_business OWNS propertiy
// owner_name has corporate_tie_of_unknown_type with owner_business

// 

// cleaning:
// (1) dedupe people

// what makes a person identical to another person?
// (1) they have corporate ties to identical companies
// (2) they have the same phone number
// (3) they have the same uncommon name [what is uncommon?]


// what makes a company identicial?
// (1) they have identical names
// (2) they have names that 

var possible_property_ownership ={
    //given by owner_name and owner_business fields in DOB
    //goal: reduce these to ownerships of type 'corporate' or 'property'
    property: '', // Property
    owner: '', // Company
}

var property_ownership = {
    owner: '', //Person, Company, PropertyOwnerOfUnknownType
    owned: '', //Property
    source: '', // enum { 'deed' }
}

var property_owner_of_unknown_type = {
    name: '',
    
}

var deed = {
    
}

// CORPORATE TIES

var corporate_tie_of_unknown_type = {
    person: '', //Ref to Person
    company: ''
}

var corporate_ownership = {
    owner: , // Person or Company
    owned: '', // Company
    source_type: '', // { 'deed', 'permit', 'job', 'research' }
    source: 'http://', // Ref to deed, permit OR Str (hyperlink)   
}

var employment = {
    company: , 
    person: 
}

var partnership = {
    
}

var directorship = {
    
}

var legal_representation = {

}

var financial = {
    
}

// CORPORATE WEB

var corporate_web: {
    people: [],
    companies: [],
    properties: [],
    ties: []
}


non_profit: false,


var permit = {
    
}

var owner_of_unknown_type = {
    name: '',
    deeds: []
}

owner.companies = function(){
    owner.permits.map(function(permit){ permit. })
    owner.articles_of_incorporation
}

var deed = {
    property: ,
    owner: REF_TO_OWNER_OF_UNKNOWN_TYPE, REF_TO_PERSON, REF_TO_COMPANY
}

var permit = {
    business: ,
    
}

var person = {
    name: ,
    phone: 
}

var company = {
    name: ,
    owner: REF_TO_PERSON | REF_TO_COMPANY,
    address: 
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



