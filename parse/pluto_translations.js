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
  borough: {
    index: 0,
    cast: cast('self')
  },
  block: {
    index: 1,
    cast: cast('self')
  },
  lot: {
    index: 2,
    cast: cast('self')
  },
  location:{
    address: {
      index: 11,
      cast: cast('self')
    }
  },
  district: {
    community_board: {
      index: 3,
      cast: cast('self')
    },
    school: {
      index: 6,
      cast: cast('self')
    },
    council: {
      index: 7,
      cast: cast('self')
    },
    fire: {
      index: 9,
      cast: cast('self')
    },
    police: {
      index: 10,
      cast: cast('self')
    },
  },
  zonings: [
    {
      index: 12,
      cast: cast('self')
    },
    {
      index: 13,
      cast: cast('self')
    },
    {
      index: 14,
      cast: cast('self')
    },
    {
      index: 15,
      cast: cast('self')
    },
  ],
  year_built:{
    index: 57,
    cast: cast('year')
  }
}

function cast(to_type){
  //input: Enum { 'self',  }
  if (to_type === 'self'){
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