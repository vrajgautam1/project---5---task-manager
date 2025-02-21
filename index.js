const express = require("express");
const db = require("./configs/dbconnection");
const bodyParser = require("body-parser");
const Task = require("./models/task"); // Change model per app

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Dummy login credentials
const ADMIN_ID = "admin";
const ADMIN_PASS = "password";

// Routes

//-1 login
app.get("/login", (req, res) => {
    res.render("login", { error: null });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_ID && password === ADMIN_PASS) {
        res.redirect("/create");
    } else {
        res.render("login", { error: "Invalid Credentials" });
    }
});

//-2 create
app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    await Task.create(req.body);
    console.log("user added successfully");
    res.redirect("/");
});

//-3 homepage
app.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.render("homepage", { tasks });
});

//-4 edit
app.get("/edit/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render("edit", { task });
});

app.post("/edit/:id", async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});

//-5 delete
app.post("/delete/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/");
});


//-lets rock!
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
