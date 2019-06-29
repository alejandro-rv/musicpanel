<template>
  <div class="songs">
    <h1 class="pb-3 mb-4 border-bottom">
      Canciones
    </h1>
    <UploadSong @sent="reload" />
    <ListSongs ref="listSongs" />
  </div>
</template>

<script>
  import UploadSong from "@/components/UploadSong.vue"
  import ListSongs from "@/components/ListSongs.vue"

  export default {
    components: {
      UploadSong,
      ListSongs
    },
    methods: {
      reload() {
        this.$refs.listSongs.reload()
      }
    }
  }
</script>
