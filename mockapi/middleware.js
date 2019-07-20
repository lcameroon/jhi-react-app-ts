// const moment = require('moment');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
// const qs = require('qs');
const userdb = require('./data/users.json');
// const authdb = require('./data/authenticate.json');
const SECRET_KEY = '123456789';
const expiresIn = '1h';

module.exports = (req, res, next) => {
    let { url, body, method, headers } = req;

    // account
    if (_.includes(url, 'account') || _.includes(url, 'users')) {
        if (
            headers.authorization === undefined ||
            headers.authorization.split(' ')[0] !== 'Bearer'
        ) {
            const status = 401;
            const message = 'Error in authorization format';
            res.status(status).json({ status, message });
            return;
        }
    }

    // authenticate
    if (method === 'POST' && _.includes(url, 'authenticate')) {
        const { username, password } = body;
        if (isAuthenticated({ username, password }) === false) {
            const status = 400;
            const message = 'Incorrect username or password';
            res.status(status).json({ status, message });
            return;
        } else {
            // Add Authorization header
            req.method = 'GET';
            const userDetails = getUser(username) || { username, password };
            delete userDetails.password;
            const id_token = createToken(userDetails);
            res.header('Authorization', `Bearer ${id_token}`);
            res.header('X-User-Id', userDetails.id || 1);
        }
    }

    // clients
    if (method === 'GET' && _.includes(url, 'clients')) {
        const path = url.split('/');

        if (path[1] && !path[2]) {
            res.json(genAccounts(1000));
            return;
        }
        // clients/ID
        if (path[2]) {
            res.json(genDetails(path[2]));
            return;
        }
    }

    // Continue to JSON Server router
    next();
};

// Create a token from a payload
function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token){
    const check = (err, decode) => (decode !== undefined ? decode : err);
    return jwt.verify(token, SECRET_KEY, check);
}

// Check if the user exists in database
function isAuthenticated({ username, password }){
    const user = _.find(userdb.users, { username, password });
    return !!user;
}

function getUser(username){
    const user = _.find(userdb.users, { username });
    return { ...user };
}

function genAccounts(num = 100){
    const generateName = () => {
        return _.sample(clients) + ' ' + _.sample(suffixes);
    };

    const accounts = new Array(num).fill('').map((name, index) => {
        return {
            id: index + 1,
            name: generateName(),
            number: _.random(10000000, 99999999),
            type: _.sample([ 'HD', 'BP', null ]),
            currency: _.sample([ 'USD', 'EUR', 'GBP', 'CAD', 'CAD', 'CAD', 'AUD' ]),
            locTop: _.random(10, 90),
            locLow: _.random(25, 70),
            capacity: _.random(999999, 1999999),
            thold1: _.random(999999, 1999999),
            thold2: _.random(999999, 1999999),
            thold3: _.random(999999, 1999999),
            overdraft: _.random(999999, 1999999),
            stopped: _.random(100, 999),
            spendLimit: _.random(999999, 1999999)
        };
    });
    return accounts;
}

function genDetails(id){
    return {
        id,
        current: genValues(),
        forecast: genValues(),
        limits: {
            alertMsg: null,
            stopDebits: {
                value: _.random(90, 100),
                email: 'email@cental1.com'
            },
            threshold1: {
                value: _.random(80, 90),
                email: 'email@cental1.com'
            },
            threshold2: {
                value: _.random(70, 80),
                email: 'email@cental1.com'
            },
            threshold3: {
                value: _.random(50, 70),
                email: 'email@cental1.com'
            }
        }
    };
    function genValues(){
        const products = [
            { code: 'BILL', name: 'Bill Payments' },
            { code: 'ETRF', name: 'E-transfers' },
            { code: 'WIRE', name: 'Wire Transfers' },
            { code: 'AFT', name: 'Automated Funds Transfer' },
            { code: 'CBS', name: 'SubTotal' }
        ];
        return products.map(product => ({
            productName: product.name,
            productCode: product.code,
            aggrBalance: _.random(10000000, 99999999),
            aggrDebit: _.random(999999, 1999999),
            aggrCredit: _.random(999999, 1999999),
            aggrTotal: _.random(999999, 1999999),
            unsetAggrDebit: _.random(999999, 1999999),
            unsetAggrCredit: _.random(999999, 1999999),
            unsetAggrTotal: _.random(999999, 1999999),
            scheduledDebit: _.random(999999, 1999999),
            scheduledCredit: _.random(999999, 1999999),
            excess: _.random(999999, 1999999),
            decisioning: _.sample([ 'Pay', 'Pay', 'Pay', 'NoPay' ])
        }));
    }
}

const suffixes = [
    'Acoustics',
    'Arts',
    'Association',
    'Aviation',
    'Brews',
    'Club',
    'Co',
    'Company',
    'Corp',
    'Corporation',
    'Electronics',
    'Foundation',
    'Inc.',
    'Incorporated',
    'Industries',
    'Institute',
    'Intelligence',
    'Lighting',
    'Limited',
    'LLC',
    'Ltd.',
    'Records',
    'Society',
    'Syndicate',
    'Technologies',
    'Union'
];

const clients = [
    'Acme',
    'Alphacom',
    'Amazon',
    'Berry',
    'Berrycords',
    'Brisk',
    'Canics',
    'Cave',
    'Cavern',
    'Chief Exec',
    'Cruxolutions',
    'Cube',
    'Diamond',
    'Dino',
    'Dragon',
    'Dream',
    'Dynamic',
    'Fjord',
    'Flower',
    'Gem',
    'Gem',
    'Ghost',
    'Globex',
    'Goblintelligence',
    'Gorilla',
    'Griffindus',
    'Gusikowski',
    'High',
    'Honeydew',
    'Hound',
    'Hooli',
    'Karma',
    'Karitries',
    'Massive',
    'Marsoftwares',
    'Mercury',
    'Miller',
    'Night',
    'Orco',
    'Initech',
    'Purple',
    'Quaductions',
    'Riddle',
    'River',
    'Runolfsdottir',
    'Shade Master',
    'Signal',
    'Slick',
    'Slickorps',
    'Sprite',
    'Stormedia',
    'Soylent',
    'Tiger ',
    'Timber',
    'Typhoonavigations',
    'Umbrella',
    'Vinedustries',
    'Vehement',
    'Whizystems',
    'Wolfoods',
    'Wonder'
];
