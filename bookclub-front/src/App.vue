<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>

  <NavBar />
  <div class="router-view">
    <RouterView />
  </div>

</template>

<style>
.router-view {
  width: 100%;
  height: 115%;
  /* background-color: #a3454b9a; */
}
</style>
