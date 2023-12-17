const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const credentials = require('./middleware/credentials.js');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error.js");

const app = express();
app.use(morgan('tiny'));

// Cors access 
app.use(credentials);
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Accepting Cookies from client
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// error middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;

dotenv.config();
// connect mongodb from here
const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database successfully on " + process.env.MONGO_URI);
        })
        .catch((err) => {
            throw err;
        });
};

//routes 
const Route = require('./routes/router.js');
app.use('/api/', Route);

app.listen(port, () => {
    //connecting to Db and port
    connect();
    console.log("Connected to Server Successfully on port " + port);
});