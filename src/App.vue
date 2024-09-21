<script setup>

import {RouterView} from 'vue-router'

import Header from './components/Header.vue'


</script>

<template>
  <div>
    <Header></Header>
    <div class="container pt-5">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>

</style>
