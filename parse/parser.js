// PARSE PLUTO .CSV
// source: http://www.nyc.gov/html/dcp/html/bytes/applbyte.shtml
// accessed: 10/19/14
// current as of: May 2014

var fs = require('fs')
  _ = require('underscore')
  mongo = require('mongoskin')

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

  var build_base_collection = function(matrix, translations){
    // input: Arr of Arrs, JSON Obj
    // does: translates matrix to arr of json docs
    // output: Arr of JSON Objs
    
    var get_doc = function(row){ return to_doc(row, translations.base.fields) }

    return { 
      collection: 'properties',
      docs: matrix.map(get_doc)
    }
  }
  that.build_base_collection = build_base_collection

  var build_ref_collections = function(matrix, translations){
    // input: [[Str]], Obj of type: 
    //  { base: { collection: Str, fields: { <field_name>: { index: Num, cast: Function(Str) } } } }
    // output: [JSON Obj]

    return translations.refs.map(function(ref){

      var get_doc = function(row){ return to_doc(row, ref.fields) }

      return {
        collection: ref.collection,
        docs: matrix.map(get_doc)
      }
    })
  }
  that.build_ref_collections = build_ref_collections

  function link_refs(ref_doc_collections){
    var do_append_id = function(doc){ return append_id(doc, mongo.ObjectID) }
    
    return ref_doc_collections.map(function(collection){
      return { 
        collection: collection.collection,
        docs: collection.docs.map(do_append_id)
      }
    })
  }
  that.link_refs = link_refs

  function link_base(base_collection, ref_collections){

    return ref_collections.map(function (ref_collection){
      return { 
        collection: base_collection.collection,
        docs: ref_collection.docs.map(function (ref_doc, i){ 
          return _.extend(
            base_collection.docs[i], 
            _.object([[ ref_collection.collection,  ref_doc._id ]])
          )
          console.log('>>>OBJECT', _.object([[ ref_collection.collection,  ref_doc._id ]]))
        })
      }
    })
  }
  that.link_base = link_base

  //PRIVATE METHODS

  function append_id(doc, idMaker){
    return _.extend(doc, { _id: idMaker() })
  }

  function to_matrix(data){
    //input: Str (results of fs.ReadFile)
    //output: Arr of Arr of Strs (each Str is a csv cell value)
    return _.rest(data.split('\r'))
      .map(function(row){
        return row.split(',')
      })
  }

  function to_doc(row, field_mappings){
    //input: Arr of Strs
    //output: Nested JSON object
    return _.object(
      _.map(field_mappings, function(val, key){
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






