var parser = require('parser')
  , db_accessor = require('../db_accessor')
  , creds = require('../credentials')
  , db_path = "mongodb://" + creds.mongolab.user + ":" + creds.mongolab.password + "@ds053190.mongolab.com:53190/lots_o_info_staging"
  , db = require('mongoskin').db(db_path)

;(function main(){

  var data_set = process.argv[2]
    , source_path = process.argv[3]
    , translations = parser.translations(data_set)

  parser.build_matrix(function(matrix){ 
    parser.link_docs(
      parser.build_base_docs(matrix, translations),
      parser.build_ref_doc_collections(matrix, translations)
    ).forEach(function(doc){
      db_accessor.batch_insert(db, doc.docs, doc.collections, function(err, res){
        console.log('Wrote' + res.length + 'documents to db.')
      }, {})  
    })
  })
})();//self-invoke main