const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/routes.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/RepairShopFinderApp', {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const corsOptions = {
    exposedHeaders: ['x-auth']
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.use('/api/v1', router);

app.listen(3000);
