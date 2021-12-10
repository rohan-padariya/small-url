const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const connectDB = require('./config/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')))

const router = require('./controllers/UrlController')
const UrlService = require('./services/UrlService')

connectDB().then(res => {
    // UrlService.
}).catch(err => {
    console.log(error)
})

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/', (req, res) => {
//     console.log('here')
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })
app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})