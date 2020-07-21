const express = require('express');
const app = express();
const PORT = 80;
const path = require('path');
const createDAO = require('./Models/dao');
const PinsModel = require('./Models/PinsModel');
const dbFilePath = process.env.DB_FILE_PATH || path.join(__dirname, 'Database', 'Pins.db');
let Pins = undefined;
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect("/login");
});

app.get('/writeMessage', (req, res) => {
    res.send("Hopefully I'm doing some backend work!")
});

// app.get('/login', (req, res) => {
//     console.log(`You are at login page.`)
//     res.send("Login")
// });

// app.get('/register', (req, res) => {
//     console.log(`You are at register page.`)
//     res.send("Register")
// });

app.get('/setPins', (req, res) => {
    Pins.getDBLocations()
        .then( (rows) => {
            var data = [];
            rows.forEach(element => {
                data.push(element)
            });
            console.log(data);
            res.json(data);
        })
        .catch( err => {
            console.error(err);
            res.sendStatus(500);
        })
});

//                          v----- Mark this function async so you can use await
app.post("/writeMessage", async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        await Pins.add(data.x, data.y, data.title, data.message, data.name); // wait for add() to complete
        res.sendStatus(200);                        // send back success status
    } catch (err) {                                 // if there's an error the catch it
        console.error(err);
        res.sendStatus(500);                        // and send status 500
    }
});

app.listen(80, async () => {
    // wait until the db is initialized and all models are initialized
    await initDB();
    // Then log that the we're listening on port 80
    console.log("Listening on server.");
});

async function initDB () {
    const dao = await createDAO(dbFilePath);
    Pins = new PinsModel(dao);
    await Pins.createTable();
}
