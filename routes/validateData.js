const Joi = require('joi');

module.exports = function (options, variable) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        price: Joi.number().required()
    });
    
    return schema.validate(variable, options);
}