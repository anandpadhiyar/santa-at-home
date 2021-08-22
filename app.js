const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const json2csv = require('json2csv').parse;

// create application/json parser

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    email: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = 80;

app.use('/static', express.static('static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    const params = {};
    res.status(200).render('index.pug', params);
});

app.get("/about", (req, res) => {
    const params = {};
    res.status(200).render('about.pug', params);
});

app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post("/contact", (req, res) => {
    const document = new Contact(req.body);
    console.log(req.body);
    document.save().then(() => {
        res.send('Data saved successfully');
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/download", (req, res) => {
    Contact.find({}).then((contacts) => {
        console.log(contacts);
        const fields = ['id', 'name', 'address', 'contact', 'email', 'desc'];
        const csv = json2csv(contacts, { fields });
        console.log(csv);
        res.type('text/csv');
        res.attachment('contacts.csv').send(csv);
    });
    // const params = {};
    // res.status(200).render('contact.pug', params);
});



app.listen(port, () => {
    console.log(`app started on port ${port}`);
});