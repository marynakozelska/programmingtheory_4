// modules =================================================
const express = require('express');
const mongoose = require('mongoose');
const app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// set up BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// set our port
const port = 3000;
app.use(express.static(__dirname + '/public'));

// config files
let db = require('./config/db');
mongoose.connect(db.url).then(() => {
    console.log("Connected.");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// defining route
app.get('/route', function (req, res) {
    res.send('This is routing for the application developed using Node and Express...');
});

let Student = require('./app/models/students');
app.get('/api/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) res.send(err);
        res.json(students); // return all students in JSON format
    });
});

app.post('/api/students/add', function (req, res) {
    let student = new Student(); // create a new instance of the student model
    student.name = req.body.name; // set the student name (comes from the request)
    student.lastname = req.body.lastname;
    student.birthday = req.body.birthday;
    student.group = req.body.group;

    student.save(function (err) {
        if (err) res.send(err);
        res.json({message: 'student created!'});
    });
});

app.get('/api/students', function (req, res) {
    // use mongoose to get all students in the database
    Student.find(function (err, students) {
        if (err) res.send(err);
        res.json(students); // return all students in JSON format
    });
});

app.delete('/api/students/:id', function (req, res) {
    Student.remove({
        _id: req.params.id
    }, function (err, bear) {
        if (err) res.send(err);
        res.json({message: 'Successfully deleted'});
    });
});

// Groups

let Group = require('./app/models/groups');
// define our students model
app.get('/api/groups', function (req, res) {
    Group.find(function (err, groups) {
        if (err) res.send(err);
        res.json(groups);
    });
});

app.post('/api/groups/add', function (req, res) {
    let group = new Group(); // create a new instance of the student model
    group.name = req.body.name;

    group.save(function (err) {
        if (err) res.send(err);
        res.json({ message: 'group created!' });
    });
});

app.get('/api/groups', function (req, res) {
    // use mongoose to get all students in the database
    Group.find(function (err, groups) {
        if (err) res.send(err);
        res.json(groups);
    });
});

app.delete('/api/groups/:id', function (req, res) {
    Group.remove({
        _id: req.params.id
    }, function (err, bear) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted group' });
    });
});

app.listen(port, () => console.log('Example app listening'));