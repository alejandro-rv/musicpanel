<template>
  <div id="list-songs" class="row">
    <p v-if="!songs.length">
      Cargando...
    </p>
    <div class="col-lg-3 col-sm-6 p-4 card bg-light text-center"
      v-for="song in songs" :key="song.id">
      <SongCard :song="song" />
    </div>
  </div>
</template>

<script>
  import SongCard from "@/components/SongCard.vue"
  import axios from "axios"

  export default {
    components: {
      SongCard
    },
    data() {
      return {
        getUrl: this.$store.state.apiUrl + "/songs",
        songs: []
      }
    },
    methods: {
      async getSongs() {
        let result = await axios.get(this.getUrl)
        this.songs = result.data
      },
      async reload() {
        await this.getSongs()
      }
    },
    async created() {
      await this.getSongs()
    }
  }
</script>

<style scoped>
  #list-songs {
    font-size: 0.8em;
  }
</style>
