<template>
    <h3 class="text-center">Books to read</h3>
    <div v-for="book in books" :key="book._id" class="card border-primary mb-3" >
        <div class="card-header">{{ book.title }}</div>
        <div class="card-body">
            <img :src="book.imageUrl" alt="Book cover" class="book-image" />
            <p class="card-text">Author: {{ book.author }}</p>
            <p class="card-text">Pages: {{ book.pages }}</p>
        </div>
    </div>


</template>

<script>
export default {
    name: "BookList",
    props: {
        books: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
</style>