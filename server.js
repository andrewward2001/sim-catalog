const express = require('express')
const fs = require('fs')
const mysql = require('mysql')

const PORT = process.env.PORT || 3001

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sim_catalog'
})

const app = express()

require('./routes.js')(app, database)

app.listen(PORT, () => {
  console.log(`sim-catalog running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve('frontend/public', 'index.html'))
})