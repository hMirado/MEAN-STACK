const express = require('express');
const User = require('../models/user');
var router = express.Router();


/**
 * Enregistrement d'utilisateur
 */
router.post('/register', (req, res) => {
    if (!req.body.email) {
        res.json({success: false, message: 'You must provide an e-mail'});
    } else {
        if (!req.body.username) {
            res.json({success: false, message: 'You must provide a username'});
        } else {
            if (!req.body.password) {
                res.json({success: false, message: 'You must provide a password'});
            } else {
                let user = new User({
                    email: req.body.email.toLowerCase(),
                    username: req.body.username.toLowerCase(),
                    password: req.body.password
                });

                user.save((error) => {
                    if (error) {
                        if (error.code === 11000) {
                            res.json({success: false, message: 'User name or email already exists'});
                        } else {
                            if (error.errors) {
                                if (error.errors.email) {
                                    res.json({success: false, message: error.errors.email.message});
                                } else {
                                    if (error.errors.username) {
                                        res.json({success: false, message: error.errors.username.message});
                                    } else {
                                        if (error.errors.password) {
                                            res.json({success: false, message: error.errors.password.message});
                                        } else {
                                            res.json({success: false, message: error})
                                        }
                                    }
                                }
                            } else {
                                res.json({success: false, message: 'Could not save user. Error : ' + error});
                            }
                        }
                    } else res.json({success: true, message: 'Account registered'});
                });
            }
        }
    }
});

/*
router.get('/checkEmail/: email', (req,res) => {
   if (!req.params.email) res.json({ succes: false, message: 'E-mail was not provided' });
   else {
       User.findOne({email: req.params.email}, (error, user) => {
           if (error) res.json({ success: false, message: error})
           else {
               if (user) res.json({ success: false, message: 'E-mail is already taken'});
               else res.json({ success: false, message: 'E-mail is available'});
           }
       });
   }
});

router.get('/checkUsername/: username', (req,res) => {
   if (!req.params.email) res.json({ succes: false, message: 'Username was not provided' });
   else {
       User.findOne({username: req.params.username}, (error, user) => {
           if (error) res.json({ success: false, message: error})
           else {
               if (user) res.json({ success: false, message: 'Username is already taken'});
               else res.json({ success: false, message: 'Username is available'});
           }
       });
   }
});
*/

module.exports = router;