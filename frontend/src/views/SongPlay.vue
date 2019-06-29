<template>
  <div id="song-play">
    <h1 class="pb-3 mb-4 border-bottom" v-if="song.title">
      Reproducir {{ song.title }}
    </h1>
    <h1 class="pb-3 mb-4 border-bottom" v-else>
      Reproducir {{ song.filename }}
    </h1>
    <audio controls :src="readUrl">
      Su navegador no soporta el elemento &lt;audio&gt;.
    </audio>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data() {
      return {
        getUrl: this.$store.state.apiUrl + "/songs/" + this.$route.params.id,
        readUrl: this.$store.state.apiUrl + "/songs/" + this.$route.params.id + "/read/play",
        song: [],
        mp3: false
      }
    },
    async created() {
      let result = await axios.get(this.getUrl)
      this.song = result.data
    }
  }
</script>
