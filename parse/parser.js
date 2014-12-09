// PARSE PLUTO .CSV
// source: http://www.nyc.gov/html/dcp/html/bytes/applbyte.shtml
// accessed: 10/19/14
// current as of: May 2014

var fs = require('fs')
, _ = require('underscore')
, mongo = require('mongoskin')
, parser;


// EXPORTS

module.exports = parser = {

  construct: function(spec){
    //input: { source_path : Str, data_set : Str }
    //output: Parser ADT
    spec.translations = require('./' + spec.data_set + '_translations');
    return spec;
  },

  build_matrix: function(p, callback){
    // input: p : Parser ADT, callback : Function(Parser ADT) [CPS]
    // does: parses csv data to 2d matrix, adds matrix attribute to parser ADT, passes ADT to callback
    fs.readFile(p.source_path, 'utf8', function(err, data){
      callback( _.extend( p, { matrix: to_matrix(data) } ) );
    });
  },

  collections: function(p){
    return p.collections ||
      this.build_collections(p, {}, this.collection_builders()).collections;
  },

  collection_builders: function(){
   return [
     link_collections,
     build_base_collection,
     build_ref_collections 
    ];
  },
  
  build_collections: function(p, builders){
    // console.log('running');
    // console.log(builders);    
    if (builders.length === 1){
      return _.first(builders)(p); // base case
    } else {
      return _.first(builders)(this.build_collections(p, _.rest(builders))); // recur
    }
  }
};

//PRIVATE

// CSV-TO-MATRIX FUNCTIONS

var to_matrix = function(data){
  //input: Str (results of fs.ReadFile)
  //output: Arr of Arr of Strs (each Str is a csv cell value)
  return _.rest(data.split('\r'))
    .map(function(row){
      return row.split(',');
    });
}

// MATRIX-TO-COLLECTIONS FUNCTIONS


var build_base_collection = function(p){
  // input: Parser ADT
  // does: translates matrix to arr of json docs, appends them to Parser ADT
  // output: Arr of JSON Objs
  
  var get_doc = function(row){ return to_doc(row, p.translations.base.fields); };
  
  return _.extend(p, {
    base: {
      collection: 'properties',
      docs: p.matrix.map(get_doc)//if i did currying, could i just add (p.translations... here?x)      
    }
  });  
};

var build_ref_collections = function (p){
  // input: Parser ADT
  // does:
  //   * translates matrix fields into array of Collections of form:
  //     {collection: Str, docs: [JSON] }
  //   * appends them to Parser ADT
  // output: new Parser ADT

  return _.extend(p, {
    refs: p.translations.refs.map(function(ref){
      var get_doc = function(row){ return to_doc(row, ref.fields); };
      return {
        collection: ref.collection,
        docs: p.matrix.map(get_doc)
      };
    })
  });
};

var link_collections = function (p){
  // input: Parser ADT
  // output: [Collection ADT]
  return _.extend(p, {
    collections: link_refs(p.refs).concat(link_base(p.base, p.refs))
  });
};


// TRANSLATION TRAVERSAL FUNCTIONS

var to_doc = function(row, field_mappings){
  //input: Arr of Strs
  //output: Nested JSON object
  return _.object(
    _.map(field_mappings, function(val, key){
      return [ key, get_nested_values(val, row) ];
    })
  );
}

var get_nested_values = function(val, row){
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

var get_arr = function(val, row){
  return _.map(val, function(elem){
    return get_nested_values( elem, row )  // recurse
  });
}

var get_obj = function(val, row){
  return _.object(
    _.map(val, function(sub_val, key){
      return [ key, get_nested_values(sub_val, row) ];
    })
  );
}

// COLLECTION LINKING FUNCTIONS


var link_refs = function (ref_doc_collections){
  return ref_doc_collections.map(function(collection){
    return { 
      collection: collection.collection,
      docs: collection.docs.map(function(doc){
        return _.extend (doc, { _id: mongo.ObjectID() });
      })
    };
  });
};

var link_base = function(base_collection, ref_collections){
  return ref_collections.map(function (ref_collection){
    return { 
      collection: base_collection.collection,
      docs: ref_collection.docs.map(function (ref_doc, i){ 
        return _.extend(
          base_collection.docs[i], 
          _.object([[ ref_collection.collection,  ref_doc._id ]])
        );
      })
    };
  });
};
