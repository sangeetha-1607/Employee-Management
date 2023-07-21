//roleModel.js
import { Schema, model, mongoose } from 'mongoose';
import dbConnection from '../Config/MongoDB.js';
import autoIncrement from 'mongoose-auto-increment';

// Assuming you have already created a mongoose connection
autoIncrement.initialize(mongoose.connection);

const roleSchema = new Schema({
  role_id: { type: Number, unique: true },
  role_name: { type: String, validate: {
    validator: function (value) {
      // Regular expression to validate role_name (alphabets and spaces only)
      return /^\s*[A-Za-z][A-Za-z\s]*$/.test(value);
    },
    message: 'Role name name should contain alphabets only',
  }, },
  dept_id: { type: Number, validate: {
    validator: function (value) {
      // Regular expression to validate dept_id (4-digit numbers starting with 2)
      return /^2\d{3}$/.test(value.toString());
    },
    message: 'Department ID should be a 4-digit number starting with 2',
  }, },
  dept_name: { type: String, validate: {
    validator: function (value) {
      // Regular expression to validate dept_name (alphabets and spaces only)
      return /^\s*[A-Za-z][A-Za-z\s]*$/.test(value);
    },
    message: 'Department name should contain alphabets only',
  }, },
  inserted_date: { type: Date, default: Date.now() },
  updated_date: { type: Date, default: Date.now() },
  inserted_by: { type: String, ref: 'Employee', validate: {
    validator: async function (value) {
      // Custom validation to check if the employee exists
      const employee = await mongoose.model('Employee').findOne({ firstname: value });
      return !!employee;
    },
    message: 'Employee with the given name does not exist',
  }, }, 
  updated_by: { type: String, ref: 'Employee' , validate: {
    validator: async function (value) {
      // Custom validation to check if the employee exists
      const employee = await mongoose.model('Employee').findOne({ firstname: value });
      return !!employee;
    },
    message: 'Employee with the given name does not exist',
  },}, 
  is_active_flag: { type: Boolean, default: true }, 
});

// Initialize auto-increment for the role_id field
roleSchema.plugin(autoIncrement.plugin, {
  model: 'Role',
  field: 'role_id',
  startAt: 1001,
  incrementBy: 1,
});

const Role = model('Role', roleSchema);

export default Role;
