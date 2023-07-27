// // routes.js
// import express from 'express';

// import { createRole, getRoleById, } from '../Controller/roleController.js';

// const router = express.Router();

// // Create a new role
// router.post('/roles', createRole);

// // Get a role by role ID
// router.get('/roles/:role_id', getRoleById);

// export default router;

// Routes/routes.js
import express from 'express';
import { createRole, getRoleById } from '../Controller/roleController.js';
//import { validateCreateRole, validateGetRoleById } from '../Request/validation.js';

const router = express.Router();

// Create a new role
router.post('/roles', createRole);

// Get a role by ID
router.get('/roles/:role_id', getRoleById);

export default router;
