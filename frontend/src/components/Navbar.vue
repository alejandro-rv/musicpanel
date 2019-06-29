<template>
  <div id="navbar" class="pb-4">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <span class="navbar-brand">
        <img src="@/assets/logo.png" alt="Music Panel">
      </span>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/songs">Canciones</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  .navbar-brand img {
    height: 2em;
  }
</style>
