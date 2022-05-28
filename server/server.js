const express = require("express");
const app = express();
const cors = require("cors");
// const path = require('path');

const port = process.env.port || 5000;

// middleware
app.use(cors());
app.use(express.json());

// app.use(express.static('./public'));
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

// routes
app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(port, function(){
    console.log(`Server is running on port: ${port}`);
  });