//import {sendEmail} from "../mailer";

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { check, validationResult} = require('express-validator');
const SMSchema = require('../schemas/User');
const config = require('config');
const auth = require('../middleware/auth');
var nodemailer = require('nodemailer');

router.get (
    '/',
    auth,
    async (req,res) => {
        try{
            const store_manager =  await SMSchema.findById(req.store_manager.id).select('-password');
            await res.json(store_manager);
        }catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server Error..."});
        }
    }
)
router.post(
    '/sm_register',
    [
        check('firstName', 'First Name is required').not().isEmpty(),
        check('lastName', 'Last Name is required').not().isEmpty(),
        check('position', 'position is required').not().isEmpty(),
        check('email', 'Type proper Email').isEmail(),
        check('password', 'Password is required').not().isEmpty()
    ],
    async (req,res) => {
        try {
            let {firstName, lastName, position, email, password} = req.body;
            // const position = "sm";
            let store_manager = await SMSchema.findOne({email});

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(401).json({errors: errors.array()});
            }

            if (store_manager) {
                return res.status(401).json({alert: "There is a already user who uses this email"})//msg tibbe alert kala
            }

            const salt = await bcryptjs.genSalt(10);
            password = await bcryptjs.hash(password,salt);

            store_manager = new SMSchema({
                firstName,
                lastName,
                position,
                email,
                password
            });

            await  store_manager.save();

            const payload = {
                store_manager: {
                    id: store_manager.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err,token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            )

            var transporter = nodemailer.createTransport({

                service: 'Gmail',
                auth: {
                    user: 'applicationframework564@gmail.com',
                    pass: 'Vernon123'
                }
            });

            var mailOptions = {

                from: 'applicationframework564@gmail.com',
                to: email,
                subject: 'Store Manager',
                text: 'Admin Sent this Message to Store Managers when Registration'
            };



            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

           //sendEmail(to,name);

        }catch (e) {
            console.log(e.message);
            return res.status(500).json({msg:"server Error..."});
        }
    }
);


router.post(
    '/sm_login',
    [
        check('email', 'Type Proper Email').isEmail(),
        check('password','Password is required').not().isEmpty()
    ],
    async (req,res) => {
        try{
            const {email,password} = req.body;
            const errors = validationResult(req);
            let store_manager = await SMSchema.findOne({email});

            if(!errors.isEmpty()){
                return res.status(401).json({ errors: errors.array()});
            }
            if(!store_manager){
                return res.status(401).json({msg: "There is no user with this email"});
            }

            let isPasswordMatch = await bcryptjs.compare(password,store_manager.password);

            if(isPasswordMatch){

                const payload = {
                    store_manager: {
                        id: store_manager.id
                    }
                };

                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    (err,token) => {
                        if(err) throw err;
                        res.json({ token });
                    }
                )

            } else return res.status(401).json({msg:"Password is not Matching "})

        }catch (e) {
            console.log(e.message);
            return res.status(500).json({alert:"server Error..."});
        }
    }
);
module.exports = router;