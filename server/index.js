const cors = require('cors'); 
const express = require('express'); 
const connectDB = require('./config/db');
const todosRoutes = require('./routes/tasks.js');

const app = express(); 
// Connecting database 
connectDB(); 
// Parsing the data as json 
app.use(express.json());
//Cors initialize 
app.use(cors()); 
app.use('/todos', todosRoutes);
const PORT = process.env.PORT  || 3001; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
