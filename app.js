const cookieParser =require('cookie-parser');
const logger =require('morgan');
const cors = require('cors');

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:3000' , 'http://127.0.0.1:3000']})
);

app.get("/", cors() ,function (req ,res) {
    res.json({msg: 'whoah with cors it works '})
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, function (){
    console.log("server is running on localhost " + PORT);
});