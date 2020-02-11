require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const AC = require('./controllers/authController');
const AUTH = require('./middlewares/auth');
const DC = require('./controllers/drinksController');

const {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // has our cookie expire in a week
    }
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log('Server hit!');
    next();
});

// auth endpoints
app.post('/auth/login', AC.login);
app.post('/auth/logout', AC.logout);

// drinks endpoints
app.get('/api/drinks', DC.getAll);

app.use(AUTH.verifyUser); // verifies that user is logged in
app.post('/api/drinks', DC.addOne);
app.delete('/api/drinks/:drinkId', AUTH.verifyAdmin, DC.deleteOne);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))