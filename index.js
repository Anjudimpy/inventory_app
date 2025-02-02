import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import validationRequest from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';

const server = express();

//parse from data
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(cookieParser());


server.use(
    session({
      secret:'SecretKey',
      resave:false,
      saveUninitialized: true,
      cookie:{secure: false},
    })
)

// setup view engine setting
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));

server.use(express.static('src/views'));
server.use(ejsLayouts);

//Create an instance of ProductController
const productController =  new ProductController();
const userController = new UserController();
server.get('/', auth,setLastVisit, productController.getProducts);
server.get('/new', auth, productController.getNewForm);
server.post('/', auth, uploadFile.single('imageUrl'), validationRequest, productController.addNewProduct);
server.get('/update-product/:id',auth, productController.getUpdateProduct);
server.post('/update-product', auth, productController.postUpdateProduct);
server.post('/delete-product/:id', auth, productController.deleteProduct);
server.post('/search',auth, productController.search );
server.get('/register', userController.getRegister);
server.post('/register', userController.postRegister)
server.get('/login', userController.getLogin);
server.post('/login', userController.postLogin);
server.get('/logout', userController.logout);


server.listen(3400);