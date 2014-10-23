var build_parser = require ('../parse/parser')
  , should = require('should')
  , fs = require('fs')

describe('Parser', function(){

  describe('Pluto', function(){
    var parser = build_parser({ 
          source: './test/sample_data/pluto/BK.csv',
          data_set: 'pluto'  
        })
      , expected = require('./support/parse_pluto_expected')

    describe('construction', function(){
      
      it('retrieves correct translations object', function(){
        parser.translations.should.eql( require('../parse/pluto_translations') )
      })
    })

    describe('#read_file()', function(){
      beforeEach(function(done){
        parser.read_file(done)
      })

      it('correctly parses 2d matrix from csv', function(){
        parser.matrix.should.eql( expected.matrix )
      })
    }) 

    describe('#build_documents()', function(){
      
      beforeEach(function(done){
        parser.read_file(function(){
          parser.build_documents(done)
        })
      })

      it('correctly maps cell values to json values', function(){
        parser.docs.should.eql(expected.docs)
      })
    }) 
  })
})


