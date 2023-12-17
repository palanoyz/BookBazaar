const bcrypt = require("bcrypt")

const saltRounds = 5;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

const matchPassword = async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
};

module.exports = { hashPassword, matchPassword }

// Hash and compare password