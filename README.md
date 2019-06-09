# A distributed client-server implementation with browser interfacing

This is a distributed client-server implementation where the client <-> server communication is handled through a (real-time) websocket, and both the client and server themselves run a pair of web+socket servers for local access.

This means that in a minimal setup, there are four servers running:

## The Server Component

The server runs one socket server for "the actual thing", which in this case is a game hub + engine.

The server also runs second socket server for real-time inspection of the game hub state, with an associated web server that allows users to fire up a browser, point it at the web server, load a minimal index.html/js payload, and use that to set up the bidirectional real-time connection to the server's socket server.

### Running the server

Run `npm run server and you should be presented with the following output:

```
> @ server [...]client-server
> node src/server/app.js

[1] Start game host on http://localhost:56581
[1] Start game host administrative socket server on http://localhost:56582
[1] Start game host administrative web server on http://localhost:56583
```

This shows the three servers that are running, each on their own port:

- the game host is what the client connects to
- the administrative web server is what admins can load up in their browser
- the administrative socket server is the real-time component for the browser based admin view

## The Client Component

The client runs a socket "client connection" to the server's main socket server, in order to exchange message around joining, taking actions, hub updates, etc.

The client also runs a second socket server for real-time interaction by a _user_ of that client, with an associated web server that allows the user to fire up a browser, point it at the web server, load a minimal index.html/js payload, and use that to set up the bidirectional real-time connection to the client's socket server.

### Running the client

Run `npm run client -- PORT_NUMBER` with the `PORT_NUMBER` replaced by the port number used byt the game host. For example, if the server showed:

```
Start game host on http://localhost:56581
```

Then the run command would be

```
npm run client -- 56581
```

You should be presented with the following output:

```
> @ client [...]client-server
> node src/client/app.js "56581"

[1] Start client socket server on http://localhost:57647
[1] Start client web server on http://localhost:57648
[1] client connected
```

This shows the two servers that are running, each on their own port:

- the web server is what a user can load up in their browser
- the socket server is the real-time component for the browser based interaction

It also shows that a connection was made to the game host.
