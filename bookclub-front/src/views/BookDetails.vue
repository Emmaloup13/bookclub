<template>
    <div class="bookdetails-view">
        <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <button type="button" class="btn btn-info" @click="goBack">Retour</button>
            <h3 class="text-center mb-4 pt-4">{{ book.title }}</h3>
            <div class="card border-dark mb-md-3">
                <div class="card-body">
                    <div class="row g-0 align-items-start">
                        <div class="col-12 col-md-3 d-flex justify-content-center">
                            <img :src="book.imageUrl" alt="Book cover" class="book-image" />
                        </div>
                        <div class="col-12 col-md-3 d-flex flex-column card-text mt-2">
                            <p class="mb-1 ms-1 text-bold">{{ book.author }}</p>
                            <p class="ms-1 text-bold">{{ book.pages }} pages</p>
                        </div>
                        <div class="col-12 col-md-6">
                            <h5 class="card-title text-center">Résumé du livre</h5>
                            <p class="card-text">{{ book.summary }}</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row g-0 align-items-start" v-if="this.bookStatus == 'À lire'">
                        <div class="col-12 col-md-4 d-flex justify-content-center">
                            <p class="mb-1 ms-1">Statut du livre : {{ this.bookStatus }}</p>
                        </div>
                        <div class="col-12 col-md-4 d-flex justify-content-center">
                            <button class="btn btn-primary" @click="this.addToReading(book._id)">{{
                                this.boutons["En cours"].title }} <i
                                    :class="this.boutons['En cours'].icon"></i></button>
                        </div>
                        <div class="col-12 col-md-4 d-flex justify-content-center">
                            <button class="btn btn-primary" @click="this.addToRead(book._id)">
                                {{ this.boutons["Lu"].title }} <i :class="this.boutons['Lu'].icon"></i></button>
                        </div>
                    </div>

                    <div class="row g-0 align-items-start" v-else-if="this.bookStatus == 'En cours'">
                        <div class="col-12 col-md-4 d-flex justify-content-center">
                            <p class="mb-1 ms-1">Statut du livre : {{ this.bookStatus }}</p>
                        </div>
                        <div class="col-12 col-md-4 d-flex justify-content-center">
                            <button class="btn btn-primary" @click="this.addToToRead(book._id)">
                                {{ this.boutons["À lire"].title }} <i :class="this.boutons['À lire'].icon"></i></button>
                        </div>
                        <div class="col-12 col-md-4 d-flex justify-content-center">
                            <button class="btn btn-primary" @click="this.addToRead(book._id)">{{
                                this.boutons["Lu"].title }} <i :class="this.boutons['Lu'].icon"></i></button>
                        </div>
                    </div>

                    <div class="row g-0 align-items-start" v-else-if="this.bookStatus == 'Lu'">
                        <div class="col-12 col-md-4 d-flex justify-content-center">
                            <p class="mb-1 ms-1">Statut du livre : {{ this.bookStatus }}</p>
                        </div>
                        <div class="col-12 col-md-4 d-flex justify-content-center">
                            <button class="btn btn-primary" @click="this.addToToRead(book._id)">
                                {{ this.boutons["À lire"].title }} <i :class="this.boutons['À lire'].icon"></i></button>
                        </div>
                        <div class="col-12 col-md-4 d-flex justify-content-center">
                            <button class="btn btn-primary" @click="this.addToReading(book._id)">
                                {{ this.boutons["En cours"].title }} <i
                                    :class="this.boutons['En cours'].icon"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import boutons from "../constants.js"

export default {
    name: "BookDetails",
    props: {
        id: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            book: {},
            isLoading: true,
            boutons: boutons,
            bookStatus: ""
        };
    },
    mounted() {
        this.getBookById();

    },
    watch: {
        boutons() {
            this.boutonsLoaded = true;
        }
    },
    computed: {
    },
    methods: {
        async getBookById() {
            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/books/${this.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const resp = await response.json();
                this.book = resp.book;
                this.bookStatus = this.book.status.title
                this.isLoading = false;
            } catch (error) {
                console.error('Erreur lors de la récupération du livre:', error);
            }
        },
        goBack() {
            this.$router.go(-1); // Retourne à la page précédente
        },
        async addToReading(bookIdToAdd) {
            try {
                //get statusId of "En cours"
                const responseStatus = await fetch(`https://bookclub-api.vercel.app/api/statuses?status=En cours`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const dataStatus = await responseStatus.json();
                const statusId = dataStatus.statusObj._id;
                const response = await fetch(`https://bookclub-api.vercel.app/api/books`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bookId: bookIdToAdd, newStatus: statusId })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                else {
                    this.bookStatus = dataStatus.statusObj.title;
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut du livre:', error);
            }
        },
        async addToRead(bookIdToAdd) {
            //get statusId of "Lu"
            const responseStatus = await fetch(`https://bookclub-api.vercel.app/api/statuses?status=Lu`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const dataStatus = await responseStatus.json();
            const statusId = dataStatus.statusObj._id;
            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/books`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bookId: bookIdToAdd, newStatus: statusId })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                else {
                    this.bookStatus = dataStatus.statusObj.title;
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut du livre:', error);
            }
        },
        async addToToRead(bookIdToAdd) {
            try {
                //get statusId of "A lire"
                const responseStatus = await fetch(`https://bookclub-api.vercel.app/api/statuses?status=À lire`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const dataStatus = await responseStatus.json();
                const statusId = dataStatus.statusObj._id;
                const response = await fetch(`https://bookclub-api.vercel.app/api/books`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bookId: bookIdToAdd, newStatus: statusId })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                else {
                    this.bookStatus = dataStatus.statusObj.title;
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut du livre:', error);
            }
        },
    }
}
</script>

<style scoped>
.bookdetails-view {
    width: 100%;
    min-height: 100vh;
    height: auto;
    background-color: #a3454b9a;
    padding: 20px;
}

.book-image {
    width: 100%;
    height: auto;
}

.card-text {
    text-align: center;
}

col {
    height: 100%;
}

.text-bold {
    font-weight: bold;
}

.spinner-border {
    animation-duration: 2s;
}

@media (max-width: 768px) {
    .book-image {
        width: 50%;
        height: auto;
    }
}
</style>