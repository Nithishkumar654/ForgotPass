const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const verifyToken = (req, res, next) => {
   
    const bearerToken = req.body.token;
    if(bearerToken == null){
        res.send({message: 'Unauthorized Access..!! Please Enter the Mail to get OTP.. '})
    }else{
        
        try{
            jwt.verify(bearerToken, process.env.SECRET_KEY)
            
            next()
        }catch(err){
            next(new Error('OTP Expired..!!'))
        }
    }
}



module.exports = verifyToken;