    /*

    id: Indicates the database specific identifier

    createdBy: Defines the owner of a databse only he/she or an admin can manage without the approval of the owner
    
    access: Is specified in group or user(id) information, so they can manage them
    
    api: Specifies (true/false) the availability from the api that will be provied from this backend

    reachable: Contains the type of the api availability, so not everyone can access the data of every database

    */

// Defines monk, framekwork for mongodb
const monk = require('monk');

// Loads variables from .env
const dotenv = require('dotenv');
dotenv.config();

// Defines databases used for database
const dbrepo = monk(process.env.link);
const systemdb = dbrepo('system_databases');

dbrepo.catch(err =>{
    console.log(err);
})

// Defines the reachability from a database
module.exports.reachability = {
    public: 1,
    authenticate: 2,
    private: 3
}

module.exports.access = (userid) = {
    none: {},
    one: userid
}

module.exports.database = {
    Database: (id, createdBy, access, api, reachable) => {
        return {
            id: id,
            createdBy: createdBy,
            access: access,
            api: api,
            reachable: reachable
        };
    },

    getDatabases: async() => {
        return systemdb.find({}, "-_id").then(callback => callback) 
    },

    getDatabase: async(id) => {
        const db = await systemdb.find({id: id}, "-_id").then(callback => callback);
        return this.database.Database(db.id, db.createdBy, db.access, db.api, db.reachable);
    },

    addDatabase: async(Database) => {
        return await systemdb.insert({id: Database.id, createdBy: Database.createdBy, access: Database.access, api: Database.api, reachable: Database.reachable}).then(callback => callback);
    },

    deleteDatabase: async(id) => {
        return await systemdb.remove({id: id}).then(callback => callback);
    },

    entryExists: (id) => {
        return await systemdb.findOne({id: id}, "-_id").then(callback => callback != null);
    },

    isEmpty: () => {
        return await systemdb.find({}).then(callback => callback.length > 0);
    }
    
}