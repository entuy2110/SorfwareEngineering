const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`)
});

const cors = require('cors');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    pingTimeout: 60000
});

const { CORS_WHITELIST } = require('./server/configs/cors');

app.use(cors());

app.use(express.static('build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const { listenEventContract } = require('./server/socket');

listenEventContract();

const port = process.env.PORT || 4003;

const server = http.listen(port, () => {
    console.log(`Server is running on port: ${server.address().port}`);
});
