var parser = require ('../parse/parser')
  , should = require('should')
  , fs = require('fs')

describe('Parser', function(){

  describe('Pluto', function(){
    var data_set = 'pluto'
      , source_path = './test/sample_data/pluto/BK.csv'
      , expected = require('./support/parse_pluto_expected')
      , matrix, docs

    // describe('construction', function(){
      
    //   it('retrieves correct translations object', function(){
    //     parser.translations.should.eql( require('../parse/pluto_translations') )
    //   })
    // })

    describe('#build_matrix', function(){

      beforeEach(function(done){
        parser.build_matrix(source_path, function(res){
          matrix = res
          done()
        })
      })

      it('correctly parses 2d matrix from csv', function(){
        // parser.matrix.should.eql( expected.matrix )
        matrix.should.eql( expected.matrix )
      })

      describe('#translations', function(){

        it('retrieves correct translations object', function(){
          parser.translations('pluto').should.eql( require('../parse/pluto_translations') )
        })
      })

      describe('#build_documents', function(){
      
        beforeEach(function(){
          var translations = parser.translations('pluto')
          docs = parser.build_documents(matrix, translations)
        })

        it('correctly maps cell values to json values', function(){
          docs.should.eql(expected.docs)
        })
      })
    }) 
  })
})


