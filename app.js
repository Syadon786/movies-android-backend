const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const db = require(`${__dirname}/database.js`);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const server = app.listen(process.env.PORT || 12000, () => {  
    console.log(`Server is running on port ${server.address().port}.`); 
});

app.get('/addmovie', (req, res) => {
     res.render('addmovie', {});
});


