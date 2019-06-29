import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"
import Songs from "./views/Songs.vue"
import SongPlay from "./views/SongPlay.vue"
import SongReplace from "./views/SongReplace.vue"
import SongRemove from "./views/SongRemove.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkExactActiveClass: "active",
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/songs", name: "songs", component: Songs },
    { path: "/songs/:id/play", name: "song-play", component: SongPlay },
    { path: "/songs/:id/replace", name: "song-replace", component: SongReplace },
    { path: "/songs/:id/remove", name: "song-remove", component: SongRemove }
  ]
})
