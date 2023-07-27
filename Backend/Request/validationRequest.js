// Request/validation.js
import { body, param, validationResult } from 'express-validator';

const validateCreateRole = async (req) => {
// Validation for creating a new role
const validations = [
  // Role name validation
  body('role_name').trim().notEmpty().withMessage('Role name is required')
  .matches(/^[a-zA-Z\s]+$/).withMessage('Role name should contain alphabets only'),

  // Department ID validation
  body('dept_id').notEmpty().withMessage('Valid department ID is required')
    .isInt().withMessage('Department ID should be a valid number')
    .isLength({ min: 4, max: 4 }).withMessage('Department ID should be a 4-digit number')
    .custom((value) => value.toString().startsWith('2')).withMessage('Department ID should start with 2'),

  // Department name validation
  body('dept_name').trim().notEmpty().withMessage('Department name is required')
  .matches(/^[a-zA-Z\s]+$/).withMessage('Department name should contain alphabets only'),

  // Inserted by name validation
  body('inserted_by_name').trim().notEmpty().withMessage('Inserted by name is required')
    .isAlpha().withMessage('Inserted by name should contain alphabets only'),
  ];

  // Run validations using the validation middleware
  await Promise.all(validations.map(validation => validation.run(req)));

  // Check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw { validationErrors: errorMessages };
  }
  const { role_name, dept_id, dept_name, inserted_by_name } = req.body;
  return { role_name, dept_id, dept_name, inserted_by_name };
};
// Validation for getting a role by ID
const validateGetRoleById = async (req) => {
  const validations = [
  // Role ID validation
  param('role_id').notEmpty().withMessage('Valid role ID is required')
    .isInt().withMessage('Role ID should be a valid number')
    .isLength({ min: 4, max: 4 }).withMessage('Role ID should be a 4-digit number')
    .custom((value) => value.toString().startsWith('1')).withMessage('Role ID should start with 1'),
];
  // Run validations using the validation middleware
  await Promise.all(validations.map(validation => validation.run(req)));

  // Check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw { validationErrors: errorMessages };
  }
  const { role_id } = req.params;
  return { role_id };
};

export { validateCreateRole, validateGetRoleById };
