const conf = require("../conf")
const Sequelize = require("sequelize")
const db = new Sequelize(conf.sequelize.connUrl)

module.exports = db.define("song", {
  filename: Sequelize.STRING,
  duration: Sequelize.INTEGER,
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
  year: Sequelize.INTEGER,
  genre: Sequelize.STRING
}, {
  timestamps: false
})
