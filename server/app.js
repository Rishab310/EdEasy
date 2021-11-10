const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const classroomRoutes = require('./routes/classroom');

app.use('/auth', authRoutes);
app.use('/classes', classroomRoutes);

if ( process.env.NODE_ENV === "production" || 1) { 
    app.use(express.static("../client/build")); 
    const path = require("path"); 
    app.get("*", (req, res) => { 
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')); 
    })
}

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
})

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({message: message});
})

mongoose.connect('mongodb+srv://edeasy123:edeasygsits%40123@cluster0.1cmwu.mongodb.net/Edeasy?retryWrites=true&w=majority', 
{ 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
})
.then(result => {
    app.listen(process.env.PORT || 5000);
    console.log("Server started at port 5000");
})
.catch(err => {
    console.log(err);
})

// https://localhost:5000/auth/login -> post
// https://localhost:5000/auth/signup -> put