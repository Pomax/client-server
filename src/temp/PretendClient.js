/**
 * test
 */
class PretendClient {
    constructor(socket, builder) {
        this.server = new builder.server(socket);
        this.handler = new builder.handler(socket, this);
        this.users = [];
    }

    // Client's API functions, "called" by the server:

    async register(clientId) {
        console.log(`client> received registration id ${clientId}`);
        this.id = clientId;
        setTimeout(async() => {
            console.log('client> requesting user list');
            let list = await this.server.getUserList();
            console.log('client> received user list', list);
            this.users = list;
        },1000);
        return { status: 'registered' };
    }

    async userJoined(user) {
        this.users.push(user);
        console.log(`client> user ${user} joined. Know users:`, this.users);
    }

    async userLeft(user) {
        let pos = this.users.findIndex(u => (u === user));
        if (pos > -1) this.users.splice(pos,1);
        console.log(`client> user ${user} left. Know users:`, this.users);
    }

    async getStateDigest(data) {
        console.log(`client> state digest requested.`);
        return { state: 'unknown' };
    }
};

module.exports = PretendClient;
