// Importar bibliotecas
const boom = require("boom")
const MariaSql = require("mariasql")
const conn = new MariaSql({
  host: "localhost",
  user: "musicpanel",
  password: "musicpanel",
  db: "musicpanel"
})

// Declarar funciones
const db = {
  async query(statement) {
    try {
      let response = await new Promise((resolve, reject) => {
        conn.query(statement, (error, rows) => {
          if (error) {
            reject(error)
          } else {
            resolve(rows)
          }
        })
      })

      return response
    } catch (error) {
      boom.boomify(error)
    }
  },
  async close() {
    try {
      await conn.end()

      return true
    } catch (error) {
      boom.boomify(error)
    }
  }
}

module.exports = db
