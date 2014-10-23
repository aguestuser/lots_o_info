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
        parser.translations.should.eql( require('../parse/test_pluto_translations') )
      })
    })

    describe('#read_file()', function(){
      beforeEach(function(done){
        parser.read_file(done)
      })

      it('correctly parses 2d matrix from csv', function(){
        parser.matrix.should.eql( expected.matrix )
      })

      describe('#build_documents()', function(){
        
        beforeEach(function(done){
          parser.read_file(function(){
            parser.build_documents(done)
          })
        })

        it.only('correctly maps cell values to json values', function(){
          parser.docs.should.eql(expected.docs)
        })
      }) 
    }) 
  })
})



  // beforeEach('read file', function( done ){
  //   var path = './test/sample_data/pluto/BK.csv'

  //   fs.readFile( path, 'utf8', function( err, d ){
  //     if ( err ) return done( err )
  //     data = d
  //     done()
  //   })
  // })

  // describe('#matrix_from()', function(){
    
  //   beforeEach(function(){
  //     var matrix = parser.matrix_from(data)
  //   })
  //   var expected_matrix = [
  //     [ 'BK', '1', '1', '14v1' ], [ 'BK', '1', '2', '14v1' ], [ 'BK', '1', '50', '14v1' ] 
  //   ]

  //   it('parses lines correctly', function(){
  //     parser.matrix_from(data).should.eql(expected_matrix)
  //   })
    
  //   describe('')
  // }) // #matrix_from()


