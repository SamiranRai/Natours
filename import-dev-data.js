const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETING THE ALL USER
const deleteUserData = async () => {
    try {
        await User.deleteMany();
        console.log('All Users Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

console.log(process.argv);

//Link to start: node ./dev-data/data/import-dev-data.js --delete
//Link to start: node ./dev-data/data/import-dev-data.js --import

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
} else if (process.argv[2] === '--userDelete') {
    deleteUserData();
}