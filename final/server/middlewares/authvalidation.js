const Joi = require('joi');

const signupvalidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        emailid: Joi.string().email().required(),
        Phonenumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
        department: Joi.string().required(),
        password: Joi.string().min(4).max(100).required(),
        confirmPassword: Joi.valid(Joi.ref('password')).required()
            .messages({ 'any.only': 'Passwords do not match' })
    });

    const { error } = schema.validate(req.body);

    if (error) {
        console.log("Validation error:", error.details);
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};



const loginvalidation = (req, res, next) => {
    const schema = Joi.object({
        identifier: Joi.string().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ me: error.details[0].message });
    }
    next();
}

module.exports = {
    signupvalidation,
    loginvalidation
};