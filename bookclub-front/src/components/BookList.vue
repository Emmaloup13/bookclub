<template>
    <h3 class="text-center mb-4 pt-4">Liste des livres à lire</h3>
    <div v-for="book in paginatedBooks" :key="book._id" class="card border-primary mb-3">
        <div class="card-header">{{ book.title }}</div>
        <div class="card-body">
            <div class="row g-0">
                <div class="col-4 col-md-1">
                    <img :src="book.imageUrl" alt="Book cover" class="book-image" />
                </div>
                <div class="col-4 col-md-1 d-flex flex-column ">
                    <p class="card-text mb-1 ms-1">{{ book.author }}</p>
                    <p class="card-text ms-1">{{ book.pages }} pages</p>
                </div>
                <div class="col-md-8 d-none d-md-block">
                    <p class="card-text">{{ book.summary }}</p>
                </div>
                <div class="col-4 col-md-2 text-center d-flex flex-column boutons ms-auto">
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
    <div class="pagination">
        <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Précédent</button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
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
    },
    data() {
        return {
            currentPage: 1,
            perPage: 3
        };
    },
    computed: {
        paginatedBooks() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.books.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.books.length / this.perPage);
        }
    },
    methods: {
        setPage(page) {
            this.currentPage = page;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
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
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination button {
    margin: 0 5px;
}

@media (max-width: 768px) {
    .boutons {
        align-items: flex-end;
    }

    .card-text {
        text-align: center;
    }
}
</style>