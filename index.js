import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import validationRequest from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';

const server = express();

//parse from data
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

// setup view engine setting
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));

server.use(ejsLayouts);

//Create an instance of ProductController
const productController =  new ProductController();
server.get('/', productController.getProducts);
server.get('/new', productController.getNewForm);
server.post('/', uploadFile.single('imageUrl'), validationRequest, productController.addNewProduct);
server.get('/update-product/:id', productController.getUpdateProduct);
server.post('/update-product', productController.postUpdateProduct);
server.post('/delete-product/:id', productController.deleteProduct);
server.post('/search', productController.search )
server.use(express.static('src/views'));

server.listen(3400);