var parser = require ('../parse/parser')
, should = require('should')
, creds = require('../credentials')
, db_path = "mongodb://" + creds.mongolab.user + ":" + creds.mongolab.password + "@ds053140.mongolab.com:53140/lots_o_info_testing"
, db = require('mongoskin').db(db_path)
, db_accessor = require('../db_accessor')
, _ = require('underscore');

describe('Importing', function(){

  describe('Pluto', function(){
    var expected = require('./support/parse_pluto_expected')
    , p = parser.construct({
      data_set: 'pluto',
      test: true
    });

    describe('parser#construct', function(){
      
      it('adds translations object to p', function(){
        p.translations.should.eql( require('../parse/pluto_translations') );
      });
    });

    describe('parser#build_matrix', function(){
            
      beforeEach(function(done){
        parser.build_matrix(p, function(res){
          p = res;
          done();
        });
      });

      it('parses matrix from csv', function(){
        p.matrix.should.eql( expected.matrix );
      });

      describe('parser#build_collections', function(){

        beforeEach(function(){
          p = parser.build_collections(p);
          debugger;
        });
        
        it('builds and links collections', function(){
          should.warn = false;
          p.collections.should.eql(expected.collections);  
        });

        describe('db_accessor#batch_insert', function(){

          beforeEach(function(done){
            db_accessor.batch_insert(db, p.collections, done);
          });

          after(function(done){
            db.dropDatabase();
            done();
          });

          it('writes correct number of json docs to each mongo collection', function(){

            p.collections.map(function(collection){
              db.collection(collection.collection).count(function(err, count){
                should.not.exist(err);
                count.should.eql(collection.docs.length);
              });
            });
          });
        });
      });
    });
  });
});

//HELPERS

var replace_mongo_ids = function(collections){
  var replacer = id_replacer(collections);
  return JSON.stringify(collections, replacer, 2);
}

var id_replacer = function (collections){

  var keys = collections
        .map(function(c){ return c.collection; })
        .concat('_id');

  return function(k,v){
    if (_.contains(keys,k)){ return "<SOME_ID>"; }
    return v;
  };
}

var pp = function(obj){
  return console.log(JSON.stringify(obj, null, 2));
};

