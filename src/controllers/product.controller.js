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

    getUpdateProduct(req,res, next){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(productFound){
            return res.render('update-product',{product:productFound, errorMessage:null})
        }
        else{
            res.status(401).send("product not found")
        }

    }

    postUpdateProduct(req,res){
        ProductModel.update(req.body);
        var products= ProductModel.get();
        res.render('products',{products});
    }
}