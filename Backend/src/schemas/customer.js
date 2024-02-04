import Joi from 'joi';

// Define Joi schema to validate the fields
 export const customerSchema = Joi.object({
    name: Joi.string().trim().required(),
    userId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),
    email: Joi.string().trim().email().required(),
    address: Joi.string().trim(),
    phone: Joi.string().trim(),
    dateOfBirth: Joi.date(),
});
