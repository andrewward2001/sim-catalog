module.exports = (app, database) => {
  // this is just to test the connection
  app.get('/db/category', (req, res) => {
    database.query(`SELECT * FROM \`Category\``, (error, response, fields) => {
      if (error) throw error
      res.send(response)
    })
  })
  app.post('/db/category', (req, res) => {
    let reg = new RegExp(/^[a-zA-Z0-9_]*$/)
    database.connect()
    if(req.body) {
      if(reg.test(req.body.name) || reg.test(req.body.id)) {
        database.query(`SELECT * FROM \`Category\` WHERE id=${req.body.id} OR name=${req.body.name}`, (error, response, fields) => {
          if (error) throw error
          res.send(response)
        })
      }
    } else {
      database.query(`SELECT * FROM \`Category\``, (error, response, fields) => {
        if (error) throw error
        res.send(response)
      })
    }
    database.end()
  })
}