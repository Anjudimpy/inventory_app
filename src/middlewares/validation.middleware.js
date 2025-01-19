
import {body, validationResult} from 'express-validator';

const validationRequest =  async (req,res, next) =>{
//1. using Node.js

    // const {name,price, imageUrl} = req.body;
    // let errors = [];
    // if(!name || name.trim() == ''){
    //     errors.push('Name is required');
    // }
    // if(!price || parseFloat(price)<1){
    //     errors.push('Price must be positive');
    // }
    // try{
    //    const validUrl = new URL(imageUrl);
    // }catch(err){
    //     errors.push('Url is Invaild');
    // }

//2. using express.js

      const rules = [
          body('name').notEmpty().withMessage('Name is required'),
          body('price').isFloat({gt:0}).withMessage('Price should be positive number'),
        //body('imageUrl').isURL().withMessage('Invalid url')
          body('imageUrl').custom((value, {req}) =>{
            if(!req.file){
                throw new Error('Image is required');
            }
            return true;
          }),
      ];

      await Promise.all(
         rules.map((rule) => rule.run(req))
      );

      var validationErrors = validationResult(req)  
    if(!validationErrors.isEmpty()){
        return res.render('new-product',{errorMessage:validationErrors.array()[0].msg});
    }
    next();
};
export default validationRequest;