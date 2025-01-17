<template>
    <h2 class="text-center">Livre du Moment</h2>
    <div class="card">
        <div class="card-body">
            <img v-if="currentBook && currentBook.imageUrl" :src="currentBook.imageUrl" alt="Image du livre" class="card-img-top fixed-size-img">
            <h5 class="card-title">{{ currentBook ? currentBook.title : "" }}</h5>    
        </div>
    </div>
</template>

<script>
export default {
    name: "MyCurrentBook",
    props: {
        currentBook: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.fixed-size-img {
  margin-bottom: 10px;
  width: 150px; /* Ajustez cette valeur selon vos besoins */
  height: 200px; /* Ajustez cette valeur selon vos besoins */
  object-fit: cover; /* Pour s'assurer que l'image s'adapte bien à la taille définie */
}
.card {
    background-color: transparent;
    border: none    ;
}
.card-body{
    text-align: center;
    
}
</style>