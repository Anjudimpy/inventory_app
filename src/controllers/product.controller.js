import path from 'path'
import ProductModel from '../models/product.model.js';

export default class ProductController {
    getProducts(req, res){
        let products = ProductModel.get();
        console.log(products);
        return res.render('products',{products:products, userEmail: req.session.userEmail})
       //res.sendFile(path.join(path.resolve(),'src','views','products.html'));
    }

    getNewForm(req, res){
       return res.render('new-product', {errorMessage:null, userEmail: req.session.userEmail});
    }

    addNewProduct(req,res, next){
        const {name, desc, price} = req.body;
        const imageUrl = "images/"+req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
        let products = ProductModel.get();
        return res.render('products',{products:products, userEmail: req.session.userEmail});
    }

    getUpdateProduct(req,res, next){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(productFound){
            return res.render('update-product',{product:productFound, errorMessage:null, userEmail: req.session.userEmail})
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

    deleteProduct(req,res){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            res.status(401).send("product not found")
        }
        ProductModel.delete(id);
        var products = ProductModel.get();
        res.render('products',{products});
    }

    search(req,res){
        const searchItem = req.body.name;
        const products =ProductModel.searchResult(searchItem);
        res.render('searchResult',{products});
    }
}