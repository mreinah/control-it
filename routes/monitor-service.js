// Content the logical of comunication with BD, Inquiries, Create, Update, Delete
'Use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectId;

const Monitors = function () {
};

// Connect to DataBase**********************
Monitors.prototype.connectDb = function (callback) {
    MongoClient.connect("mongodb+srv://test:test@clases.d8gay.mongodb.net/controlIT?retryWrites=true&w=majority",
        {useNewUrlParser: true, useUnifiedTopology: true },
        function (err, database) {
            if (err) {
                callback(err);
            }
            db = database.db('controlIT').collection('monitor');

            callback(err, database);
        });
};
//*****************************************

// Necesary methods that we want to consult the Database

// Get all monitor of Database
Monitors.prototype.getAllMonitors = function(callback){
    return db.find({}).toArray(callback);
}

// Get monitor by ID
Monitors.prototype.getMonitorById = function(_id, callback){
    return db.find({ _id: ObjectId(_id) }).toArray(callback);
}

// Add by POST a monitor
Monitors.prototype.addMonitor = function(monitor, callback){
    return db.insertOne(monitor, callback);
}

// Update monitor by ID
Monitors.prototype.updateMonitorById = function(_id, updatedMonitor, callback){
    delete updatedMonitor._id;
    return db.updateOne({_id: ObjectId(_id)}, {$set: updatedMonitor}, callback);
}

// Delete monitor by ID
Monitors.prototype.deleteMonitorById = function(_id, callback){
    return db.deleteOne({_id: ObjectId(_id)}, callback);
}



// Export
module.exports = new Monitors();