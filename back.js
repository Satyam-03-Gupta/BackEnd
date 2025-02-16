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

app.get('/GymTraining/build', (req, res) => {
    res.render('GymTraining/build')
})

app.get('/LadiesGym/ladiesgym', (req, res) => {
    res.render('LadiesGym/ladiesgym')
})

app.get('/WeightLifting/weightlifting', (req, res) => {
    res.render('WeightLifting/weightlifting')
})

app.get('/Professional/professional', (req, res) => {
    res.render('Professional/professional')
})

app.get('/Workout/workout', (req, res) => {
    res.render('Workout/workout')
})

app.get('/SpecficWorkout/specfic', (req, res) => {
    res.render('SpecficWorkout/specfic')
})


app.get("/GymTraining/chest", (req, res) => {
    res.render('GymTraining/chest')
});



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

// app.get('/get-users', (req, res) => {
//     userModel.find({
//         username: 'a'

//     })
//         .then((user) => {
//             console.log(user)
//             res.send(user)
//         })
// })

// app.get('/update-user', async (req, res) => {
//     await userModel.findOneAndUpdate({
//         username: 'admin'
//     }, {
//         email: 'a@gmail.com'
//     })
//     res.send("user updated")
// })


// app.get('/delete-user', async (req, res) => {
//     await userModel.findOneAndDelete({
//         username: 'admin'
//     })
//     res.send('user deleted')
// })
// app.post('/get-form-data', (req, res) => {
//     console.log(req.body)
//     res.send('data received')
// })

app.listen(1432)



















