<template>
  <div id="song-remove">
    <h1 class="pb-3 mb-4 border-bottom">
      <span v-if="song.title">Borrar {{ song.title }}</span>
      <span v-else>Borrar {{ song.filename }}</span>
    </h1>
    <div class="alert alert-danger">
      ¿Está seguro de que quiere borrar esta canción?
    </div>
    <button class="btn btn-danger" @click="remove">Borrar</button>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data() {
      return {
        getUrl: this.$store.state.apiUrl + "/songs/" + this.$route.params.id,
        removeUrl: this.$store.state.apiUrl + "/songs/" + this.$route.params.id,
        song: {}
      }
    },
    methods: {
      async remove() {
        let result = await axios.delete(this.removeUrl)
        this.song = result.data
        this.$router.push("/songs")
      }
    },
    async created() {
      let id = this.$route.params.id
      let result = await axios.get(this.getUrl)
      this.song = result.data
    }
  }
</script>
