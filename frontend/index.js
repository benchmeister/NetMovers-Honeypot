
// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/mouses.live/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/mouses.live/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/mouses.live/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

//Public Pages
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/account/:userid", (req, res) => {
  res.sendFile("/public/account.html", { root: __dirname });
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
