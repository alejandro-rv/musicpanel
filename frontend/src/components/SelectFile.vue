<template>
  <label id="file-select">
    <div :class="bootstrapClasses">
      <span v-if="value">Seleccionado: {{value.name}}</span>
      <span v-else>{{ msg }}</span>
    </div>
    <input type="file" @change="handleFileChange" accept="audio/x-mpeg" />
  </label>
</template>

<style scoped>
  #file-select > input[type="file"] {
    display: none;
  }
</style>

<script>
  export default {
    props: {
      value: File,
      msg: String,
      color: Array
    },
    data() {
      return {
        bootstrapClasses: {
          btn: true,
          ["btn-" + this.color]: true
        }
      }
    },
    methods: {
      handleFileChange(e) {
        this.$emit("input", e.target.files[0])
      }
    }
  }
</script>
