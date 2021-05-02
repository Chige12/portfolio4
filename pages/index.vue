<template lang="pug">
  .container
    div
      h1.title portfolio4
      nuxt-link(to="./works") works
      .links
        a(
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
          ) Documentation
        a(
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        ) GitHub
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
