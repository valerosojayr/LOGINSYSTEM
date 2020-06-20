const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        required: "Name can/'t be empty.",
        type: String
    },
    email: {
        required: "Email can/'t be empty.",
        unique: true,
        type: String
    },
    password: {
        type: String,
        required: "Password can/'t be empty.",
        minlength: [4, 'Password at least must be 4 Characters long.']
    },

    saltSecret: {
        type: String,
    }

});






//JSON WEB TOKEN
userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXP },
        console.log("jello")
    )
};





//PreEvent will be triggered befoe our data will be saved.
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    })
});



// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');



//Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};




module.exports = mongoose.model("User", userSchema);
