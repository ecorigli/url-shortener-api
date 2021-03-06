const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDatabase;
