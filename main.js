const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const fd = fs.openSync("access.log", "a");

const server = http.createServer((req, res) => {
	fs.writeSync(fd, `Access: ${req.url}\n`);
	// console.log(req.url);
	const p = req.url.slice(1);
	fs.readFile(p, (err, data) => {
		console.log(p);

		if (err) {
			console.log(err);
			fs.writeSync(fd, `Error: ${err}\n`);
			res.statusCode = 404;
			res.end();
			return;
		}
		const extension = path.extname(p);
		fs.writeSync(fd, `Extension detected: ${extension}\n`);
		if (extension === ".jpg") {
			res.setHeader('Content-Type', 'image/jpeg');
		}
		else if (extension === ".png") {
			res.setHeader('Content-Type', 'image/png');
		}
		else {
			res.setHeader('Content-Type', 'text/plain');
		}
		console.log(data);
		res.statusCode = 200;
		res.end(data);
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
