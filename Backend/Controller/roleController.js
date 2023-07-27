//roleController.js
// Controller/roleController.js

import Role from '../Model/roleModel.js';
import Employee from '../Model/employeeModel.js';
import { formatSuccessResponse, formatErrorResponse } from '../Response/format.js';
import { validateCreateRole, validateGetRoleById } from '../Request/validation.js';
// API to create a new role
export const createRole = async (req, res) => {
  try {
    const { role_name, dept_id, dept_name, inserted_by_name } = await validateCreateRole(req);

    // Find the corresponding Employee document by name
    const insertedByEmployee = await Employee.findOne({ firstname: inserted_by_name });
    if (!insertedByEmployee) {
      return res.status(404).json(formatErrorResponse('Employee not found'));
    }

    // Create a new Role document
    const newRole = new Role({
      role_name,
      dept_id,
      dept_name,
      inserted_by: insertedByEmployee.firstname,
      inserted_by_name,
    });

    // Save the new Role document to the database
    const savedRole = await newRole.save();

    // Send the saved Role as a formatted success response
    res.status(201).json(formatSuccessResponse(savedRole));
  } catch (err) {
    // If there's a validation error, send the error messages in the response
    if (err.validationErrors) {
      return res.status(400).json(formatErrorResponse(err.validationErrors.join(', ')));
    }

    // If there's any other error, send a formatted error response
    console.error('Error creating role:', err);
    res.status(500).json(formatErrorResponse('Failed to create role'));
  }
  
};

// Function to get a role by role ID
export const getRoleById = async (req, res) => {
  try {
    //const roleId = req.params.role_id;
    const { role_id } = await validateGetRoleById(req);
    // Find the Role document by its role_id in the database
    //const role = await Role.findOne({ role_id: roleId });
    const role = await Role.findOne({ role_id });
    if (!role) {
      return res.status(404).json(formatErrorResponse('Role not found'));
    }

    // Send the found Role as a formatted success response
    res.status(200).json(formatSuccessResponse(role));
  } catch (error) {
    // If there's a validation error, send the error messages in the response
    if (error.validationErrors) {
      return res.status(400).json(formatErrorResponse(error.validationErrors.join(', ')));
    }

    // If there's any other error, send a formatted error response
    console.error('Error fetching role:', error);
    res.status(500).json(formatErrorResponse('Failed to fetch role'));
  }
};
