var fs = require('fs')
  , _ = require('underscore')
  , build_parser = require('parser')

function main(){
  
  var parser = build_parser({ // build parser object
        data_set: process.argv[2],
        source: process.argv[3]
      })

  parser.read_file(function(){ // call chained parsing methods on parser object
    parser.build_documents(function(){
      parser.persist_documents(function(){
        console.log('COMPLETE!') // celebrate!
      })
    })
  })

}();//self-invoke main function