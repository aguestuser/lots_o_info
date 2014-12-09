// should probably call this something besides parse.js
// since it both parses and writes to the db
// and since it's one level "higher" 
// than both parser.js and db_accessor.js

// maybe import.js?

var parser = require('parser')
  , db_accessor = require('../db_accessor')
  , creds = require('../credentials')
  , db_path = "mongodb://" + creds.mongolab.user + ":" + creds.mongolab.password + "@ds053190.mongolab.com:53190/lots_o_info_staging"
  , db = require('mongoskin').db(db_path)

;(function main(){

  var data_set = process.argv[2]
  , source_path = process.argv[3]
  , p = parser.construct({
    data_set: data_set,
    source_path: source_path
  });

  parser.build_matrix(function(p){

    var collections = parser.build_collections(p);
    
    var collections = parser.link_refs(
      parser.build_base_collections(
        parser.build_ref_collections(p)
      )
    ).all_collections();
    
    // var ref_collections = parser.build_ref_collections(matrix, translations)
    //   , base_collection = parser.build_base_collection(matrix, translations)
    //   , all_collections = parser.link_refs(ref_collections).concat(parser.link_base(base_collection, ref_collections))
    
    collections.map(function(collection){
      db_accessor.batch_insert(db, collection.collection, collection.docs, function(err, res){
        console.log('Wrote' + res.length + 'documents to db.')
      }, {})  
    })
  })
})();//self-invoke main function  
