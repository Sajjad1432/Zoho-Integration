const bcrypt = require('bcrypt')
const users=[
    {
        username:"Admin",
        email:"admin@nbf.com",
        password: bcrypt.hashSync('0786', 8),
        userRole: 'admin',
        subscriptions: []
    },
    {
        username:"Client",
        email:"client@nbf.com",
        password:bcrypt.hashSync('0786', 8),
        userRole: 'client',
        subscriptions: []
    },
]

module.exports = users;