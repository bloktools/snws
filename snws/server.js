const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { startServer, stopServer } = require('./server');

let server = null;

function startThisFuckingServer(folderPath) {
    const staticPath = folderPath || __dirname;
    app.use(express.static(staticPath));

    server = app.listen(8000, () => {
        console.log(`Server started at http://localhost:8000`);
        fs.writeFileSync(path.resolve(__dirname, 'server.pid'), process.pid.toString());
    });
}

function stopThisFuckingServer() {
    const pidPath = path.resolve(__dirname, 'server.pid');

    if (fs.existsSync(pidPath)) {
        const pid = parseInt(fs.readFileSync(pidPath, 'utf8'), 10);
        process.kill(pid);
        fs.unlinkSync(pidPath);
        console.log('Server stopped.');
    } else {
        console.log('No running server found.');
    }

}

const args = process.argv.slice(2);
if (args[0] === 'start') {
    const folderPath = args[1];
    startThisFuckingServer(folderPath);
} else if (args[0] === 'stop') {
    stopThisFuckingServer();
}

module.exports = { startThisFuckingServer, stopThisFuckingServer };