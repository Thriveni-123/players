const Joi = require('joi');

module.exports.Login= Joi.object().keys({
    email: Joi.string().email().required(),
    password:Joi.string().required()
});
