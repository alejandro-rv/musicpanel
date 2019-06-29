const conf = require("./conf")
const multer = require("fastify-multer")
const upload = multer({ dest: conf.app.songsPath })
const songs = require("./controllers/songs")
const lists = require("./controllers/lists")

module.exports = [
  { method: "GET", url: "/test", async handler() { return "OK" } },
  // Canciones
  {
    method: "POST", url: "/songs", preHandler: upload.single("song"),
    handler: songs.upload
  },
  { method: "GET", url: "/songs", handler: songs.find },
  { method: "GET", url: "/songs/:id", handler: songs.findById },
  {
    method: "PUT", url: "/songs/:id", preHandler: upload.single("song"),
    handler: songs.updateById
  },
  { method: "DELETE", url: "/songs/:id", handler: songs.removeById },
  { method: "GET", url: "/songs/:id/read/:action", handler: songs.readById },
  // Listas
  { method: "POST", url: "/lists", handler: lists.add },
  // { method: "GET", url: "/lists", handler: lists.find },
  // { method: "GET", url: "/lists/:id", handler: lists.findById },
  // { method: "PUT", url: "/lists/:id", handler: lists.updateById },
  // { method: "DELETE", url: "/lists/:id", handler: lists.removeById },
  // Horarios
  // { method: "POST", url: "/schedules", handler: schedules.add },
  // { method: "GET", url: "/schedules", handler: schedules.find },
  // { method: "GET", url: "/schedules/:id", handler: schedules.findById },
  // { method: "PUT", url: "/schedules/:id", handler: schedules.updateById },
  // { method: "DELETE", url: "/schedules/:id", handler: schedules.removeById },
  // Reproducción
]
