const conf = require("../conf")
const jsmediatags = require("jsmediatags")
const { getAudioDurationInSeconds } = require("get-audio-duration")
const fs = require("fs")
const Lame = require("node-lame").Lame
// const Speaker = require("speaker")

module.exports = {
  async getInfo(filename) {
    try {
      let path = `${conf.app.backendPath}/${conf.app.songsPath}/${filename}`

      let response = await new Promise((resolve, reject) => {
        jsmediatags.read(path, {
          onSuccess(metadata) {
            resolve(metadata.tags)
          },
          onError(error) {
            reject(error)
          }
        })
      })

      let duration = await getAudioDurationInSeconds(path)

      let info = {
        duration: Math.round(duration),
        title: response.title,
        artist: response.artist,
        album: response.album,
        year: response.year,
        genre: response.genre
      }

      return info
    } catch (error) {
      console.log(error)
    }
  },
  play(filename) {
    let path = conf.app.songsPath + "/" + filename
  }
}
