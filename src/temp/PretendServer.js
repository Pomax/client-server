const uuid = require('uuid');

/**
 * test
 */
class PretendServer {
    constructor(io, builder) {
        this.clients = [];
        this.listenForClients(io, builder);
    }

    async listenForClients(io, builder) {
        io.on(`connection`, socket => {
            console.log(`server> client connected to server`);
            new builder.handler(socket, this);
            this.bindClient(socket, builder);
        });
    }

    async bindClient(socket, builder) {
        let client = {
            client: new builder.client(socket),
            socket: socket,
            name: undefined,
            id: uuid()
        };
        let confirmed = await client.client.register(client.id);
        console.log('server> client confirmed registration');
        client.confirmed = confirmed;

        this.clients.forEach(entry => entry.client.userJoined(client.id));
        this.clients.push(client);
    }

    // Server's API functions, "called" by the client:

    async setName(data) {
        let {clientId, name} = data;
        this.clients[clientId].name = name;
        console.log(`server> client ${clientId} is now called ${name}`);
    }

    async getUserList() {
        console.log(`server> sending user list`);
        return this.clients.map(c => c.id);
    }
}

module.exports = PretendServer;
