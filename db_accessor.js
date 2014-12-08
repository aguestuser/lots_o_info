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
                  console.error(err) 
                  process.exit
                }
                doneThis(null, doc)
              });
            };
          });
        })
      ), 1000, done
    );
  }
}



// module.exports = {
//   batch_insert: function(db, collection, docs, done){
//     async.parallelLimit(
//       docs.map(function(doc, i){
//         return function(doneThis){
//           db.collection(collection).insert(doc, function(err, res){
//             if (err){ 
//               console.error(err) 
//               process.exit
//             }
//             // console.log('wrote doc['+i+'] to db')
//             doneThis(null, docs[i])
//           })
//         }
//       }), 1000, done
//     )
//   }
// }
