const dotenv = require('dotenv').config();
const exp = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sendEmail = require('./utils/sendEmail')
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')
const bcryptjs = require('bcryptjs')


const app = exp();

const path = require('path')

app.use(exp.static(path.join(__dirname, './build')))
app.use(exp.json());
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})


app.get('/', (req, res) => {
    res.send('Home Page')
})



app.post('/sendemail', async(req, res) => {
    const email = req.body.email;
    const subject_ = req.body.subject;
    const otp = Math.floor(
        Math.random() * (999999 - 100000 + 1) + 100000
    )
    
    const message_ = `
    Your OTP is ${otp}.
    Do not Share this with Anybody.
    This will be active for 5 minutes from now.
    Thank You.
    `

    console.log(message_)

    try{
        const send_to = email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = email;
        const subject = subject_;
        const message = message_;

        let token = jwt.sign({otp: otp}, process.env.SECRET_KEY, {expiresIn: '5m'});

        let hashedOtp = await bcryptjs.hash(otp.toString(), 10);

        await sendEmail(subject, message, send_to, sent_from, reply_to);
        
        res.status(200).json({success:true, message:'Email Sent', token: token, otp: hashedOtp})
    }catch(err){
        res.status(500).json(new Error('Incorrect Email'))
    }
})



app.post('/verifyotp', verifyToken, async(req, res) => {

    const otp = req.body.otp
    const hashedOtp = req.body.hashedOtp

    let isEqual = await bcryptjs.compare(otp.toString(), hashedOtp) 
    if(isEqual === false){
        res.send({message: '* OTP is Incorrect'})
    }else{
        res.send({success: true, message: 'Verification Success..'})
    }
})

app.post('/pathjump', verifyToken, async(req, res) => {
    res.send({success: true});
})
const pageRefresh = (req, res, next) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
}
app.use('*', pageRefresh)

const invalidPathMiddleware=(request,response,next)=>{
    response.send({message:'Invalid path'});
}
app.use(invalidPathMiddleware)

const errhandlingMiddleware=(error,request,response,next)=>{
    response.send({message:error.message});
}
app.use(errhandlingMiddleware);