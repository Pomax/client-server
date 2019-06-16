const API = require('./API');
const generateCommunicationObjects = require('./generateCommunicationObjects');
const coms = generateCommunicationObjects(API);
const PretendClient = require('./PretendClient');
const PretendServer = require('./PretendServer')

const webserver = require("http").Server();
const io = require("socket.io")(webserver);
const serverBuilder = coms.user.server;
const server = new PretendServer(io, serverBuilder);

webserver.listen(0, () => {
    const port = webserver.address().port;
    const serverURL = `http://localhost:${port}`;

    console.log(`index> pretend server listening on ${port}`);

    let count = 3;
    const next = () => {
        if(count) {
            const socketToServer = require(`socket.io-client`)(serverURL);
            const clientBuilder = coms.user.client;
            const client = new PretendClient(socketToServer, clientBuilder);
            count--;
            setTimeout(next, 1000);
        }
    }

    console.log(`index> building ${count} clients`);
    next();
});
