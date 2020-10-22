// Allows the interaction with the command line
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    terminal: false,
    input: process.stdin,
    output: process.stdout
})

let send_message = false;

const commands = [{command: "user", function: userCommand}];

module.exports.init = async() => {
    if(!send_message) console.log(chalk.blueBright("> Use `help` for more information.")), send_message = true;

    await new Promise((resolve, reject) => {
        rl.question("> ", (input) => {
            const command = input.toLowerCase().trim().replace("  ", " ").trim().split(" ")[0];
            let args = [];

            for(i = 1; i < input.toString().toLowerCase().replace("  ", " ").trim().split(" "); i++){
                args[i-1] = input.toString().toLowerCase().replace("  ", " ").trim().split(" ")[i];
            }

            if(checkCommand(command)){
                getCommand(command)['function'](">> hurensohn");
                resolve();
            } else {
                console.log("This is not a command!");
                resolve();
            }
            
        });
    }).then(callback => this.init());
    
}

// Defines Methods that are use for Commands
// TODO OWN CLASSES FOR THOSE COMMANDS.

function userCommand(agrs){
    
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