const router = require('express').Router();
let Product=require('../model/product.model');


router.route('/').get(function(req,res){
    Product.find(function(err,products){
        if(err){
            console.log(err);
        }else{
            res.json(products);
        }
    });
});

router.route('/:id').get(function(req,res){
    let id = req.params.id;
    Product.findById(id,function(err,product){
            res.json(product);
    });
});
router.route('/').post(function(req,res){
    let product = new Product(req.body);
    res.json(req.body);
    product.save()
    .then(product => {
        // res.status(200).json({'product':'product added sucessfully'});
    }).catch(err => {
        // res.status(400).send('adding new product failed');
    })
});
router.route('/:id').post(function(req,res){
    
    Product.findById(req.params.id)
    .then(product => {
        product.product_name=req.body.product_name;
        product.product_description=req.body.product_description;
        product.product_price=req.body.product_price;
        product.date_create=req.body.date_create;
        // res.json(req.body);
        product.save(req.params.id).then(product =>{
            res.json({'product':'product updated'})
        }).catch(err => {
         res.status(400).send('updating  product failed');
    }).catch(err=> res.status(404).send('product not found'));
         
});
});

router.route('/:id').delete((req,res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then(()=> res.json("product deleted"))
    .catch(err => res.status(400).json('Error: '+err));
}); 

module.exports=router;
