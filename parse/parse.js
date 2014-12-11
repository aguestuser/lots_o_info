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

  var p = parser.construct({
    data_set: process.argv[2]
  });

  parser.build_matrix(function(p){
    parser.build_collections(p).collections.map(function(c){
      db_accessor.batch_insert(db, c.collection, c.docs, function(err, res){
        if (err){ throw(err); }
        else{ console.log('FINISHED: Wrote' + res.length + 'documents to' + c.length + 'collections.'); }
      }, {});
    });
  });
})();//self-invoke main function  
