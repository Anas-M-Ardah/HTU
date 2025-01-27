const {signInHandler, createAccountHandler} = require('../controller/accountController');
const express = require('express');
const accountRouter = express.Router();

accountRouter.post('/signin', signInHandler);
accountRouter.post('/create-account', createAccountHandler);

module.exports = accountRouter;