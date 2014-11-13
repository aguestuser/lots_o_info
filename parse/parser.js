// PARSE PLUTO .CSV
// source: http://www.nyc.gov/html/dcp/html/bytes/applbyte.shtml
// accessed: 10/19/14
// current as of: May 2014

var fs = require('fs')
  _ = require('underscore')

module.exports = (function(){

  var that = {}

  //PUBLIC METHODS
  var build_matrix = function(source_path, callback){
    // input: Str(filepath), Function(Arr of Arrs) [CPS]
    // does: parses csv data to 2d matrix, adds matrix attribute to parser object

    fs.readFile(source_path, 'utf8', function(err, data){
      callback( to_matrix( data ) )
    })
  }
  that.build_matrix = build_matrix

  var translations = function(data_set){
    return require('./' + data_set + '_translations')
  }
  that.translations = translations

  var build_documents = function(matrix, translations){
    // input: Arr of Arrs, JSON Obj
    // does: translates matrix to arr of json docs
    // output: Arr of JSON Objs

    return matrix.map(function(row){
      return to_doc(row, translations)
    })
  }
  that.build_documents = build_documents

  //PRIVATE METHODS

  function to_matrix(data){
    //input: Str (results of fs.ReadFile)
    //output: Arr of Arr of Strs (each Str is a csv cell value)
    return _.rest(data.split('\r'))
      .map(function(row){
        return row.split(',')
      })
  }

  function to_doc(row, translations){
    //input: Arr of Strs
    //output: Nested JSON object
    return _.object(
      _.map(translations, function(val, key){
        return [ key, get_nested_values(val, row) ]
      })
    ) 
  }

  function get_nested_values(val, row){
    // input: Object Literal, String
    // output: Nested JSON objects (or String if val is String)

    if ( _.isArray(val) ){ // for array
      return get_arr(val, row) // (will recurse)
    } 
    else { // for object
      if (val.hasOwnProperty('index')){
        return val.cast(row[val.index]) // break recursion
      } 
      // else if (val is a string with 'reference:' in it) {
      //   // parse what sort of reference it is (call it ref)
      //   // insert the contained object into a collection of type 'ref'
      //   // store the id of ref as a reference in this object
      // }
      else {
        return get_obj(val, row) // (will recurse)  
      }
    }
  }

  function get_arr(val, row){
    return _.map(val, function(elem){
      return get_nested_values( elem, row )  // recurse
    })
  }

  function get_obj(val, row){
    return _.object(
      _.map(val, function(sub_val, key){
        return [ key, get_nested_values(sub_val, row) ]
      })
    )
  }

  return that
})();






