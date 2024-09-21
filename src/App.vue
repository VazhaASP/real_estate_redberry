<script setup>

import {RouterView} from 'vue-router'

import Header from './components/Header.vue'


</script>

<template>
  <div>
    <Header></Header>
    <div class="main-container pt-5">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
.main-container{
  padding: 38px 162px 38px 162px;
}
</style>
