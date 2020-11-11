/*
    COMMAND-SYNTAX FOR user

        user

            add
                -> Asks certain question concerning the User-Profile
            remove
                -> Asks for the userID that is available for Admins and the User
            list
                --id 012 [id that starts with the number]
                --email max [email that contains those symbols]
                --group 0 [group that the user is in] 
                -s 100 [number of size]
                -> Lists Users Names, ID'S and Emails
            edit
                --name [new/updated name] 
                --email [new mail]
                --group [value]

*/

const chalk = require('chalk');
const questions = require('./questions');

const UserClass = require('./../user/User');
const UserConstructor = require('./../user/UserConstructor');

/**
 * This is the user command. To create, edit and remove new users.
 * @param {*} args 
 */
module.exports = async(args) => {

    /**
     * -> No switch-case statement used to provide overview of the code.
     */

    if(args.length == 0){
        sendhelp(); 
       /* Needs to be returned, else the script would continue running */ return;
    }

    if(args[0] === "add"){
        
        let question = [{question: "Please enter the name", abortable: true, lowerCase: false, clearSpacings: false},{question: 'Please enter the email', abortable: true, lowerCase: true, clearSpacings: true}, {question: 'Enter the group of the user (0000/2000/3000)', abortable: true, lowerCase: true, clearSpacings: false}];
        
        const response = await questions.ask.multiplequestions(question);
            
            if(response == false){
                return;
            }

        let date = UserConstructor.credentials.newDate();
        
        let user = UserClass.user.User(UserConstructor.credentials.userID, response[0], response[1], response[2], {}, UserConstructor.credentials.xToken(), UserConstructor.credentials.xToken(), date, date);

        console.log(user);
        
        /* Needs to be returned, else the script would continue running */ return;
    }

    if(args[0] === "remove"){
        console.log("> You!");

        /* Needs to be returned, else the script would continue running */ return;
    }

    function Filter(id, name, value) { return {id: id, name: name, value: value}};
    const listFilters = [Filter("--id", "id", null), Filter("--email", "email", null), Filter("--group", "group", null), Filter("-s", "size", 100)];
    let currentFilters = listFilters;

    if(args[0] === "list"){

        if(args.length == 1){
            //TODO List with 10;
            console.log(currentFilters);
            return;
        }

        for(i = 0; i < args.length; i++){

            currentFilters.forEach(item => {
                if(item['id'] === args[i]){
                    let value = args[i+1];
                    if(value !== null && value !== undefined && !value.includes("-") && value.length > 0){
                        item['value'] = value;
                    } else {
                        console.log(chalk.red('> Syntax error: ') + chalk.yellow("Please check command at '" + item['id'] + "'")); // TODO
                    }
                }
            }) 
        }

        console.log(currentFilters);

        /* Needs to be returned, else the script would continue running */ return;
    }

    sendhelp();

    return;
}

function sendhelp(){
    console.log("> " + chalk.green('Help for user'));
    console.log(chalk.greenBright('> user add'));
    console.log(chalk.greenBright('> user remove'));
    console.log(chalk.greenBright('> user list [--id Nach ID filtern] [--email Nach Email filtern] [--group Nach Gruppe filtern] [-s Nach maximaler Anzahl anzeigen]'));
    console.log(chalk.greenBright('> user edit [--name Change name] [--email Change email] [--group Change group]'));
    console.log(chalk.cyan('-'))
    return;
}