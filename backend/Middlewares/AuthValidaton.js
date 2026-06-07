const joi = require('joi');

const signUpValidation = (req, res, next) => { 
    const schema = joi.object({
        username: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    signUpValidation,
    loginValidation
};