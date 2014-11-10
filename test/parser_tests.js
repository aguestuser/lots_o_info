var parser = require ('../parse/parser')
  , should = require('should')
  , creds = require('../credentials')
  , db_path = "mongodb://" + creds.mongolab.user + ":" + creds.mongolab.password + "@ds053190.mongolab.com:53190/lots_o_info_staging"
  , db = require('mongoskin').db(db_path)
  , model = require('../model')

describe('Parser', function(){

  describe('Pluto', function(){
    var data_set = 'pluto'
      , source_path = './test/sample_data/pluto/BK.csv'
      , expected = require('./support/parse_pluto_expected')
      , matrix, docs

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

      describe('#build_documents', function(){
      
        beforeEach(function(){
          var translations = parser.translations('pluto')
          docs = parser.build_documents(matrix, translations)
        })

        it('maps cell values to json values', function(){
          docs.should.eql(expected.docs)
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


