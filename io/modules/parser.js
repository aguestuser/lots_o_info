// PARSE PLUTO .CSV
// source: http://www.nyc.gov/html/dcp/html/bytes/applbyte.shtml
// accessed: 10/19/14
// current as of: May 2014

var fs = require('fs')
, _ = require('underscore')
, mongo = require('mongoskin')
, parser;


// EXPORTS

module.exports = parser = {

  construct: function(spec){
    //input: spec : { source_path : Str, data_set : Str }
    //output: {Parser}
    var that = spec,
        folder = that.test ? 'sample_data' : 'input_data';
    that.source_path = './io/'+folder+'/'+that.data_set+'/'+that.data_set+'.csv';
    that.translations = require('./' + that.data_set + '_translations');
    return that;
  },

  build_matrix: function(p, callback){
    // input: p : {Parser}, callback : Function({Parser} : { ... matrix: [[]] }) [CPS]
    // does: parses csv to 2d matrix, appends matrix to parser ADT, passes ADT to callback
    debugger;
    fs.readFile(p.source_path, 'utf8', function(err, data){
      debugger;
      if (err) throw(err);
      callback( _.extend( p, { matrix: to_matrix(data) } ) );
    });
  },

  build_collections: function(p){
    //input: {Parser} : { ... matrix: [[]] }
    //output: {Parser} : { ... matrix: [[]], collections: [{JSON}]  }
    return _.extend(p, {
      collections: add_refs(p.translations.map(function(c){
        return {
          collection: c.collection,
          docs: p.matrix.map(function(row, i){
            return id_ify(to_doc(row, c.fields, i), p, i);
          })
        };
      }))
    });
  }
};

//PRIVATE

// CSV-TO-MATRIX FUNCTIONS

var to_matrix = function(data){
  //input: Str (results of fs.ReadFile)
  //output: Arr of Arr of Strs (each Str is a csv cell value)
  return _.rest(data.split('\r'))
    .map(function(row){
      return row.split(',');
    });
}

// COLLECTION BUILDING FUNCTIONS

var to_doc = function(row, fields, i){
  //input: row : [Str], fields : {JSON}
  //output: {JSON}

  var replace = function(node){ return node.hasOwnProperty('index'); },
      replacer = index_replacer(row);

  return patch(fields, replace, replacer);
}

var index_replacer = function(row){
  return function(node){
    return node.cast(row[node.index]);
  };
};

// COLLECTION LINKING FUNCTIONS

var id_ify = function(doc, p, i){
  var id = p.test ? i : mongo.ObjectID();
  return _.extend(doc, { _id: id });
};

var add_refs = function(colls){
  //input: [{Collection : { ... _: { ref_to: Str }} }]
  //output: [{Collection : { ... _: { ref_to: Num }} }]
  return colls.map(function(coll){
    return {
      collection: coll.collection,
      docs: coll.docs.map(function(doc, i){
        var replace = ref_replace(doc, colls, i),
          replacer = ref_replacer(doc, colls, i);
        return patch(doc, replace, replacer);
      })
    };
  });
};

var ref_replace = function(doc, colls, i){
  return function(node){
    return _.intersection(_.values(node), _.pluck(colls, 'collection')).length > 0;
  };
};

var ref_replacer = function(doc, colls, i){
  return function(node){
    debugger;
    var coll = _.find(colls, function(coll){
      return _.contains(_.values(node), coll.collection);
    });
    return coll.docs[i]._id;
  };
};

// TREE TRAVERSAL

var patch = function(node, replace, replacer){
  // input: node : 'a, row: Str
  // output: 'a

  if (typeof node !== 'object'){                      // for flat nodees (Str, Date, Num...)
    return node;                                      // return
  }
  else {
    if (replace(node)){                               // for obj matching replace predicate
      return replacer(node);                          // return
    }
    else if ( _.isArray(node) ){                      // for array
      return node.map(function(item){
        return patch(item, replace, replacer);        // recur
      });
    }
    else {                                            // for generic object
      return _.object(
        _.map(node, function(val, key){
          return[key, patch(val, replace, replacer)]; // recur
        })
      );
    }
  }
};
