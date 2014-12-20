
// with direct

var structure = [
  {
    collection: 'properties',
    fields: {
      owned_by: {
        ref_to: ''
        // el of: [ 'owners_of_unknown_type', 'people', 'companies' ]
      }
    }          
  },
  {
    collection: 'people',
    fields: {
      owns: [{ // polymorphic
        ref_to: '' 
        // el of: [ 'properties', 'companies' ]
      }],
      works_for: [{
        ref_to: 'companies'
      }],
      tied_to: [{
        ref_to: 'companies'
      }]
    }
  },
  {// alt: owns_properties: [], owns_companies: []
    collection: 'companies',
    fields: {
      maybe_owns:{
        ref_to: 'properties'
      },
      owns: [{ // polymorphic
        ref_to: '' 
        // el of [ 'properties', 'companies' ]
      }],
      owned_by: { // polymorphic
        ref_to: ''
        // el of [ 'companies', 'people' ]
      },
      historically_owned_by: [{},{}],
      employees: []
    }
  },
  {
    collection: 'owners_of_unknown_type',
    fields: {
      owns: []
    }
  }  
];

// DOB translations

var translations = {
  insertions: [
    {
      collection: 'people',
      fields: {
        tied_to: {
          index: 0,
          cast: cast('string')
        }
      }
    },
    {
      collection: 'companies',
      fields: {
        maybe_owns: {
          ref_to_existing: get_property(db, 0)
        }
      }
    }    
  ],
  extensions: [
    {
      collection: 'properties',
      match_on: { bbl: 0 },
      fields: {}
    }    
  ]
};

var get_property = function(db, i){
  return function(row){
    var res =  db.properties.find({bbl: row[i]}).toArray[0]._id;
    if (res) return res;
    else throw('No property exists with bbl' + row[i]);
  };
};
