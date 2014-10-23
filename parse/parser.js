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

  return that
}






