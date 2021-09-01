// Creation the routes of aplication
'Use Strict'
const express = require ('express');
const router = express.Router();
const monitorservice = require('./monitor-service')

// Get all monitor
router.get('/', function(req, res){
    monitorservice.getAllMonitors((err, monitor) =>{
        if(err){
            res.status(500).send({
                msg:err
            });
        }else if(monitor === null){
            res.status(404).send({
                msg: "Monitors null"
            });
        }else{
            res.status(200).send(monitor)
        }
    })
});

// Get monitor by ID
router.get('/:_id', function(req, res){
    let _id = req.params._id;
    monitorservice.getMonitorById(_id,(err, monitor) =>{
        if(err){
            res.status(500).send({
                msg:err
            });
        }else if(monitor === null){
            res.status(500).send({
                msg:"Monitor null"
            });
        }else{
            res.status(200).send(monitor)
        }
    });

});

// Add a monitor by POST
router.post('/', function(req, res){
    let monitor = req.body;
    monitorservice.addMonitor(monitor, (err, result) => {
        if(err){
            res.status(500).send({
                msg: err
            });       
        }else if (result !== null){
            res.status(201).send({
                msg: 'Monitor Created'
            });
        }
    })
});

// Update monitor by ID
router.put('/:_id', function(req, res){
    let _id = req.params._id;
    let updateMonitor = req.body;
    monitorservice.updateMonitorById(_id, updateMonitor, (err, numUpdates) => {
        if(err || numUpdates === 0){
            res.status(500).send({
                msg: err
            });
        }else{
            res.status(200).send({
                msg: 'Monitor Updated'
            });
        }
    });
});

// Delete monitor by ID
router.delete('/:_id', function (req, res) {
    let _id = req.params._id;
    monitorservice.deleteMonitorById(_id, (err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Monitor deleted!'
            });
        }
    });
})

module.exports = router;