var async = require('async')

module.exports = {
  batch_insert: function(db, collection, docs, refs, done){
    async.parallelLimit(
      docs.map(function(doc, i){
        return function(doneThis){
          db.collection(collection).insert(doc, function(err, res){
            if (err){ 
              console.error(err) 
              process.exit
            }
            // console.log('wrote doc['+i+'] to db')
            doneThis(null, docs[i])
          })
        }
      }), 1000, done
    )
  }
}