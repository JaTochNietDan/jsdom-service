const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

function produceHTML(html) {
    const dom = new JSDOM(
        html,
        {
            runScripts: 'dangerously',
            contentType: 'text/html',
            pretendToBeVisual: true,
            strictSSL: false,
            resources: 'usable'
        }
    );

    return dom.serialize();
}

const server = http.createServer((req, res) => {
    if (req.method !== 'POST') {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Bad request\n');
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(produceHTML(body));
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});