<template>
    <h3 class="text-center mb-4 pt-4">Liste des livres à lire</h3>
    <div v-for="book in books" :key="book._id" class="card border-primary mb-3">
        <div class="card-header">{{ book.title }}</div>
        <div class="card-body">
            <div class="row g-0">
                <div class="col-4 col-md-1">
                    <img :src="book.imageUrl" alt="Book cover" class="book-image" />
                </div>
                <div class="col-8 col-md-1 d-flex flex-column ">
                    <p class="card-text mb-1 ms-1">{{ book.author }}</p>
                    <p class="card-text ms-1">{{ book.pages }} pages</p>
                </div>
                <div class="col-md-8 d-none d-md-block">
                    <p class="card-text">{{ book.summary }}</p>
                </div>
                <div class="col-md-2 text-center">
                    <div class="row mb-2">
                        <div class="col">
                            <button class="btn btn-primary">En cours <i class="bi bi-clock"></i></button>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col">
                            <button class="btn btn-primary">Lu <i class="bi bi-check"></i></button>
                        </div>
                    </div>
                </div>
            </div>
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
.book-image {
    width: 100px;
    height: 150px;
}

.card {
    margin: 0 auto;
    width: 95%;
}
</style>