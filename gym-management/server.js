const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/gym', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => console.log('Database connected'))

    .catch(err => console.log('Error connecting to database'));

app.listen(1432, () => {
    console.log('Server is running on port 1432');
});