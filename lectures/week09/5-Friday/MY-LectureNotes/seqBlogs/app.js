const express = require('express');
let app = express();
let PORT = 3005;

app.use(express.static('public'))

app.set('view engine', 'ejs')

//body parser 
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

//routes
app.use(require('./routes/index'))
app.use(require('./routes/admin'))
app.use(require('./routes/details'))
app.use(require('./routes/comments'))


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})