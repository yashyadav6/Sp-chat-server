const uWS = require('uWebSockets.js');

// Render sets the PORT environment variable.
const port = process.env.PORT || 9001;

uWS.App().ws('/chat/:conversationId', {
    idleTimeout: 120,

    open: (ws) => {
        console.log('A user connected!');
        ws.subscribe(ws.conversationId); 
    },

    message: (ws, message, isBinary) => {
        let chatText = Buffer.from(message).toString();
        // Broadcast the message to everyone in this conversation
        ws.publish(ws.conversationId, chatText, isBinary);
    },

    close: (ws, code, message) => {
        console.log('A user disconnected');
    },

    upgrade: (res, req, context) => {
        const url = req.getUrl(); 
        const conversationId = url.split('/')[2];

        res.upgrade(
            { conversationId: conversationId }, 
            req.getHeader('sec-websocket-key'),
            req.getHeader('sec-websocket-protocol'),
            req.getHeader('sec-websocket-extensions'),
            context
        );
    }
}).listen(port, (token) => {
    if (token) {
        console.log('🔥 uWebSocket server running on port ' + port);
    } else {
        console.log('❌ Failed to listen to port ' + port);
    }
});
