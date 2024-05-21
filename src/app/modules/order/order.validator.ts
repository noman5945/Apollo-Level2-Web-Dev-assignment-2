import Joi, { ObjectSchema } from "joi";

const orderValidationSchema:ObjectSchema=Joi.object({
    orderID:Joi.string().required().messages({
        'string.base': 'Unique Id for order must be a string',
        'any.required': 'Unique Id for order is required'
    }),
    email:Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'A valid email is required',
        'any.required': 'Email is required'
    }),
    productId:Joi.string().required().messages({
        'string.base': 'Product ID must be a string',
        'any.required': 'Product ID is missing'
    }),
    price:Joi.number().required().messages({
        'number.base': 'Price must be a number',
        'any.required': 'Price is missing'
    }),
    quantity:Joi.number().required().messages({
        'number.base': 'Quantity must be a number',
        'any.required': 'Quantity is missing'
    })
})

export default orderValidationSchema