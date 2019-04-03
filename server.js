const express = require('express')
const mysql = require('mysql')

const PORT = process.env.PORT || 3000

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sim_catalog'
})

database.connect((e) => {
  console.log(e ? e : database)
})

const app = express()

app.listen(PORT, () => {
  console.log(`sim-catalog running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.send('sim-catalog')
})