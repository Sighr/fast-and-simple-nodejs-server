const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const fd = fs.openSync("access.log", "a");

const server = http.createServer((req, res) => {
	fs.writeSync(fd, `${Date.now()} ${req.connection.remoteAddress} ${req.url} `);
	const p = req.url.slice(1);
	fs.readFile(p, (err, data) => {

		if (err) {
			// fs.writeSync(fd, `Error: ${err}\n`);
			res.statusCode = 404;
			fs.writeSync(fd, '404\n');
			res.end();
			return;
		}
		const extension = path.extname(p);
		// fs.writeSync(fd, `Extension detected: ${extension}\n`);
		if (extension === ".jpg") {
			res.setHeader('Content-Type', 'image/jpeg');
		}
		else if (extension === ".png") {
			res.setHeader('Content-Type', 'image/png');
		}
		else {
			res.setHeader('Content-Type', 'text/plain');
		}
		res.statusCode = 200;
		fs.writeSync(fd, '200\n');
		res.end(data);
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
