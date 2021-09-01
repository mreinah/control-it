// Content the logical of comunication with BD, Inquiries, Create, Update, Delete
'Use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectId;

const Computers = function () {
};

// Connect to DataBase**********************
Computers.prototype.connectDb = function (callback) {
    MongoClient.connect("mongodb+srv://test:test@clases.d8gay.mongodb.net/controlIT?retryWrites=true&w=majority",
        {useNewUrlParser: true, useUnifiedTopology: true },
        function (err, database) {
            if (err) {
                callback(err);
            }
            db = database.db('controlIT').collection('computer');

            callback(err, database);
        });
};
//*****************************************

// Necesary methods that we want to consult the Database

// Get all computer of Database
Computers.prototype.getAllComputer = function(callback){
    return db.find({}).toArray(callback);
}

// Get computer by ID
Computers.prototype.getComputerById = function(_id, callback){
    return db.find({ _id: ObjectId(_id) }).toArray(callback);
}

// Add by POST a computer
Computers.prototype.addComputer = function(computer, callback){
    return db.insertOne(computer, callback);
}

// Update computer by ID
Computers.prototype.updateComputerById = function(_id, updatedComputer, callback){
    delete updatedComputer._id;
    return db.updateOne({_id: ObjectId(_id)}, {$set: updatedComputer}, callback);
}

// Delete computer by ID
Computers.prototype.deleteComputerById = function(_id, callback){
    return db.deleteOne({_id: ObjectId(_id)}, callback);
}



// Export
module.exports = new Computers();