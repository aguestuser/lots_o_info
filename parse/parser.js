// PARSE PLUTO .CSV
// source: http://www.nyc.gov/html/dcp/html/bytes/applbyte.shtml
// accessed: 10/19/14
// current as of: May 2014

var fs = require('fs')
  _ = require('underscore')

module.exports = function(spec){
  //input: Object Literal of form:
    // { 
    //  data_set: Enum ({'pluto', 'acris', 'dob' }, 
    //  source: Str (filepath) 
    // }
  //output: Parser obj

  //ATTRIBUTES
  var that = spec
  that.translations = require('./' + that.data_set + '_translations')

  //PUBLIC METHODS
  var read_file = function(callback){
    // input: initialized Parser object(implicit), Function(data) [CPS]
    // does: parses csv data to 2d matrix, adds matrix attribute to parser object
    // output: mutated Parser object

    fs.readFile(that.source, 'utf8', function(err, data){
      that['matrix'] = matrix_from(data)
      callback.apply(that)
    })
  }
  that.read_file = read_file

  // var build_documents = function(callback){
  //   // input: Parser object with matrix attribute initialized
  //   // does: constructs doc attribute
  //   // output: mutated Parser object

  //   docs = []
  //   _.each(that.matrix, function(row, i){
  //     docs[i] = {} 
  //     _.each(that.translations, function(keys, index){
  //       _.extend(docs[i], cell_to_json( row[index], docs[i], keys ) )
  //     })
  //     // console.log('docs['+i+']: ', docs[i])
  //   })

  //   that['docs'] = docs
  //   callback.apply(that)
  // }
  // that.build_documents = build_documents 

  var build_documents = function(callback){
    // input: Parser object with matrix attribute initialized
    // does: constructs doc attribute
    // output: mutated Parser object

    docs = []
    _.each(that.matrix, function(row){
      docs.push(document_from(row)) 
    })

    that['docs'] = docs
    callback.apply(that)
  }
  that.build_documents = build_documents 

  //PRIVATE METHODS

  function matrix_from(data){
    //input: Str (results of fs.ReadFile)
    //output: Arr of Arr of Strs (each Str is a csv cell value)
    var rows = data.split('\r')
    rows.shift()
    return _.map(rows, function(row){
      return row.split(',') 
    })
  }

  function document_from(row){
    var doc = {}
    _.each(that.translations, function(val, key){
      doc[key] = nested_values_from(val, row)
    })
    return doc
  }

  function nested_values_from(val, row){
    // input: Object Literal, String
    // output: Nested JSON objects (or String if val is String)

    if ( _.isArray(val) ){ // for array
      return arr_from(val, row) // (will recurse)
    } 
    else { // for object
      if (val.hasOwnProperty('index')){
        return val.cast(row[val.index]) // break recursion
      }
      else {
        return obj_from(val, row) // (will recurse)  
      }
    }
  }

  function arr_from(val, row){
    var arr = []
    _.each(val, function(elem){
      arr.push( nested_values_from( elem, row ) ) // recurse
    })
    return arr
  }

  function obj_from(val, row){
    var obj = {}
    _.each(val, function(sub_val, key){
      obj[key] = nested_values_from(sub_val, row) // recurse
    })
    return obj
  }


  function cell_to_json(val, doc, keys, count, location){
    // input: Str (csv cell val), JSON Object, Arr of Strs (JSON obj keys), Num (index of keys Arr)
    // does: 
      // - loops through an array of keys
      // - adds each key to JSON object (doc) as nested value under previous key
      // - once all keys added, stores cell data as value, returns JSON object
    // output: JSON Object

    var count = count || 0
      , location = location || doc
      , key = keys[count] || null

    if ( count === keys.length - 1 ){
      location[key] = val    
      
      return doc // break recursion
    } 
    else {
      location[key] = location[key] || {}
      count += 1
   
      cell_to_json( val, doc, keys, count, location[key] ) // recurse    
    }
  }


  //PRIVATE METHODS


  return that
}

//   translations_for: function(data_set){
//     return 
//   },
//   read_file: function(that, callback){
//     // input: Object Literal { data_set: , source: , translations: }, Function(data)
//       fs.readFile(path, 'utf8', function(err, data){
//       that['matrix'] = matrix_from(data)
      
//       callback(that)
//     })
//   },
//   matrix_from: function(data){
//     //input: Str (results of fs.ReadFile)
//     //output: Arr of Arr of Strs (each Str is a csv cell value)
//     var rows = data.split('\r')
//     rows.shift()
//     return _.map(rows, function(row){
//       return row.split(',') 
//     })
//   },

//   parse_csv: function(){
//     ///
//   },
//   persist_json: function(){
//     //
//   }
// }

// var persist_json = function(doc){
//   // persist document to mongo      
//   console.log('PROCESS COMPLETE: PLUTO PERSISTED TO MONGO!')
// }

// var parse_csv = function(translations, path, callback){
//   // input: Object Literal, String, Function(Object Literal)
//   // does: Translates PLUTO .csv to JSON document according to our data structure, ie:
//         // - reads CSV file, 
//         // - maps csv column index to JSON document address,
//         // - populates latter with contents of former,
//         // - passes document to callback (for persisting to Mongo)
//   var doc = {}

//   fs.readFile(path, 'utf8', function(err, data){
//     if (err) {
//       console.error("parse_csv() encountered the following error while executing fs.readFileSync: ", err)
//       throw err
//     }
//     var matrix = matrix_from(data)
//     _.each(matrix, function(row){
//       _.each(row, function(cell, i){
//         dest = translations[i]
//         doc[dest] = row[i]
        
//       })
//     })
//     ///

//     callback(doc)
  
//   })

//     // row_matrix = (parse the csv into a 2D array)
//     _.each(row_matrix, function(row_arr){
//       _.each(row_arr, function(cell, i){
//         j = translations[i]
//         doc[j] = cell
//         console.log('.')
//       })      
//     })
//     // once all that's done
//     callback(doc)
// }

// var translations_for = function(doc){
//     // input: String (element of { 'pluto', 'acris', 'dob' })
//     // output: Object of form { Int (column index): Str (json document location) }
//     var doc = {}
//     return
//       { 
//         0: doc['borough'],
//         2: doc['lot'],
//         3: doc['district']['community_board'],
//         6: doc['district']['school'],
//         7: doc['district']['council'],
//         9: doc['district']['fire'],
//         10: doc['district']['police'],
//         11: doc['district']['address'], // needs further parsing
//         12: doc['zoning']['zoning'][0],
//         13: doc['zoning']['zoning'][1],
//         14: doc['zoning']['zoning'][2]
//         //....
//       }
//     }
//   }
// }

// var main = function(){
//   var translations = translations_for('pluto')
//     , path = '../io/input/pluto/14v1/BK.csv'
//   parse_csv(doc, translations, path, persist_json) 
// }()






