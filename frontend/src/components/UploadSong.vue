<template>
  <form id="upload-song" @submit.prevent="submit">
    <p>
      <SelectFile v-model="file" :msg="msg" color="primary" />
    </p>
    <button type="submit" class="btn btn-success mb-4" v-if="file">
      {{ msg }}
    </button>
  </form>
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
        uploadUrl: this.$store.state.apiUrl + "/songs",
        file: null,
        msg: "Subir"
      }
    },
    methods: {
      async submit() {
        let body = new FormData()
        body.append("song", this.file)

        let result = await axios.post(this.uploadUrl, body, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        this.file = null
        this.$emit("sent")
      }
    }
  }
</script>
