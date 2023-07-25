// Request/validation.js
import { body, param, validationResult } from 'express-validator';

// Validation for creating a new role
export const validateCreateRole = [
  // Role name validation
  body('role_name').trim().notEmpty().withMessage('Role name is required')
    .isAlpha().withMessage('Role name should contain alphabets only'),

  // Department ID validation
  body('dept_id').notEmpty().withMessage('Valid department ID is required')
    .isInt().withMessage('Department ID should be a valid number')
    .isLength({ min: 4, max: 4 }).withMessage('Department ID should be a 4-digit number')
    .custom((value) => value.toString().startsWith('2')).withMessage('Department ID should start with 2'),

  // Department name validation
  body('dept_name').trim().notEmpty().withMessage('Department name is required')
    .isAlpha().withMessage('Department name should contain alphabets only'),

  // Inserted by name validation
  body('inserted_by_name').trim().notEmpty().withMessage('Inserted by name is required')
    .isAlpha().withMessage('Inserted by name should contain alphabets only'),
];

// Validation for getting a role by ID
export const validateGetRoleById = [
  // Role ID validation
  param('role_id').notEmpty().withMessage('Valid role ID is required')
    .isInt().withMessage('Role ID should be a valid number')
    .isLength({ min: 4, max: 4 }).withMessage('Role ID should be a 4-digit number')
    .custom((value) => value.toString().startsWith('1')).withMessage('Role ID should start with 1'),
];

// Custom validation middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
