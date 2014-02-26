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
    }
  }

};