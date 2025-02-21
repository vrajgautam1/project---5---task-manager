const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://gautamvraj1999:12345@cluster0.e56wc.mongodb.net/taskmanager");

const db = mongoose.connection

db.on("error", (err)=>{
    console.log(err.message);
})

db.once("open", ()=>{
    console.log("database connected successfully");
})

module.exports = db; 