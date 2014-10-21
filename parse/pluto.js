// PARSE PLUTO .CSV
// source: http://www.nyc.gov/html/dcp/html/bytes/applbyte.shtml
// accessed: 10/19/14
// current as of: May 2014

var _ = require('underscore')

module.exports = {
  matrix_from: function(data){
    //input: Str (results of fs.ReadFile)
    //output: Arr of Arr of Strs (each Str is a csv cell value)
    var all_rows = data.split(/$/)
      , cells = rows.split(',') // 
    return cells
  },
  translations: function(){
    return 'translations'
  },
  parse_csv: function(){
    ///
  },
  persist_json: function(){
    //
  }
}

var persist_json = function(doc){
  // persist document to mongo      
  console.log('PROCESS COMPLETE: PLUTO PERSISTED TO MONGO!')
}

var parse_csv = function(translations, path, callback){
  // input: Object Literal, String, Function(Object Literal)
  // does: Translates PLUTO .csv to JSON document according to our data structure, ie:
        // - reads CSV file, 
        // - maps csv column index to JSON document address,
        // - populates latter with contents of former,
        // - passes document to callback (for persisting to Mongo)
  var doc = {}

  fs.readFile(path, 'utf8', function(err, data){
    if (err) {
      console.error("parse_csv() encountered the following error while executing fs.readFileSync: ", err)
      throw err
    }
    var matrix = matrix_from(data)
    _.each(matrix, function(row){
      _.each(row, function(cell, i){
        dest = translations[i]
        doc[dest] = row[i]
        
      })
    })
    ///

    callback(doc)
  
  })

    // row_matrix = (parse the csv into a 2D array)
    _.each(row_matrix, function(row_arr){
      _.each(row_arr, function(cell, i){
        j = translations[i]
        doc[j] = cell
        console.log('.')
      })      
    })
    // once all that's done
    callback(doc)
}
/*
var translations_for = function(source){
    // input: String (element of { 'pluto', 'acris', 'dob' })
    // output: Object of form { Int (column index): Str (json document location) }
    var doc = {}
    return
      { 
        0: {
          dest: doc['borough'],
          type: 'string' 
        },
        2: doc['lot'],
        3: doc['district']['community_board'],
        6: doc['district']['school'],
        7: doc['district']['council'],
        9: doc['district']['fire'],
        10: doc['district']['police'],
        11: doc['district']['address'], // needs further parsing
        12: doc['zoning']['zoning'][0],
        13: doc['zoning']['zoning'][1],
        14: doc['zoning']['zoning'][2],
        //....
      }
    }
  }
}
*/
// var main = function(){
//   var translations = translations_for('pluto')
//     , path = '../io/input/pluto/14v1/BK.csv'
//   parse_csv(doc, translations, path, persist_json) 
// }()






