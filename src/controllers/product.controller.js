import path from 'path'
import ProductModel from '../models/product.model.js';

export default class ProductController {
    getProducts(req, res){
        let products = ProductModel.get();
        console.log(products);
        return res.render('products',{products:products})
       //res.sendFile(path.join(path.resolve(),'src','views','products.html'));
    }

    getNewForm(req, res){
       return res.render('new-product', {errorMessage:null});
    }

    addNewProduct(req,res, next){
        
        ProductModel.add(req.body);
        let products = ProductModel.get();
        return res.render('products',{products:products});
    }
}