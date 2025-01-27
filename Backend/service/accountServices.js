const Account = require('../model/account');
const { sequelize } = require('../config/db');

const AccountModel = Account(sequelize);

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const signIn = async (identifier, password) => {
    try {
        // Find account by either username or email
        const account = await AccountModel.findOne({
            where: {
                [Op.or]: [
                    { username: identifier },
                    { email: identifier }
                ]
            }
        });

        // If no account found
        if (!account) {
            throw new Error('Account not found');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, account.password);
        
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        // Update last login
        await account.update({
            lastLogin: new Date(),
            loginAttempts: 0 // Reset login attempts on successful login
        });
        // console.log('Account signed in successfully', account);
        return account;

    } catch (error) {
        console.error('Error occurred while signing in:', error);
        throw error;
    }
};

const createAccount = async (accountData) => {
    try {
        const account = await AccountModel.create(accountData);
        return account;
    } catch (error) {
        console.error('Error occurred while creating account:', error);
        throw error;
    }
};

module.exports = { signIn, createAccount };