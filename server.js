/*
    This Project belongs to remadisson (https://remadyreturns.de/), so it's not for commercial or public use.
    If you use code snippets you should ALWAYS credit me.
*/

// Port - Change the port if you want
const port = 8329;

// Constances for the main functions of the modular-backend
const express = require('express');
const app = express();

// Allowing Requests
const cors = require('cors');

//Imports Commandline features
const commandline = require('./modules/commandline/climain');

// Express using cors and their own json formats
app.use(cors());
app.use(express.json());

// For aesthetic purposes
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

// Handle get requests
    app.get('/', (req, res) => {
        let url = req.originalUrl;
        res.send({
            message: "Bad request, unused route: " + url,
            status: 400
        })
    })

// Handle push requests


// Listening to port
let listener = app.listen(port, () => {
    clear();
    console.log(chalk.redBright(figlet.textSync("Backend", {horizontalLayout: 'full'})));
    console.log(chalk.red("Made by remadisson"));
    console.log(" ");
    console.log("-> Listening on port " + listener.address().port);

    commandline.init();
});

module.exports = {getPort: port};