const express = require('express')
const app = express()
const port = 3000
const database = require('./public/database.json')
const fs = require('fs')

const bodyParser = require('body-parser')


app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.sendFile(__dirname + '/public/views/index.html'))
app.get('/contact', (req, res) => res.sendFile(__dirname + '/public/views/Contact.html'))
app.get('/portfolio', (req, res) => res.sendFile(__dirname + '/public/views/Portfolio.html'))
app.get('/resume', (req, res) => res.sendFile(__dirname + '/public/views/Resume.html'))

// fs.readFile('./public/database.json', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(Array.isArray(data))
//   let db = database;
//   db.push({key: 'hey', value: 'meh'})
//   console.log(db)
//   fs.writeFile(`${__dirname + '/public/database.json'}`, JSON.stringify(db), (err) => {
//       if (err) throw err
//
//   });
// })

app.post('/save', (req, res) => {
    if (req.body){
        console.log(database)
        console.log(req.body)
        console.log(Array.isArray(database))
        let db = database;
        db.push(req.body);
        console.log(db)
        fs.writeFile(`${__dirname + '/public/database.json'}`, JSON.stringify(db), (err) => {
            if (err) {
                console.log(err)
                return res.status(400).send('Bad Request')
            } else {
                console.log('The file has been saved!');
                return res.status(200).send('success')
            }

        });
    } else {
        res.status(400).send('Bad Request')
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
