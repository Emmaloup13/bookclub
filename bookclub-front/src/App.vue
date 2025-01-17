<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>

    <NavBar />
    <div class="router-view">
      <RouterView />
    </div>

</template>

<style >

.router-view {
  width: 100%;
  height: 115%;
  background: url("./assets/banniere_CLAI.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #A3454C;
  background-position: center center;
  overflow-y: hidden;
}
</style>
