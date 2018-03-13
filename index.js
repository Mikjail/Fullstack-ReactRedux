const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const config = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(config.MONGODB_URI, function (err, res) {
    if (err) {
    console.log ('ERROR connecting to: ' + config.MONGODB_URI + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + config.MONGODB_URI);
    }
  });

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [config.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

console.log(PORT);


app.listen(PORT);