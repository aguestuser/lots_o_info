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

  var build_base_docs = function(matrix, translations){
    // input: Arr of Arrs, JSON Obj
    // does: translates matrix to arr of json docs
    // output: Arr of JSON Objs
    
    var get_doc = function(row){ return to_doc(row, translations.base.fields) }

    return { 
      collection: 'properties',
      docs: matrix.map(get_doc)
    }
  }
  that.build_base_docs = build_base_docs

  var build_ref_doc_collections = function(matrix, translations){
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
  that.build_ref_doc_collections = build_ref_doc_collections

  var build_links = function(base_docs, ref_doc_collections, db){

    new_ref_docs = idify_ref_docs(ref_docs, db)
    //try _.tap here instead of creating intermediary new_ref_docs var to pass to link_base_docs
    new_base_docs = link_base_docs(base_docs, new_ref_docs)

    return new_base_docs.concat(new_ref_docs)
  } 
  that.build_links = build_links

  //PRIVATE METHODS

  function link_ref_doc_collections(ref_doc_collections, db){
    var do_link_ref_doc_collection = function(docs){ return link_ref_docs( docs, db) }
    return ref_doc_collections.map(do_link_ref_docs)
  }

  function link_ref_doc_collection(collection, db){
    var do_append_id = function(doc){ return append_id(doc, db.ObjectId) }
    return { 
      collection: collection.collection,
      docs: collection.docs.map(do_append_id)
    }
  }

  function link_base_docs(base_docs, ref_doc_collections){

    return ref_doc_collections.map(function (collection){
      { 
        collection: collection.collection,
        docs: collection.docs.map(function (ref_doc, i){
          var idMaker = function(){ return ref_doc._id }
          return append_id( base_docs[i], idMaker ) 
        })
      }
    })
  }

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






