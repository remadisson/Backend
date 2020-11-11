/**
 * This class is for creation purposes only. 
 * So we have methods that generate for example random user id's.
 */

const crypto = require('crypto');

 module.exports.credentials = {
     userID: () => {
        return crypto.randomBytes(25).toString('hex');
     },

     newDate: () => {
         return new Date();
     },

     xToken: () => {
        return crypto.randomBytes(30).toString('hex');
     }
 }