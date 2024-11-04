// // const catme = require('cat-me')
// // console.log(catme());
// const http = require('http')



// const server = http.createServer((req, res) => {
//     if (req.url == "/about") {
//         res.end("The about page")
//     }
//     if (req.url == "/profile") {
//         res.end("The profile page")
//     }
//     if (req.url == "/") {
//         res.end("The homepage page")
//     }

// })
// server.listen(3000)



// const express = require('express');
// const app = express();

// app.set('view engine', 'ejs')

// app.get('/', (req, res) => {
//     res.send('hello world')

// })
// app.get('/about', (req, res) => {
//     res.send('About page ')
// })
// app.get('/profile', (req, res) => {
//     res.send('the profile page')
// })

// app.listen(3000)





const express = require('express');
const morgan = require('morgan');
const app = express()
const dbConnection = require('./config/db')
const userModel = require('./models/user')

app.set("view engine", 'ejs')
app.use(morgan('dev'))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.send('the about page now loading ')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    const newuser = await userModel.create({
        username: username,
        email: email,
        password: password

    })
    res.send('user register')
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

app.listen(3000)



















