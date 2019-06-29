<template>
  <div class="song-card">
    <h5 v-if="song.title">{{ song.title }}</h5>
    <h5 v-else>{{ song.filename }}</h5>
    <ul class="row list-unstyled mb-0" v-for="(prop, i) in songProps" :key="i">
      <li class="col-sm-6 text-right">{{ prop.key }}</li>
      <li class="col-sm-6 text-left">{{ prop.value }}</li>
    </ul>
    <hr />
    <div class="row">
      <button v-for="(button, i) in songActions" :key="i"
      class="col-sm-6 btn btn-link">
        <a :href="button.route" target="_blank" v-if="button.external">
          {{ button.title }}
        </a>
        <router-link :to="button.route" v-else>
          {{ button.title }}
        </router-link>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      song: Object
    },
    data() {
      return {
        song: {},
        songProps: [
          { key: "Duración", value: this.displayDuration(this.song.duration) },
          { key: "Artista", value: this.song.artist },
          { key: "Álbum", value: this.song.album },
          { key: "Año", value: this.song.year },
          { key: "Género", value: this.song.genre },
        ],
        songActions: [
          { route: "/songs/" + this.song.id + "/play", title: "Reproducir" },
          {
            external: true,
            route: this.$store.state.apiUrl + "/songs/" + this.song.id + "/read/download",
            title: "Descargar"
          },
          { route: "/songs/" + this.song.id + "/replace", title: "Sustituir" },
          { route: "/songs/" + this.song.id + "/remove", title: "Borrar" },
        ]
      }
    },
    methods: {
      displayDuration(total) {
        let minutes = Math.floor(total / 60)
        let seconds = total - (minutes * 60)

        return minutes + ":" + seconds.toString().padStart(2, "0")
      }
    }
  }
</script>
