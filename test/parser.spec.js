var parser = require ('../parse/parser')
  , should = require('should')
  , creds = require('../credentials')
  , db_path = "mongodb://" + creds.mongolab.user + ":" + creds.mongolab.password + "@ds053190.mongolab.com:53190/lots_o_info_staging"
  , db = require('mongoskin').db(db_path)
  , dao = require('../dao')

describe('Parser', function(){

  describe('Pluto', function(){
    var data_set = 'pluto'
      , source_path = './test/sample_data/pluto/BK.csv'
      , expected = require('./support/parse_pluto_expected')
      , matrix, translations, base_docs, ref_docs, all_docs

    describe('#translations', function(){

      it('retrieves correct translations object', function(){
        parser.translations('pluto').should.eql( require('../parse/pluto_translations') )
      })
    })

    describe('#build_matrix', function(){

      beforeEach(function(done){
        parser.build_matrix(source_path, function(res){
          matrix = res
          done()
        })
      })

      it('parses 2d matrix from csv', function(){
        // parser.matrix.should.eql( expected.matrix )
        matrix.should.eql( expected.matrix )
      })

      describe('#build_base_docs', function(){
      
        beforeEach(function(){
          translations = parser.translations('pluto')
          base_docs = parser.build_base_docs(matrix, translations)
        })

        it('maps cell values to json values', function(){
          base_docs.should.eql(expected.base_docs)
        })

        describe('#build_ref_docs', function(){

          beforeEach(function(){
            ref_docs = parser.build_ref_docs(matrix, translations)                  
          })

          it.only('appends refs to docs', function(){
            ref_docs.should.eql(expected.ref_docs)
          })

          describe('writing to db', function(){
            
            beforeEach(function(done){
              model.batch_save(db, docs, done)
            })
  
            it('writes json docs to mongo', function(){
              db.collection('properties').count(function(err, count){
                should.not.exist(err)
                count.should.eq( docs.length )
              })
            })
          })
        })
      })
    }) 
  })
})


