import mongoose from 'mongoose';

const mongoURI = 'mongodb://127.0.0.1:27017/employee_management'; // Replace "your_database_name" with your MongoDB database name

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

export default mongoose.connection;
