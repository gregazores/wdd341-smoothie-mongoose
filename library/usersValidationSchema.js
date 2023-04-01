const Joi = require('@hapi/joi')

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    price: Joi.string().required(),
    googleId: Joi.string().required()
})

module.exports = {
    userSchema
}