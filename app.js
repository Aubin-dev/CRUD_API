const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require('./router/user.js')
const authRoute = require('./router/auth.js')

app.use(bodyParser.json());
app.use('/api', userRoute);
app.use('/auth', authRoute);

module.exports = app;