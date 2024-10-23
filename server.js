// // const http = require('http');
// // const server = http.createServer((rep, res) => {
// //     res.statusCode = 200
// //     res.setHeader('Content-Type', 'text-plain')
// //     res.end('Working')
// // });

// // server.listen(3000, () => {
// //     console.log("http://localhost:3000")
// // })


const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'API created' })
});

app.get('/status', (req, res) => {
    res.json({ status: 'running', message: 'Currently working' });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
