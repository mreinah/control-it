// Creation the routes of aplication
'Use Strict'
const express = require ('express');
const router = express.Router();
const employeeservice = require('./employee-service')

// Get all employee
router.get('/', function(req, res){
    employeeservice.getAllEmployees((err, employee) =>{
        if(err){
            res.status(500).send({
                msg:err
            });
        }else if(employee === null){
            res.status(404).send({
                msg: "Employees null"
            });
        }else{
            res.status(200).send(employee)
        }
    })
});

// Get employee by ID
router.get('/:_id', function(req, res){
    let _id = req.params._id;
    employeeservice.getEmployeeById(_id,(err, employee) =>{
        if(err){
            res.status(500).send({
                msg:err
            });
        }else if(employee === null){
            res.status(500).send({
                msg:"Employee null"
            });
        }else{
            res.status(200).send(employee)
        }
    });

});

// Add a employee by POST
router.post('/', function(req, res){
    let employee = req.body;
    employeeservice.addEmployee(employee, (err, result) => {
        if(err){
            res.status(500).send({
                msg: err
            });       
        }else if (result !== null){
            res.status(201).send({
                msg: 'Employee Created'
            });
        }
    })
});

// Update employee by ID
router.put('/:_id', function(req, res){
    let _id = req.params._id;
    let updateEmployee = req.body;
    employeeservice.updateEmployeeById(_id, updateEmployee, (err, numUpdates) => {
        if(err || numUpdates === 0){
            res.status(500).send({
                msg: err
            });
        }else{
            res.status(200).send({
                msg: 'Employee Updated'
            });
        }
    });
});

// Delete employee by ID
router.delete('/:_id', function (req, res) {
    let _id = req.params._id;
    employeeservice.deleteEmployeeById(_id, (err) => {
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