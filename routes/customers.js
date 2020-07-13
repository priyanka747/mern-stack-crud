const router = require('express').Router();
let Customer=require('../model/customer.model');


router.route('/').get(function(req,res){
    Customer.find(function(err,customers){
        if(err){
            console.log(err);
        }else{
            res.json(customers);
        }
    });
});

router.route('/:id').get(function(req,res){
    let id = req.params.id;
    Customer.findById(id,function(err,customer){
            res.json(customer);
    });
});
router.route('/').post(function(req,res){
    let customer = new Customer(req.body);
    customer.save()
    .then(customer => {
        res.status(200).json({'customer':'customer added sucessfully'});
    }).catch(err => {
        res.status(400).send('adding new customer failed');
    })
});
router.route('/:id').post(function(req,res){
    
    Customer.findById(req.params.id)
    .then(customer => {
        customer.cust_id=req.body.cust_id;
        customer.cust_name=req.body.cust_name;
        customer.cust_email=req.body.cust_email;
        customer.cust_address=req.body.cust_address;
        customer.approved=req.body.approved;
        // res.json(customer);
        customer.save(req.params.id).then(customer =>{
            res.json({'customer':'customer updated'})
        }).catch(err => {
         res.status(400).send('updating  customer failed');
    }).catch(err=> res.status(404).send('customer not found'));
         
});
});

router.route('/:id').delete((req,res)=>{
    Customer.findByIdAndDelete(req.params.id)
    .then(()=> res.json("customer deleted"))
    .catch(err => res.status(400).json('Error: '+err));
}); 

module.exports=router;
