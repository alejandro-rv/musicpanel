<template>
  <div id="song-remove">
    <h1 class="pb-3 mb-4 border-bottom">
      <span v-if="song.title">Sustituir {{ song.title }}</span>
      <span v-else>Sustituir {{ song.filename }}</span>
    </h1>
    <div class="alert alert-warning">
      ¿Está seguro de que quiere sustituir esta canción por otra?
    </div>
    <form id="upload-song" @submit.prevent="submit">
      <p>
        <SelectFile v-model="file" :msg="msg" color="warning" />
      </p>
      <button type="submit" class="btn btn-danger mb-4" v-if="file">
        {{ msg }}
      </button>
    </form>
  </div>
</template>

<script>
  import SelectFile from "@/components/SelectFile.vue"
  import axios from "axios"

  export default {
    components: {
      SelectFile
    },
    data() {
      return {
        getUrl: this.$store.state.apiUrl + "/songs/" + this.$route.params.id,
        putUrl: this.$store.state.apiUrl + "/songs/" + this.$route.params.id,
        song: {},
        file: null,
        msg: "Sustituir"
      }
    },
    methods: {
      async submit() {
        let body = new FormData()
        body.append("song", this.file)

        let result = await axios.put(this.putUrl, body, {
          headers: { "Content-Type": "multipart/form-data" }
        })
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
