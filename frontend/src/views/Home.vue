<template>
  <div id="home">
    <h1 class="pb-3 mb-4 border-bottom">
      Bienvenido a Music Panel
    </h1>
    <div class="alert alert-danger" v-if="!apiConn">
      Se ha intentado una conexión con la API y ha fallado. No ha respondido a
      la siguiente petición: <code>{{ apiUrl + "/test" }}</code>
    </div>
    <div class="alert alert-info" v-else>
      Se ha comprobado que la API está activa y responde correctamente.
    </div>
    <p>
      Music Panel es un servidor de canciones, que permite subir y gestionar
      ficheros MP3 mediante una base de datos. Este es su interfaz web, una SPA
      diseñada mediante Vue.js + Bootstrap, que se comunica con una API en
      Node.js, la cual realiza todas las acciones en el servidor.
    </p>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data() {
      return {
        apiUrl: this.$store.state.apiUrl,
        apiConn: false
      }
    },
    async created() {
      if (await axios.get(this.apiUrl + "/test")) {
        this.apiConn = true
      }
    }
  }
</script>
