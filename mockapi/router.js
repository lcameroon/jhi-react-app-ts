const authenticate = require('./data/authenticate.json');
const account = require('./data/account.json');
const clients = require('./data/clients.json');
const users = require('./data/users.json');

module.exports = () => {
    return {
        ...authenticate,
        ...account,
        ...clients,
        ...users
    };
};
