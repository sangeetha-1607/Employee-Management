import Role from '../Model/roleModel.js';
import Employee from '../Model/employeeModel.js';


// API to create a new role
const createRole = async (req, res) => {
  try {
    const { role_name, dept_id, dept_name, inserted_by_name } = req.body;

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
  

export { createRole, getRoleById, };
