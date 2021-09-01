// Content the logical of comunication with BD, Inquiries, Create, Update, Delete
'Use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectId;

const Employees = function () {
};

// Connect to DataBase**********************
Employees.prototype.connectDb = function (callback) {
    MongoClient.connect("mongodb+srv://test:test@clases.d8gay.mongodb.net/controlIT?retryWrites=true&w=majority",
        {useNewUrlParser: true, useUnifiedTopology: true },
        function (err, database) {
            if (err) {
                callback(err);
            }
            db = database.db('controlIT').collection('employee');

            callback(err, database);
        });
};
//*****************************************

// Necesary methods that we want to consult the Database

// Get all employee of Database
Employees.prototype.getAllEmployees = function(callback){
    return db.find({}).toArray(callback);
}

// Get employee by ID
Employees.prototype.getEmployeeById = function(_id, callback){
    return db.find({ _id: ObjectId(_id) }).toArray(callback);
}

// Add by POST a employee
Employees.prototype.addEmployee = function(employee, callback){
    return db.insertOne(employee, callback);
}

// Update employee by ID
Employees.prototype.updateEmployeeById = function(_id, updatedEmployee, callback){
    delete updatedEmployee._id;
    return db.updateOne({_id: ObjectId(_id)}, {$set: updatedEmployee}, callback);
}

// Delete employee by ID
Employees.prototype.deleteEmployeeById = function(_id, callback){
    return db.deleteOne({_id: ObjectId(_id)}, callback);
}



// Export
module.exports = new Employees();