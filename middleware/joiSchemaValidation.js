const Joi = require('joi');

const constants = require('../constants');

const validatObjectSchema = (data, schema) => {
   const result = Joi.validate(data,schema,{convert: false});
    if(result.error) {
   const errorDetails = result.error.details.map(value => {
      return {
         error:value.message,
         path : value.path
      };
   });
    return errorDetails;
   }
   return null;
}

module.exports.validateBody = (schema) => {
   return (req, res, next) => {
      let response = { ...constants.defaultServerResponse};
       const error = validatObjectSchema(req.body,schema);
       if(error){
            response.body = error;
            response.message = constants.requestValidationMessage.BAD_REQUEST;
            return res.status(response.status).send(response);
       }
       return next();
   }
}  

module.exports.validateQueryParams = (schema) => {
   return (req, res, next) => {
      let response = { ...constants.defaultServerResponse};
       const error = validatObjectSchema(req.query,schema);
       if(error){
            response.body = error;
            response.message = constants.requestValidationMessage.BAD_REQUEST;
            return res.status(response.status).send(response);
       }
       return next();
   }
}  