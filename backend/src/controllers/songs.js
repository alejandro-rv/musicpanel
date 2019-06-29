const conf = require("../conf")
const fs = require("fs")
const Song = require("../models/Song")
const mp3 = require("../lib/mp3")

function generateFilename(original) {
  let name = original
  let path = conf.app.songsPath + "/" + name
  let i = 1

  while (fs.existsSync(path)) {
    i++
    let partialName = original.slice(0, -4)
    name = partialName + "-" + i + ".mp3"
    path = conf.app.songsPath + "/" + name
  }

  return name
}

module.exports = {
  async upload(request) {
    try {
      // Renombrar fichero
      let name = generateFilename(request.file.originalname)
      let path = conf.app.songsPath + "/" + name
      fs.renameSync(request.file.path, path)

      // Recoger información de la canción
      let info = await mp3.getInfo(name)

      // Registrar en la tabla
      let result = await Song.create({
        filename: name,
        duration: info.duration,
        title: info.title,
        artist: info.artist,
        album: info.album,
        year: info.year,
        genre: info.genre
      })

      return result
    } catch (error) {
      console.log(error)
    }
  },
  async find() {
    try {
      // Recoger canciones de la tabla
      let result = await Song.findAll()

      return result
    } catch (error) {
      console.log(error)
    }
  },
  async findById(request) {
    try {
      // Recoger canción de la tabla
      let result = await Song.findOne({
        where: { id: request.params.id }
      })

      return result
    } catch (error) {
      console.log(error)
    }
  },
  async updateById(request) {
    try {
      // Recoger el nombre del fichero dado el ID
      let result = await Song.findOne({
        where: { id: request.params.id }
      })
      let oldSongPath = conf.app.songsPath + "/" + result.filename

      // Borrar el fichero
      fs.unlinkSync(oldSongPath)

      // Renombrar el nuevo fichero
      let name = generateFilename(request.file.originalname)
      let path = conf.app.songsPath + "/" + name
      fs.renameSync(request.file.path, path)

      // Recoger información de la canción
      let info = await mp3.getInfo(name)

      // Sustituir los datos anteriores del ID por los nuevos
      await Song.update({
        filename: name, duration: info.duration, title: info.title,
        artist: info.artist, album: info.album, year: info.year,
        genre: info.genre
      }, {
        where: { id: request.params.id }
      })

      result = await Song.findOne({
        where: { id: request.params.id }
      })

      return result
    } catch (error) {
      console.log(error)
    }
  },
  async removeById(request) {
    try {
      // Recoger de la tabla el nombre del fichero
      let result = await Song.findOne({
        where: { id: request.params.id }
      })
      let path = conf.app.songsPath + "/" + result.filename

      // Borrar el fichero
      fs.unlinkSync(path)

      // Borrar el registro en la tabla
      await Song.destroy({
        where: { id: request.params.id }
      })

      return ""
    } catch (error) {
      console.log(error)
    }
  },
  async readById(request, reply) {
    try {
      // Recoger de la tabla el nombre del fichero
      let result = await Song.findOne({
        where: { id: request.params.id }
      })
      let path = conf.app.songsPath + "/" + result.filename

      // Leer el fichero
      let mp3 = fs.readFileSync(path)

      // Devolver el fichero en formato de audio, como descarga o reproducción
      let contentDisposition

      if (request.params.action == "play") {
        contentDisposition = "inline"
      } else {
        contentDisposition = "attachment"
      }

      reply.header("Content-Type", "audio/mpeg; charset=utf-8")
      reply.header(
        "Content-Disposition",
        `${contentDisposition}; filename=${result.filename}`
      )

      return mp3
    } catch (error) {
      console.log(error)
    }
  },
  async playById(request) {
    try {
      // Recoger de la tabla el nombre del fichero
      let result = await Song.findOne({
        where: { id: request.params.id }
      })

      mp3.play(result.filename)
    } catch (error) {
      console.log(error)
    }
  }
}
