const mongoose = require('mongoose'); 
const dotenv = require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true
        });
        console.log('MongoDB Connected...')
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;