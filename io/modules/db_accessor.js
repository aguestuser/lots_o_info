var async = require('async')
, _ = require('underscore');
    
module.exports = {
  batch_insert: function(db, collections, done){
    async.parallelLimit(
      _.flatten(
        collections.map(function(collection){
          return collection.docs.map(function(doc){
            return function(doneThis){
              db.collection(collection.collection).insert(doc, function(err, res){
                if (err){ 
                  console.error(err);
                  process.exit();
                }
                doneThis(null, doc);
              });
            };
          });
        })
      ), 1000, done
    );
  }
}
