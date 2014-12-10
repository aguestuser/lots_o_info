module.exports = 
// Object Literal of form:
// { Int (column index): Array of Strings (JSON object keys) }
// {
//   0: ['borough'],
//   1: [ 'block' ]
//   2: ['lot'],
//   3: [ 'district', 'community_board' ],
//   6: [ 'district', 'school' ],
//   7: [ 'district', 'council' ],
//   9: [ 'district', 'fire' ],
//   10: [ 'district', 'police' ],
//   11: [ 'location', 'address' ], // needs further parsing
//   12: [ 'zoning', 'zonings', 0 ],
//   13: [ 'zoning', 'zonings', 1 ],
//   14: [ 'zoning', 'zonings', 2 ],
//   15: [ 'zoning', 'zonings', 2 ]
// }

{
  base: {
    collection: 'properties',
    fields: {
      borough: {
        index: 0,
        cast: cast('string')
      },
      block: {
        index: 1,
        cast: cast('string')
      },
      lot: {
        index: 2,
        cast: cast('string')
      },
      location:{
        address: {
          index: 11,
          cast: cast('string')
        }
      },
      district: {
        community_board: {
          index: 3,
          cast: cast('string')
        },
        school: {
          index: 6,
          cast: cast('string')
        },
        council: {
          index: 7,
          cast: cast('string')
        },
        fire: {
          index: 9,
          cast: cast('string')
        },
        police: {
          index: 10,
          cast: cast('string')
        },
      },
      zonings: [
        {
          index: 12,
          cast: cast('string')
        },
        {
          index: 13,
          cast: cast('string')
        },
        {
          index: 14,
          cast: cast('string')
        },
        {
          index: 15,
          cast: cast('string')
        },
      ],
      year_built:{
        index: 57,
        cast: cast('year')
      } 
    }
  }, 
  refs: [
    {
      collection: 'property_owners_of_unknown_type',
      fields: {
        name: {
          index: 28,
          cast: cast('string')
        },
        ownership_type: {
          index: 27,
          cast: cast('string')
        }
      }      
    }
  ],
  joins: [
    {
      collection: 'ownerships',
      fields: {
        type: 'property',
        from_matrix: {
          index: 0,
          cast: cast('string')
        }
      },
      ref_fields: {
        owner: {
          collection: 'property_owners_of_unknown_type'
        },
        owned: {
          collection: 'properties'
        }
      }
    }
  ]
}
  

// refs: 
//     [
//       {
//         collection: 'ownerships_of_unknown_type',
//         fields: [
//           {
//             field_name: 'name',
//             val: null,
//             index: 18,
//             cast: cast('string')
//           }
//           {
//             field_name: 'address'
//           }
//         ]
//       }
//     }  
//   }
// }


function cast(to_type){
  //input: Enum { 'string',  }
  if (to_type === 'string'){
    return function(val){
      return val
    }
  } 
  else if (to_type === 'number'){
    return function(val){
      return Number(val)
    }
  }
  else if (to_type === 'year'){
    return function(val){
      return new Date(val,0,1,0)
    }
  }
}
