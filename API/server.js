const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname + '/../Views/HTML/signin.html'));
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use('/CSS',express.static(path.resolve(__dirname + '/../Views/CSS')));
app.use('/JavaScript',express.static(path.resolve(__dirname + '/../Views/JavaScript')));
app.use('/Assets',express.static(path.resolve(__dirname + '/../Assets')));

require("./routes/routes")(app);
app.listen({port}, ()=>{
    console.log(`Server is running on port ${port}`);
})