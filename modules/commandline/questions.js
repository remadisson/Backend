/**
 * 
 * This class exists to make things easier :)
 * 
 */

const readline = require('readline');
const chalk = require('chalk');

const rl = require('./climain').rl;

 module.exports.ask = {

    parameter: (question, abortable, lowerCase, clearSpacings) => {
        return {question: question, abortable: abortable, lowerCase: lowerCase, clearSpaceings: clearSpacings}; 
    },

    question: async(question, abortable, lowerCase, clearSpaceings) => {
        let callback = undefined;
        await new Promise((resolve, reject) => {
             rl.question(chalk.blue("> " + question + ": "), async(input) => {
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
                    console.log(chalk.red('> Command error: ') + "Your input is empty, bitch");
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

        let index = 0;
        while(index < multipleparameters.length){
            let item = multipleparameters[index];
            let callback = undefined;
            
            callback = await this.ask.question(item['question'], item['abortable'], item['lowerCase'], item['clearSpacings']);

            if(callback != undefined){
                if(callback == false){
                    console.log(chalk.red('> You have aborted this runnable.'));
                    return callback;
                }
            
                callbacks[index] = callback;
            } else {
                index--;
            }

            index++;
        }
        return callbacks;
    }

 }