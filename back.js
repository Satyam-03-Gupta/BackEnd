const express = require('express');
const morgan = require('morgan');
const app = express()
const dbConnection = require('./config/db')
const userModel = require('./models/user')
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs')
app.use(morgan('dev'))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about.ejs', (req, res) => {
    res.render('about')
})
app.get('/contact.ejs', (req, res) => {
    res.render('contact')
})
app.get('/privacy.ejs', (req, res) => {
    res.render('privacy')
})

app.get('/build.ejs', (req, res) => {
    res.render('build')
})
app.get('/weightlifting.ejs', (req, res) => {
    res.render('weightlifting')
})
app.get('/ladiesgym.ejs', (req, res) => {
    res.render('ladiesgym')
})
app.get('/professional.ejs', (req, res) => {
    res.render('professional')
})
app.get('/workout.ejs', (req, res) => {
    res.render('workout')
})
app.get('/specfic.ejs', (req, res) => {
    res.render('specfic')
})



app.post('/', async (req, res) => {
    const { username, email, phone, message } = req.body

    const newuser = await userModel.create({
        username: username,
        email: email,
        phone: phone,
        message: message

    })
    res.render('thankyou')
})

app.get('/get-users', (req, res) => {
    userModel.find({
        username: 'a'

    })
        .then((user) => {
            console.log(user)
            res.send(user)
        })
})

app.get('/update-user', async (req, res) => {
    await userModel.findOneAndUpdate({
        username: 'admin'
    }, {
        email: 'a@gmail.com'
    })
    res.send("user updated")
})


app.get('/delete-user', async (req, res) => {
    await userModel.findOneAndDelete({
        username: 'admin'
    })
    res.send('user deleted')
})
app.post('/get-form-data', (req, res) => {
    console.log(req.body)
    res.send('data received')
})

app.listen(1432)



















