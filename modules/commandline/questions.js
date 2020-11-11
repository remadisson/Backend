/**
 * 
 * This class exists to make things easier :)
 * 
 */

const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    terminal: false,
    input: process.stdin,
    output: process.stdout
})

 module.exports.ask = {

    parameter: (question, abortable, lowerCase, clearSpacings) => {
        return {question: question, abortable: abortable, lowerCase: lowerCase, clearSpaceings: clearSpacings}; 
    },

    question: async(question, abortable, lowerCase, clearSpaceings) => {
        let callback = undefined;
        await new Promise((resolve, reject) => {
             rl.question(chalk.blue("> " + question + ": "), (input) => {
                let res = input.toString().trim().replace(/  /g, " ");

                lowerCase ? res = res.toLowerCase() : undefined;
                clearSpaceings ? res = res.replace(/ /g, "") : undefined;
                
                if(abortable){
                    if(res == ':a'){
                        callback = false;
                        resolve();
                        return;
                    }
                }

                if(res === '' || res == ' '){
                    console.log(chalk.red('> Command error: ') + "Your input is empty");
                    resolve();
                    return;
                }

                callback = res;
                resolve();
                return;

            });
        });
        return callback;
    },

    multiplequestions: async(multipleparameters) => {
        let callbacks = [];
        console.log(multipleparameters);
        for(i = 0; i < multipleparameters.length; i++){
            let item = multipleparameters[i];
            let callback = undefined;

            while(callback == undefined){
                callback = await this.ask.question(item['question'], item['abortable'], item['lowerCase'], item['clearSpacings']);
                console.log("> " + callback);
            }

            if(callback == false){
                console.log(chalk.red('> You have aborted this runnable.'));
                return callback;
            }
           
            callbacks[i] = callback;
            console.log('I bims done, du sohn einer Muddtha')
        }

        return callbacks;
    }

 }