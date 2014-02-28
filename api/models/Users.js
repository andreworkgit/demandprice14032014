/**
* Model Users
*/

module.exports = {

  schema: true,

  attributes: {
    firstname: {
      type: "string",
      required: true
    },
    lastname: {
      type: "string",
      required: true
    },
    email: {
      type: "string",
      email: true,
      required: true,
      unique: true
    },
    password: {
      type: "string",
      required: true
    },
    projetos: {
      type: "array",
      projeto:{
        nome: "string",
        descricao: "string"
      }
    }
  },
  beforeCreate: function (values, next) {
    if (!values.password) {
      return next();
    }

    require('bcrypt-nodejs').hash(values.password, null, null, function (err, encryptedPassword) {
      if (err) return next(err);
      values.password = encryptedPassword;
      next();
    });
  },
  toJSON: function() {
    var obj = this.toObject();
    delete obj.updatedAt;
    delete obj.password;
    return obj;
  }

};