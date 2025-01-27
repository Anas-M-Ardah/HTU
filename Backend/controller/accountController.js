const {signIn, createAccount} = require('../service/accountServices');
const joi = require('joi');
const { generateToken } = require('../middleware/jwt');

const signInSchema = joi.object({
    identifier: joi.string().required(),
    password: joi.string().required()
});

const signInHandler = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        await signInSchema.validateAsync({ identifier, password });
        const account = await signIn(identifier, password);
        const token = generateToken({ id: account.id });
        res.status(200).json({ sucess: true, token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const createAccountHandler = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const account = await createAccount({ username, email, password });
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { signInHandler, createAccountHandler };