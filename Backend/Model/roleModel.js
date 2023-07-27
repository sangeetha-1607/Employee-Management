//roleModel.js
import { Schema, model, mongoose } from 'mongoose';
//import dbConnection from '../Config/MongoDB.js';
import autoIncrement from 'mongoose-auto-increment';

// Assuming you have already created a mongoose connection
autoIncrement.initialize(mongoose.connection);

const roleSchema = new Schema({
  role_id: { type: Number, unique: true, index: true },
  role_name: { type: String },
  dept_id: { type: Number },
  dept_name: { type: String },
  inserted_date: { type: Date, default: Date.now() },
  updated_date: { type: Date, default: Date.now() },
  inserted_by: { type: String, ref: 'Employee' }, 
  updated_by: { type: String, ref: 'Employee' }, 
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
