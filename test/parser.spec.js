var parser = require ('../parse/parser')
  , should = require('should')
  , creds = require('../credentials')
  , db_path = "mongodb://" + creds.mongolab.user + ":" + creds.mongolab.password + "@ds053190.mongolab.com:53190/lots_o_info_staging"
  , db = require('mongoskin').db(db_path)
  , db_accessor = require('../db_accessor')

describe('Parser', function(){

  describe('Pluto', function(){
    var data_set = 'pluto'
      , source_path = './test/sample_data/pluto/BK.csv'
      , expected = require('./support/parse_pluto_expected')

    describe('#translations', function(){

      var translations

      it('retrieves correct translations object', function(){
        parser.translations('pluto').should.eql( require('../parse/pluto_translations') )
      })
    })

    describe('#build_matrix', function(){
      
      var matrix

      beforeEach(function(done){
        parser.build_matrix(source_path, function(res){
          matrix = res
          done()
        })
      })

      it.only('parses 2d matrix from csv', function(){
        matrix.should.eql( expected.matrix )
      })

      describe('#build_base_collection', function(){
        
        var base_collection, translations

        beforeEach(function(){
          translations = parser.translations('pluto')
          base_collection = parser.build_base_collection(matrix, translations)
        })

        it('maps cell values to json values, returns array of documents', function(){
          base_collection.should.eql(expected.base_collection)
        })

        describe('#build_ref_collections', function(){
          
          var ref_collections

          beforeEach(function(){
            ref_collections = parser.build_ref_collections(matrix, translations)                  
          })

          it('maps cell values to json values, returns array of array of documents', function(){
            ref_collections.should.eql(expected.ref_collections)
          })

          describe('#link_refs', function(){

            var linked_ref_collections

            beforeEach(function(){
              linked_ref_collections = parser.link_refs(ref_collections)
            })

            it.only('links base docs to ref docs, concatenates all doc collections into an array', function(){
              replace_mongo_ids(linked_ref_collections, ref_replacer())
                .should.eql(
                  JSON.stringify(expected.linked_ref_collections, null, 2)
                )
            })

            describe('#link_base', function(){

              var linked_base_collections

              beforeEach(function(){
                linked_base_collections = parser.link_base(base_docs, linked_ref_collections)
              })

              it('links base docs to ref docs, concatenates all doc collections into an array', function(){
                replace_mongo_ids(linked_base_collections, base_replacer(linked_ref_collections))
                  .should.eql(
                    JSON.stringify(expected.linked_base_collections, null, 2)
                  )
              })

              // missing a test to make sure ids actually match !!!
          
              describe('writing to db', function(){
                var all_collections = linked_base_collections.concat(linked_ref_collections)

                beforeEach(function(done){
                  all_collections.map(function(collection){
                    db_accessor.batch_insert(db, collection, collection.docs, done)
                  })
                })
      
                it('writes correct number of json docs to each mongo collection', function(){

                  all_collections.map(function(collection){
                    db.collection(collection).count(function(err, count){
                      should.not.exist(err)
                      count.should.eq( collection.docs.length )
                    })
                  })
                })
              })
            }) 
          }) 
        })
      })
    }) 
  })
})

//HELPERS
function ref_replacer(){
  return function(k,v){
    if (k === "_id"){ return "<SOME_ID>" }
    return v
  }
}

function base_replacer(ref_collections){
  var keys = ref_collections.map(function(c){ return c.collection })
  return function(k,v){
    if ( _.contains(keys, k) ){ return "<SOME_ID>" }
    return v
  }
}

function replace_mongo_ids(collections, replacer){
  return JSON.stringify(collections, replacer, 2)
}




