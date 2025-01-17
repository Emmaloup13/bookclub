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

.home {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    /* background-color: rgba(255, 255, 255, 0.30); */
}
</style>