var parser = require ('../parse/parser')
  , should = require('should')
  , creds = require('../credentials')
  , db_path = "mongodb://" + creds.mongolab.user + ":" + creds.mongolab.password + "@ds053140.mongolab.com:53140/lots_o_info_testing"
  , db = require('mongoskin').db(db_path)
  , db_accessor = require('../db_accessor')

describe('Parser', function(){

  describe('Pluto', function(){
    var data_set = 'pluto'
      , source_path = './test/sample_data/pluto/BK.csv'
      , expected = require('./support/parse_pluto_expected')

    describe('parser#translations', function(){

      var translations

      it('retrieves correct translations object', function(){
        parser.translations('pluto').should.eql( require('../parse/pluto_translations') )
      })
    })

    describe('parser#build_matrix', function(){
      
      var matrix

      beforeEach(function(done){
        parser.build_matrix(source_path, function(res){
          matrix = res
          done()
        })
      })

      it('parses 2d matrix from csv', function(){
        matrix.should.eql( expected.matrix )
      })

      describe('parser#build_base_collection', function(){
        
        var base_collection, translations

        beforeEach(function(){
          translations = parser.translations('pluto')
          base_collection = parser.build_base_collection(matrix, translations)
        })

        it('maps cell values to json values, returns array of documents', function(){
          base_collection.should.eql(expected.base_collection)
        })

        describe('parser#build_ref_collections', function(){
          
          var ref_collections

          beforeEach(function(){
            ref_collections = parser.build_ref_collections(matrix, translations)                  
          })

          it('maps cell values to json values, returns array of array of documents', function(){
            ref_collections.should.eql(expected.ref_collections)
          })

          describe('parser#link_refs', function(){

            var linked_ref_collections

            beforeEach(function(){
              linked_ref_collections = parser.link_refs(ref_collections)
            })

            it('creates unique ids for docs in ref collections', function(){
              replace_mongo_ids(linked_ref_collections, ref_replacer())
                .should.eql(
                  JSON.stringify(expected.linked_ref_collections, null, 2)
                )
            })

            describe('parser#link_base', function(){

              var linked_base_collections

              beforeEach(function(){
                linked_base_collections = parser.link_base(base_collection, linked_ref_collections)
              })

              it('links base docs to ref docs', function(){
                replace_mongo_ids(linked_base_collections, base_replacer(linked_ref_collections))
                  .should.eql(
                    JSON.stringify(expected.linked_base_collections, null, 2)
                  )
              })

              // missing a test to make sure ids actually match !!!
          
              describe('db_accessor#batch_insert', function(){

                var all_collections

                beforeEach(function(done){
                  all_collections = linked_base_collections.concat(linked_ref_collections)
                  db_accessor.batch_insert(db, all_collections, done)
                })

                after(function(done){
                  db.dropDatabase()
                  done()
                  // all_collections.map(function(collection){ db.collection(collection).drop() })
                })
      
                it('writes correct number of json docs to each mongo collection', function(){

                  all_collections.map(function(collection){
                    db.collection(collection.collection).count(function(err, count){
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




