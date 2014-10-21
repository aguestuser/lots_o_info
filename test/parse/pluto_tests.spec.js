console.log('i see this!')

var parser = require ('../../parse/pluto')
  , should = require('should')
  , fs = require('fs')

describe('Parser', function(){
    describe('calling matrix_from()', function(){

      it('parses lines correctly', function(done){
        var path = '../../sample_data/pluto/BK.csv'
        fs.readFile(path, 'utf8', function(err, data){
        if (err) throw err

        console.log('i see this!')
        var actual = parser.matrix_from(data)
          , expected = [
            [ 'BK', '1', '1', '14v1' ],
            [ 'BK', '1', '2', '14v1' ],
            [ 'BK', '1', '50', '14v1' ]
          ]
        actual.should.be.equalDeep(expected)        
        done()
      })
    })
  })
})

