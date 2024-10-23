const app = require("./app.js");
const https = require('https')
const fs = require('fs')

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/mouses.live/privkey.pem' ,'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/mouses.live/cert.pem', 'utf8')
const ca = fs.readFileSync('/etc/letsencrypt/live/mouses.live/chain.pem', 'utf8')

const credentials = {
        key: privateKey,
        cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, () => {
    console.log(`Server started on https://localhost:3000`);
});
