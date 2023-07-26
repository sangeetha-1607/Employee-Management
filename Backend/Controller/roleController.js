// Controller/roleController.js
import Role from '../Model/roleModel.js';
import Employee from '../Model/employeeModel.js';
import { formatSuccessResponse, formatErrorResponse } from '../Response/format.js';

// API to create a new role
export const createRole = async (req, res) => {
  try {
    const { role_name, dept_id, dept_name, inserted_by_name } = req.body;

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
    // If there's an error, send a formatted error response
    console.error('Error creating role:', err);
    res.status(500).json(formatErrorResponse('Failed to create role'));
  }
};

// Function to get a role by role ID
export const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.role_id;

    // Find the Role document by its role_id in the database
    const role = await Role.findOne({ role_id: roleId });
    if (!role) {
      return res.status(404).json(formatErrorResponse('Role not found'));
    }

    // Send the found Role as a formatted success response
    res.status(200).json(formatSuccessResponse(role));
  } catch (error) {
    // If there's an error, send a formatted error response
    console.error('Error fetching role:', error);
    res.status(500).json(formatErrorResponse('Failed to fetch role'));
  }
};


/*import Role from '../Model/roleModel.js';
import Employee from '../Model/employeeModel.js';


// API to create a new role
const createRole = async (req, res) => {
  try {
    const { role_name, dept_id, dept_name, inserted_by_name } = req.body;
    // Validate required fields and empty spaces
    if (!role_name || role_name.trim().length === 0) {
      return res.status(400).json({ message: 'Role name is required' });
    }
    if (!dept_id || isNaN(dept_id)) {
      return res.status(400).json({ message: 'Valid department ID is required' });
    }
    if (!dept_name || dept_name.trim().length === 0) {
      return res.status(400).json({ message: 'Department name is required' });
    }
    if (!inserted_by_name || inserted_by_name.trim().length === 0) {
      return res.status(400).json({ message: 'Inserted by name is required' });
    }

    // Validate role_name format
    if (!/^\s*[A-Za-z][A-Za-z\s]*$/.test(role_name)) {
      return res.status(400).json({ message: 'Role name should contain alphabets only' });
    }

    // Validate dept_id format (4-digit number starting with 2)
    if (!/^2\d{3}$/.test(dept_id.toString())) {
      return res.status(400).json({ message: 'Department ID should be a 4-digit number starting with 2' });
    }
    // Validate dept_name format (at least one alphabet and spaces only)
    if (!/^\s*[A-Za-z][A-Za-z\s]*$/.test(dept_name)) {
      return res.status(400).json({ message: 'Department name should contain alphabets only' });
    }

    // Find the corresponding Employee document by name
    const insertedByEmployee = await Employee.findOne({ firstname: inserted_by_name });

    if (!insertedByEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Get the ObjectId of the Employee and use it as "inserted_by"
    const newRole = new Role({
      role_name,
      dept_id,
      dept_name,
      inserted_by: insertedByEmployee.firstname,
      inserted_by_name, // Include the inserted_by_name in the inserted_by field
    });

    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (err) {
    console.error('Error creating role:', err);
    res.status(500).json({ error: 'Failed to create role' });
  }
};
  
// Function to get a role by role ID

const getRoleById = async (req, res) => {
  try {
    const roleId = req.params.role_id;
    // Validate role_id format (4-digit number starting with 1)
    if (!roleId || isNaN(roleId)) {
      return res.status(400).json({ message: 'Valid role ID is required' });
    }
    if (!/^1\d{3}$/.test(roleId.toString())) {
      return res.status(400).json({ message: 'Role ID should be a 4-digit number starting with 1' });
    }
    const role = await Role.findOne({ role_id: roleId });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ error: 'Failed to fetch role' });
  }
};
  

export { createRole, getRoleById, };*/
