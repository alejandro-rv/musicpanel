const List = require("../models/List")
const Song = require("../models/Song")

module.exports = {
  async add() {
    let newList = {
      name: "Rock",
      songs: [
        { id: 3 }, { id: 4 }, { id: 6 }, { id: 11 }, { id: 13 }, { id: 14 }
      ]
    }

    List.belongsToMany(Song, { through: "song_lists" })
    List.create({
      name: newList.name,
      songs: newList.songs
    }, {
      include: [ Song ]
    })

    return "OK"
  }
}
