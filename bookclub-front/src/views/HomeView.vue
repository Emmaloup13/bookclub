<template>
    <div id="home_view">
        <div id="home_container">
            <Home />
        </div>
    </div>
</template>


<script>

import Home from '../components/Home.vue'


export default {
    name: 'HomeView',
    components: {
        Home,
        Map
    }
}
</script>



<style>

</style>