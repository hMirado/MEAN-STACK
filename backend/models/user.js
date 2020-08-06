const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 *  Check length validation with RegEXp
 */
let emailLengthChecker = (email) => {
    if (!email) return false;
    else {
        if (email.length < 10 || email.length > 50) return false;
        else return true;
    }
};

let usernameLengthChecker = (username) => {
    if (!username) return false;
    else {
        if (username.length < 3 || username.length > 20) return false;
        else return true;
    }
};

let passwordLengthChecker = (password) => {
    if (!password) return false;
    else {
        if (password.length < 8) return false;
        else return true;
    }
};


/**
 *  Check validation with RegEXp
 */
let emailChecker = (email) => {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
};

let usernameChecker = (username) => {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
};

let passwordChecker = (password) => {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password);
};


/**
 * Validation message
 */
const emailValidators = [
    {
        validator: emailLengthChecker,
        message: 'E-mail must be at least 10 characters but no more than 50.'
    },
    {
        validator: emailChecker,
        message: 'E-mail not valid'
    }
];

const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: 'Username must be at least 3 characters but no more than 20.'
    },
    {
        validator: usernameChecker,
        message: 'Username must not have any special characters.'
    }
];

const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 8 characters.'
    },
    {
        validator: passwordChecker,
        message: 'Password must have least one uppercase, lowercase, special character and number.'
    }
];


/**
 * Schema
 */
const userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
    username: {type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
    password: {type: String, required: true, validate: passwordValidators}
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, saltRounds, (error, hash) => {
        if (error) return next;
        this.password = hash;
        next();
    })
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);