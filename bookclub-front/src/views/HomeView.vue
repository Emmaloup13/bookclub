<template>
   
       <div class="home">
        <Home />
       </div>
    
</template>


<script>

import Home from '../components/Home.vue'


export default {
    name: 'HomeView',
    components: {
        Home,
    }
}
</script>



<style scoped>

/* .home {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    /* background-color: rgba(255, 255, 255, 0.30); 
} */

.home {
  width: 100%;
  height:115vh;
  background: url("../assets/banniere_CLAI.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #A3454C;
  background-position: center center;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>