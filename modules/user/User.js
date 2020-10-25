/*

    User & Settings for each User are saved like this:

        User:

            id: Identifies the different users

            email: allows the service to send notification to the user, like different 2FA tokens

            joinedAt: The Date the User was created

            changedDetails: Gives Information about the changed Date and new Details (like email(aodjsosjaod@spasti.com) changed at 1.1.0020)

            group: Defines the permission the user has in the dashboard and in the rest of the backend
<
            databases: The Values identifies the databases created by the User

            authentication token: Refers to the API for own databases

            ID-Token (id-token): Allowes others to add users to their databases

*/

// Defines monk, framework for MongoDB
const monk = require('monk');
// Loads Variables
const dotenv = require('dotenv');
dotenv.config();

// Defines databases used for users
const dbrepo = monk(process.env.link);
const sysusers = dbrepo('system_users');

dbrepo.catch(err => {
    console.log(err);
})

module.exports.user = {
    User: (id, email, group, databases, authToken, idToken, joinedAt, changedDetails) => {
            return {
                id: id,
                email: email,
                group: group, 
                databases: databases,
                authToken: authToken,
                idToken: idToken,
                joinedAt: joinedAt,
                changedDetails: changedDetails
            }
    }, 

    getUsers: () => {
        return sysusers.find({limit: 100}, "-_id").then(callback => callback);
    },

    getUser: async(id) => {
        return await sysusers.find({id: id}).then(callback => callback);
    },

    addUsers: async(User) => {
        return await sysusers.insert({id: User.id, email: User.email, group: User.group, databases: User.databases, authToken: User.authToken, idToken: User.idToken, joinedAt: User.joinedAt, changedDetails: User.changedDetails}).then(callback => callback);
    },

    deleteUser: async(id) => {
        return await sysusers.deleteUser({id: id}).then(callback => callback);
    }
}