<template>
  <div id="app" class="container">
    <Navbar />
    <!-- Se incluye dinámicamente la vista actual -->
    <router-view />
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar.vue"

  export default {
    name: "App",
    components: {
      Navbar
    },
    data() {
      return {
        apiUrl: this.$store.state.apiUrl
      }
    }
  }
</script>
