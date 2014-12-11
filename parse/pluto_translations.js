module.exports = 
  [
    {
      collection: 'properties',
      fields: {
        borough: {
          index: 0,
          cast: cast('string')
        },
        boro_code: {
          index: 67,
          cast: cast('number')
        },
        block: {
          index: 1,
          cast: cast('number')
        },
        lot: {
          index: 2,
          cast: cast('number')
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
            cast: cast('number')
          },
          school: {
            index: 6,
            cast: cast('number')
          },
          council: {
            index: 7,
            cast: cast('number')
          },
          fire: {
            index: 9,
            cast: cast('string')
          },
          police: {
            index: 10,
            cast: cast('number')
          }
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
          }
        ],
        year_built:{
          index: 57,
          cast: cast('year')
        }
      }
    }, 
    {
      collection: 'property_owners',
      fields: {
        type: 'unknown',
        name: {
          index: 28,
          cast: cast('string')
        }
      }      
    },
    {
      collection: 'ownerships',
      fields: {
        type: 'property',
        pluto_own_class: {
          index: 27,
          cast: cast('string')
        },
        owner: {
          ref_to: 'property_owners'
        },
        owned: {
          ref_to: 'properties'
        }
      }
    }
  ];

  
// {
//   base: {
//     collection: 'properties',
//     fields: {
//       borough: {
//         index: 0,
//         cast: cast('string')
//       },
//       block: {
//         index: 1,
//         cast: cast('string')
//       },
//       lot: {
//         index: 2,
//         cast: cast('string')
//       },
//       location:{
//         address: {
//           index: 11,
//           cast: cast('string')
//         }
//       },
//       district: {
//         community_board: {
//           index: 3,
//           cast: cast('string')
//         },
//         school: {
//           index: 6,
//           cast: cast('string')
//         },
//         council: {
//           index: 7,
//           cast: cast('string')
//         },
//         fire: {
//           index: 9,
//           cast: cast('string')
//         },
//         police: {
//           index: 10,
//           cast: cast('string')
//         },
//       },
//       zonings: [
//         {
//           index: 12,
//           cast: cast('string')
//         },
//         {
//           index: 13,
//           cast: cast('string')
//         },
//         {
//           index: 14,
//           cast: cast('string')
//         },
//         {
//           index: 15,
//           cast: cast('string')
//         },
//       ],
//       year_built:{
//         index: 57,
//         cast: cast('year')
//       } 
//     }
//   }, 
//   refs: [
//     {
//       collection: 'property_owners_of_unknown_type',
//       fields: {
//         name: {
//           index: 28,
//           cast: cast('string')
//         },
//         ownership_type: {
//           index: 27,
//           cast: cast('string')
//         }
//       }      
//     }
//   ],
//   joins: [
//     {
//       collection: 'ownerships',
//       fields: {
//         type: 'property',
//         pluto_own_type: {
//           index: 27,
//           cast: cast('string')
//         },
//         owner: {
//           ref_to: 'property_owners_of_unknown_type'
//         },
//         owned: {
//           ref_to: 'properties'
//         }
//       }
//     }
//   ]
// };
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
      return val;
    };
  } 
  else if (to_type === 'number'){
    return function(val){
      return Number(val);
    };
  }
  else if (to_type === 'year'){
    return function(val){
      return new Date(val,0,1,0);
    };
  }
  else if(to_type === 'boro_to_num'){
    return function(val){
      return [].indexOf(val)
    };
  }
}
