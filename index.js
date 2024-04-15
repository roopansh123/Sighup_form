import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect('mongodb://localhost:27017/employees')
var db = mongoose.connection
db.on('error', () => console.log("error in connecting to database"))
db.once('open', () => console.log("connected to database"))

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phone = req.body.phone;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name ": name,
        "age": age,
        "email": email,
        "phone": phone,
        "gender": gender,
        "password": password
    }

    db.collection('employee').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("record inserted")
    })
    return res.redirect('./signup_successful.html');
});

app.get("/", (req, res) => {
    return res.redirect('./index.html');
});

app.listen(process.env.PORT, () => {
    console.log(`port number ${process.env.PORT}`);
    console.log(process.env.MY_PASSWORD);
});
