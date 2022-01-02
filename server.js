const express = require ("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const dotenv =require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 3000;

const app =express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
   // MONGODB_URI || 'mongodb://localhost/workout',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

mongoose.connection.on('connected',() => {
    console.log('Mongoose is connected!!!');
});

app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));


app.listen(PORT,() =>{
    console.log(`App running on port ${PORT}!`);
});