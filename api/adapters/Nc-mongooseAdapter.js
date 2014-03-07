


module.exports = (function () {


  /**
   * Nc-mongooseAdapter
   * 
   * @module      :: Adapter
   * @description :: A short summary of what this adapter is for and what interfaces it supports.
   * @docs        :: http://sailsjs.org/#!documentation/adapters
   *
   * @syncable    :: false
   * @schema      :: false
   */

  var mongoose = require('mongoose'),Modelo;

  var Adapter = {

    /**
     * registerCollection() is run multiple times (once for each model, aka collection)
     * before the server ever starts.  It allows us to register our models with the
     * underlying adapter interface.  (don't forget to cb() when you're done!)
     */

    registerCollection: function (collection, cb) {
      //console.log('registerCollection');
      //console.log(collection);
      createConnection(collection.config);
      createModel(collection.identity);

      cb();
    },

    define: function(collectionName, definition, cb) {
      //console.log('define');
      //console.log(definition);

    },

    mongoose: function(collectionName,cb) {
      cb(Modelo);
    },

    find: function(collectionName,options, cb) {
       Modelo.find(options, function (err, user) {
        cb(err,user);
       });

    },

    identity: 'sails-ncmongoose'

  };

  function createConnection(config) {
    //console.log('createConnection');
    //console.log(config.url);
    mongoose.connect(config.url);

  }

  function createModel(collectionName){

    var objSchema = require('../models/mongoose/'+collectionName.toUpperCase()+'.js')(mongoose);
    Modelo = mongoose.model(collectionName, objSchema);
  }


	return Adapter;
})();
