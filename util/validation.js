const Joi = require('joi');

const registerValidation = (data) => {
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.valid(data, schema)
}

const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.valid(data, schema)
}


module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;