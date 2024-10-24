const cors = require('cors');
const express = require('express');
const app = express();
const port = 5002;

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
