// Creation the routes of aplication
'Use Strict'
const express = require ('express');
const router = express.Router();
const computerservice = require('./computer-service')

// Get all computer
router.get('/', function(req, res){
    computerservice.getAllComputer((err, computer) =>{
        if(err){
            res.status(500).send({
                msg:err
            });
        }else if(computer === null){
            res.status(404).send({
                msg: "Computers null"
            });
        }else{
            res.status(200).send(computer)
        }
    })
});

// Get computer by ID
router.get('/:_id', function(req, res){
    let _id = req.params._id;
    computerservice.getComputerById(_id,(err, computer) =>{
        if(err){
            res.status(500).send({
                msg:err
            });
        }else if(computer === null){
            res.status(500).send({
                msg:"Computer null"
            });
        }else{
            res.status(200).send(computer)
        }
    });

});

// Add a computer by POST
router.post('/', function(req, res){
    let computer = req.body;
    computerservice.addComputer(computer, (err, result) => {
        if(err){
            res.status(500).send({
                msg: err
            });       
        }else if (result !== null){
            res.status(201).send({
                msg: 'Computer Created'
            });
        }
    })
});

// Update computer by ID
router.put('/:_id', function(req, res){
    let _id = req.params._id;
    let updateComputer = req.body;
    computerservice.updateComputerById(_id, updateComputer, (err, numUpdates) => {
        if(err || numUpdates === 0){
            res.status(500).send({
                msg: err
            });
        }else{
            res.status(200).send({
                msg: 'Computer Updated'
            });
        }
    });
});

// Delete computer by ID
router.delete('/:_id', function (req, res) {
    let _id = req.params._id;
    computerservice.deleteComputerById(_id, (err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Computer deleted!'
            });
        }
    });
})

module.exports = router;