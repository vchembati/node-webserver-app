
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
})
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

app.get('/', (request, response) => {
    response.render('home.hbs', {
        firstName: 'Smith',
        lastName: 'Taylor',
        fullName: 'Smith Taylor',
        id: 12345,
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorCode: 200,
        errorMessage: 'bad request'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page'
    })
})

app.listen(port, () => {
    console.log(`app is up and running at port ${port}.`);
}
);
