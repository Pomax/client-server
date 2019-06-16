const API = {
    user: { // namespace
        client: [ // used to generate an "on" handler object, and a client representation for the server
            'register',
            'userJoined',
            'userLeft',
            'getStateDigest'
        ],
        server: [ // used to generate an "on" handler object, and a server representation for the client
            'setName',
            'getUserList'
        ]
    }
};

module.exports = API;
