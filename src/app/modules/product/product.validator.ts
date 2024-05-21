import Joi from 'joi'

// Variant vaildator schema
const variantValidatorSchema = Joi.object({
    type: Joi.string().required().messages({
        'string.base': 'Type must be a string',
        'string.empty': 'Type cannot be empty',
        'any.required': 'Type is required'
    }),
    value: Joi.string().required().messages({
        'string.base': 'Value must be a string',
        'string.empty': 'Value cannot be empty',
        'any.required': 'Value is required'
    })
});

// Inventory vaildator schema
const inventoryValidatorSchema = Joi.object({
    quantity: Joi.number().required().messages({
        'number.base': 'Quantity must be a number',
        'any.required': 'Quantity is required'
    }),
    inStock: Joi.boolean().default(true).messages({
        'boolean.base': 'InStock must be a boolean value'
    })
});

// Product vaildator schema
const productValidatorSchema = Joi.object({
    productId: Joi.string().required().messages({
        'string.base': 'Product ID must be a string',
        'string.empty': 'Product ID cannot be empty',
        'any.required': 'Product ID is required'
    }),
    name: Joi.string().required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required'
    }),
    description: Joi.string().required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required'
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price must be a number',
        'any.required': 'Price is required'
    }),
    category: Joi.string().required().messages({
        'string.base': 'Category must be a string',
        'string.empty': 'Category cannot be empty',
        'any.required': 'Category is required'
    }),
    tags: Joi.array().items(Joi.string()).required().messages({
        'array.base': 'Tags must be an array of strings',
        'any.required': 'Tags are required'
    }),
    variants: Joi.array().items(variantValidatorSchema).required().messages({
        'array.base': 'Variants must be an array of variant objects',
        'any.required': 'Variants are required'
    }),
    inventory: inventoryValidatorSchema.required().messages({
        'any.required': 'Inventory information is required'
    })
});

export default productValidatorSchema