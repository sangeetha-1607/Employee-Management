// app.js or index.js
import express from 'express';

// import body-parser - helps to parse the request and create the req.body object
import bodyParser from "body-parser";

// import cors - provides Express middleware to enable CORS with various options, connect frontend
import cors from "cors";

import dotenv from 'dotenv';

// import routes
import router from './Routes/routes.js';

import { connectToDatabase } from './Services/mongoDBService.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

// Enable CORS for all routes
app.use(cors());

// use express json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use router
app.use(router);

// Middleware to parse request body as JSON
app.use(express.json());

app.get('/', function(req, res){
  res.json({ message: 'Welcome to Securra Health' });
});

// Connect to MongoDB and start the server
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
