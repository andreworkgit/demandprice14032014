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

    projeto_nome: {
      type: "string",
      unique: true
    },

    projeto_descricao: {
      type: "string"
    },

    projetos: {
      type: "array"
    }
  },
  beforeCreate: function (values, next) {
    var projetos = [];
    //projetos[0]
    //[{projeto: [{nome: 'qqq'}]}]
    values.projetos = [{projeto: [{nome: values.projeto_nome, descricao: values.projeto_descricao}]}];  

    delete values.projeto_nome;
    delete values.projeto_descricao;

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