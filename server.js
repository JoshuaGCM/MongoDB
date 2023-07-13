// depnedencies 
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./users");


const app = express();
const port = process.env.PORT;

// setting up middleware
app.use(cors({origin: true,credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB_URI)
.then(()=> {console.log('Connected to Mongo DB')}, err => {console.log(`Cannot connect to DB ${err}`)})

// routes
app.get('/', (req, res) => res.status(200).send('Server is Running'));

app.post('/add-user', (req, res) => {
    const incomingData = req.body;

    try {
        const newUser = new UserModel(incomingData);
        newUser.save();

        res.status(200).send({
            message: 'saved user'
        })
    } catch (err) {
        console.log(err);
    }
});

app.get("/get-all-users", async (req, res) => {

    try { 
        const users = await UserModel.find();

        res.status(200).send(
             users
        )
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete-user/:id", async (req, res) => {
    const id = req.params.id 

    try { 

        const deletedUser = await UserModel.findByIdAndDelete({_id:id});
        res.status(200).send(
            {message: "User deleted", user: deletedUser}
       )
    } catch (err) {
        console.log(err);
    }

});
    
app.listen(port, () => {
    console.log(`Server is running https://localhost:${port}`);
});