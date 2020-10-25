// Allows the interaction with the command line
const readline = require('readline');
const chalk = require('chalk');
const clear = require('clear');

const rl = readline.createInterface({
    terminal: false,
    input: process.stdin,
    output: process.stdout
})

let send_message = false;

//Import Commands
const userCommand = require('./user_command');

const commands =    [{command: "user", function: userCommand},
                    {command: "clear", function: doClear},
                    {command: "help", function: sendHelp}];

module.exports.init = async() => {
    if(!send_message) console.log(chalk.blueBright("> Use `help` for more information.")), send_message = true;

    await new Promise((resolve, reject) => {
        rl.question(chalk.cyan("> "), async(input) => {
            const raw = input.toString().toLowerCase().replace("  ", " ").trim().split(" ");
            const command = raw[0];
            let args = [];

            for(i = 1; i < raw.length; i++){
                args[i-1] = raw[i];
            }

            if(checkCommand(command)){
                await getCommand(command)['function'](args);
                resolve();
            } else {
                console.log(chalk.red("> This is not a command!"));
                resolve();
            }
            
        });
    }).then(() => this.init());
    
}

// Defines Methods that makes the Usage of the commands array easier

/**
 * Checks if a command does exists.
 * @param {*} command 
 */
function checkCommand(command){
    if(getCommand(command)){
        return true;
    } 
    return false;
}

/**
 * Returns the Commands Functions if the command exists.
 * @param {Command} command 
 */
function getCommand(command){
    for(i=0; i< commands.length; i++){
        if(commands[i]['command'].toLowerCase() == command.toString().toLowerCase().trim()){
            return commands[i];
        } 
    }

    return false;
}

/**
 * Clear method
 */

function doClear(){
    clear();
    console.log(chalk.red('> You have cleared the console!'));
    send_message = false;
    return;
}

/**
 * Help method
 */
function sendHelp(){
    console.log(" ");
    console.log(">> Overall help:");
    console.log("> user");
    console.log("> clear");


    console.log("> help ");
    console.log(" ");
}