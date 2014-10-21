// PARSE PLUTO .CSV
// source: http://www.nyc.gov/html/dcp/html/bytes/applbyte.shtml
// accessed: 10/19/14
// current as of: May 2014

var persist_json = function(doc){
  // persist document to mongo      
  console.log('PROCESS COMPLETE: PLUTO PERSISTED TO MONGO!')
}

var parse_csv = function(doc, translations, path, callback){
  // input: Object Literal, Object Literal, String, Function(Object Literal)
  // does: Translates PLUTO .csv to JSON document according to our data structure, ie:
        // - reads CSV file, 
        // - maps csv column index to JSON document address,
        // - populates latter with contents of former,
        // - passes document to callback (for persisting to Mongo)
  fs.read(, function(){
    // row_matrix = (parse the csv into a 2D array)
    _.each(row_matrix, function(row_arr){
      _.each(row_arr, function(cell, i){
        j = translations[i]
        doc[j] = cell
        console.log('PLUTO ROW' + (i+1) + 'PARSED')
      })      
    })
    callback(doc)
  })
}

var util = {
  load_document: function (){
    return {
      'location': {},
      'specs': {},
      'zoning': {},
      'value': {},
      'district': {},
      'ownerships': []
    }
  },
  translations_for: function(doc){
    // output: Object of form { Int (column index): Str (json document location) }
    return
      { 
        0: doc['borough'],
        1: doc['block'],
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

var main = function(){
  var doc = util.load_document()
    , translations = util.translations_for(document)
    , path = '../io/pluto/14v1/BK.csv'
  parse_csv(doc, translations, path, persist_json) 
}()






