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
    , translations = parser.translations(data_set)

  parser.build_matrix(source_path, function(matrix){ 
    
    var ref_collections = parser.build_ref_collections(matrix, translations)
      , base_collection = parser.build_base_collection(matrix, translations)
      , all_collections = parser.link_refs(ref_collections).concat(parser.link_base(base_collection, ref_collections))
    
    all_collections.map(function(collection){
      db_accessor.batch_insert(db, collection.collection, collection.docs, function(err, res){
        console.log('Wrote' + res.length + 'documents to db.')
      }, {})  
    })
  })
})();//self-invoke main function