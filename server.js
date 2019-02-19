
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var time = new Date().toString();
    fs.appendFile('server.log', `${time} ${req.method} ${req.url} \n`, (error) => {
        console.log(error);
    })

   next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
 
// })

app.use(express.static(__dirname + '/public'));

app.get('/home', (request, response) => {
    response.render('home.hbs', {
        firstName: 'Smith',
        lastName: 'Taylor',
        fullName: 'Smith Taylor',
        id: 12345,
        year: new Date().getFullYear(),
        pageTitle: 'Home Page',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        year: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorCode: 200,
        errorMessage: 'bad request'
    });
});

app.listen(port, () => {
    console.log(`app is up and running at port ${port}.`);
}
);
