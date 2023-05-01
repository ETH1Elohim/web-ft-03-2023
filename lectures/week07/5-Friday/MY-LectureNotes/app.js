// build a server
// req
const http = require('http');

// const cowsay = require('cowsay');

const superheroes = require('superheroes');

let students = [
    {
        fName: "Victoria",
        city: "Atlanta"
    },
    {
        fName: "Andrew",
        city: "Atlanta"
    },
    {
        fName: "Stephen",
        city: "Houston"
    },
    {
        fName: "James",
        city: "Austin"
    },
    {
        fName: "Matt",
        city: "Seattle"
    },

]

// set up server | lots of logic in createServer()
// anfn
const server = http.createServer((request, response)=>{
    response.setHeader('Content-Type', "text/html") // letting client know we're sending back html
    
    switch(request.url){ // how is user trying to locate me /about /faq /api

        case '/':   // localhost:3000/
        
            response.end(`<h1>Hello World</h1>`)
            break;

        case '/aboutus':

            response.end(`<h1>About Us</h1>`)
            break;

        case '/api':

            response.setHeader('Content-Type', 'application/json') // sending back json data

            let studentsJSON = JSON.stringify(students)

            response.end(studentsJSON)
            break;

        default:
            break;

    }
})


console.log(superheroes.all);
console.log(superheroes.random());

// console.log(cowsay.say({
//     text: "I'm a mooooooodule and I'm learning node",
//     e: "oO",
//     T: "U"
// }));

// turn on server

server.listen(3000, ()=>{
    console.log(`Server is running on port 3000`); //localhost:3000
})