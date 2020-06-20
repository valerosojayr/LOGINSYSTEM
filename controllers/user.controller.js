const mongoose = require('mongoose');
const User = require("../models/user.model");
const _ = require('lodash');
const passport = require('passport');

    module.exports.register = (req, res, next) => {

        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save((err, doc) => {
            if (!err) { res.send(doc) }
            else if (err.code == 11000) {
                res.status(422).send(['Duplicate email address found.'])
            }
            else { return next(err) }
        });

    };



module.exports.login = (req, res, next) => {

    var user = req.body
    User.findOne({ email: user.email }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } else
                if (result.password !== user.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    res.status(200).send(result)
                }
        }
    })
 
};


module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['name', 'email']) });
        }
    );
}





module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}




