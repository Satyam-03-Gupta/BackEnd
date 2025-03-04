const express = require('express');
const morgan = require('morgan');
const app = express()
const dbConnection = require('./config/db')
const userModel = require('./models/user')
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Middleware to check if user is logged in
const checkAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        let user = await userModel.findOne({ email: decoded.email });
        req.user = user || null; // Attach user data or set to null
    } catch (err) {
        req.user = null;
    }
    next();
};

// Home Route - Render with user info if logged in
app.get('/', checkAuth, (req, res) => {
    res.render('index', { user: req.user });
});

app.get('/createuser', (req, res) => {
    res.render('createuser');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Signup Route
app.post('/create', async (req, res) => {
    try {
        let { username, email, password, age, profileImage } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        let createdUser = await userModel.create({
            username,
            email,
            password: hash,
            age,
            profileImage // Store profile image URL in DB
        });

        let token = jwt.sign({ email, username }, JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error creating user");
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("User not found");

        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            let token = jwt.sign({ email: user.email, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
            res.cookie("token", token, { httpOnly: true });
            res.redirect('/');
        } else {
            res.status(400).send("Incorrect email or password");
        }
    } catch (err) {
        res.status(500).send("Error logging in");
    }
});

// Logout Route
app.post("/logout", (req, res) => {
    res.clearCookie("token", { path: '/' });
    res.redirect("/");
});




app.use('/public', express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs')
app.use(morgan('dev'))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

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

// ----------------------------subtraining---------------------------

app.get('/GymTraining/build', (req, res) => {
    res.render('GymTraining/build')
})

app.get("/GymTraining/chest", (req, res) => {
    res.render('GymTraining/chest')
});
app.get('/GymTraining/back', (req, res) => {
    res.render('GymTraining/back')
})

app.get("/GymTraining/shoulder", (req, res) => {
    res.render('GymTraining/shoulder')
});

app.get("/GymTraining/biceps", (req, res) => {
    res.render('GymTraining/biceps')
});
app.get('/GymTraining/triceps', (req, res) => {
    res.render('GymTraining/triceps')
})

app.get("/GymTraining/legs", (req, res) => {
    res.render('GymTraining/legs')
});

// -----------------------------subtraining---------------------------
app.get('/LadiesGym/ladiesgym', (req, res) => {
    res.render('LadiesGym/ladiesgym')
})

app.get("/LadiesGym/chest", (req, res) => {
    res.render('LadiesGym/chest')
});
app.get('/LadiesGym/back', (req, res) => {
    res.render('GymTraiWeightLifting')
})

app.get("/LadiesGym/shoulder", (req, res) => {
    res.render('LadiesGym/shoulder')
});

app.get("/LadiesGym/biceps", (req, res) => {
    res.render('LadiesGym/biceps')
});
app.get('/LadiesGym/triceps', (req, res) => {
    res.render('LadiesGym/triceps')
})

app.get("/LadiesGym/leg", (req, res) => {
    res.render('LadiesGym/leg')
});

// -----------------------------subtraining---------------------------

app.get('/WeightLifting/weightlifting', (req, res) => {
    res.render('WeightLifting/weightlifting')
})
app.get("/WeightLifting/chest", (req, res) => {
    res.render('WeightLifting/chest')
});
app.get('/WeightLifting/back', (req, res) => {
    res.render('WeightLifting/back')
})

app.get("/WeightLifting/shoulder", (req, res) => {
    res.render('WeightLifting/shoulder')
});

app.get("/WeightLifting/biceps", (req, res) => {
    res.render('WeightLifting/biceps')
});
app.get('/WeightLifting/triceps', (req, res) => {
    res.render('WeightLifting/triceps')
})

app.get("/WeightLifting/leg", (req, res) => {
    res.render('WeightLifting/leg')
});

// -----------------------------subtraining---------------------------

app.get('/Professional/professional', (req, res) => {
    res.render('Professional/professional')
})
app.get("/Professional/chest", (req, res) => {
    res.render('Professional/chest')
});
app.get('/Professional/back', (req, res) => {
    res.render('Professional/back')
})

app.get("/Professional/shoulder", (req, res) => {
    res.render('Professional/shoulder')
});

app.get("/Professional/biceps", (req, res) => {
    res.render('Professional/biceps')
});
app.get('/Professional/triceps', (req, res) => {
    res.render('Professional/triceps')
})

app.get("/Professional/leg", (req, res) => {
    res.render('Professional/leg')
});

// -----------------------------subtraining---------------------------

app.get('/Workout/workout', (req, res) => {
    res.render('Workout/workout')
})

app.get("/Workout/chest", (req, res) => {
    res.render('Workout/chest')
});
app.get('/Workout/back', (req, res) => {
    res.render('Workout/back')
})

app.get("/Workout/shoulder", (req, res) => {
    res.render('Workout/shoulder')
});

app.get("/Workout/biceps", (req, res) => {
    res.render('Workout/biceps')
});
app.get('/Workout/triceps', (req, res) => {
    res.render('Workout/triceps')
})

app.get("/Workout/leg", (req, res) => {
    res.render('Workout/leg')
});

// -----------------------------subtraining---------------------------

app.get('/SpecificWorkout/specific', (req, res) => {
    res.render('SpecificWorkout/specific')
})

app.get("/SpecificWorkout/chest", (req, res) => {
    res.render('SpecificWorkout/chest')
});
app.get('/SpecificWorkout/back', (req, res) => {
    res.render('SpecificWorkout/back')
})

app.get("/SpecificWorkout/shoulder", (req, res) => {
    res.render('SpecificWorkout/shoulder')
});

app.get("/SpecificWorkout/biceps", (req, res) => {
    res.render('SpecificWorkout/biceps')
});
app.get('/SpecificWorkout/triceps', (req, res) => {
    res.render('SpecificWorkout/triceps')
})

app.get("/SpecificWorkout/leg", (req, res) => {
    res.render('SpecificWorkout/leg')
});

// -----------------------------subtraining---------------------------





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

app.listen(1432,()=>{
    console.log('Welcome Satyam let go!!!')
});














