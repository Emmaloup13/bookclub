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
                            <div class="row">
                                <p class="mb-1 ms-1 text-bold">{{ book.author }}</p>
                                <p class="ms-1 text-bold">{{ book.pages }} pages</p>
                            </div>
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
                        <div class="col-12 col-md-4 d-flex justify-content-center secondButton">
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
                        <div class="col-12 col-md-4 d-flex justify-content-center secondButton">
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
                        <div class="col-12 col-md-4 d-flex justify-content-center secondButton">
                            <button class="btn btn-primary" @click="this.addToReading(book._id)">
                                {{ this.boutons["En cours"].title }} <i
                                    :class="this.boutons['En cours'].icon"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="container my-2 py-2">
                    <div class="row d-flex justify-content-center">
                        <!-- <div class="col-md-12 col-lg-10 col-xl-8"> -->
                        <div class="card border-dark mb-md-3">
                            <div class="card-footer py-3 border-0">
                                <div class="d-flex flex-start w-100">
                                    <div data-mdb-input-init class="form-outline w-100">
                                        <label class="form-label mt-2" for="commentArea">Sors ta plus belle Plume à
                                            Papote !</label>
                                        <textarea class="form-control" id="commentArea" rows="5"
                                            style="background: #fff;"
                                            @input="updateFutureCommentValue($event.target.value)"></textarea>

                                        <label class="form-label mt-2" for="authorChoice">Qui bavarde ? (Ne laisse
                                            pas Rita écrire des sornettes)</label>
                                        <select class="form-select" id="authorChoice"
                                            @change="onselectionchange($event)">
                                            <option value="0">Rita Skeeter</option>
                                            <option v-for="author in authors" :key="author._id" :value="author._id">
                                                {{ author.username }}
                                            </option>
                                        </select>

                                    </div>
                                </div>
                                <div class="float-end mt-2 pt-1">
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                                        class="btn btn-primary btn-sm me-1" @click="postComment">Poster
                                        le
                                        commentaire</button>
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                                        class="btn btn-outline-primary btn-sm secondButton"
                                        @click="eraseTextArea">Supprimer le
                                        texte</button>
                                </div>
                            </div>
                            <!-- Comments -->
                            <div v-for="comment in bookComments" :key="comment._id" class="card-body">
                                <div class="row">
                                    <div class="col-10 d-flex flex-start align-items-center">
                                        <img class="rounded-circle shadow-1-strong me-3" :src="comment.author.imageUrl"
                                    alt="avatar" width="60" height="60" />
                                    <div>
                                        <h6 class="fw-bold text-primary mb-1">{{ comment.author.username }}</h6>
                                        <p class="text-muted small mb-0">
                                            {{
                                                new Date(comment.createdAt).toLocaleString()
                                            }}
                                        </p>
                                    </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="d-flex justify-content-end">
                                            <button @click="editComment(comment._id)" class="btn btn-danger btn-sm me-2" id="editCommentButton">
                                                <i :class="isEditing[comment._id] ? 'fa-solid fa-xmark fa-lg' : 'fa-solid fa-pencil'"></i>
                                            </button>
                                            <button @click="deleteComment(comment._id)" class="btn btn-primary btn-sm">
                                                <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-3 mb-4 pb-2">
                                    <p :hidden="this.editCommentMode">
                                        {{ comment.text }}
                                    </p>
                                    <div :hidden="!this.editCommentMode">
                                        <textarea class="form-control" id="updateCommentArea" rows="4"
                                            style="background: #fff;"
                                            @input="updateOldCommentValue($event.target.value)">{{ comment.text }}</textarea>
                                    
                                        <div class="float-end mt-2 pt-1">
                                            <button type="button" id="updateCommentButton" data-mdb-button-init data-mdb-ripple-init
                                                class="btn btn-danger btn-sm me-1" @click="updateComment(comment._id)" :disabled="this.oldCommentIsTheSame">
                                                <div v-if="isEditingLoading" class="d-flex justify-content-center align-items-center">
                                                    <div class="spinner-border spinner-border-sm text-light" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    Modifier le commentaire
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <!-- </div> -->
                    </div>
                </div>
            </section>
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
            bookStatus: "",
            bookComments: [],
            futureComment: "",
            authors: [],
            selectedAuthor: "",
            editCommentMode: false,
            oldComment: "",
            oldCommentIsTheSame: true,
            commentToUpdate: "",
            isEditing: {},
            isEditingLoading: false
        };
    },
    mounted() {
        this.getBookById();
        this.getAuthors();

    },
    watch: {
        boutons() {
            this.boutonsLoaded = true;
        }
    },
    computed: {

    },
    methods: {
        async getAuthors() {
            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/users`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const resp = await response.json();
                this.authors = resp;
            } catch (error) {
                console.error('Erreur lors de la récupération des auteurs:', error);
            }
        },
        async getBookById() {
            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/books/${this.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const resp = await response.json();
                this.book = resp.book;
                this.bookStatus = this.book.status.title;
                this.bookComments = this.book.comments.reverse();
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
        updateFutureCommentValue(value) {
            this.futureComment = value;
        },
        updateOldCommentValue(value) {
            if (this.commentToUpdate == value) {
                this.oldCommentIsTheSame = true;
            } else {
                this.oldCommentIsTheSame = false;
            }
            this.oldComment = value;
        },
        onselectionchange(event) {
            this.selectedAuthor = event.target.value;
        },
        async postComment() {
            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: this.futureComment, author: { _id: this.selectedAuthor }, book: { _id: this.book._id } })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                else {
                    this.getBookById();
                    this.eraseTextArea();
                }
            } catch (error) {
                console.error('Erreur lors du post du commentaire:', error);
            }
        },
        eraseTextArea() {
            document.getElementById("commentArea").value = "";
        },
        async deleteComment(commentId) {
            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/comments?commentId=${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    this.getBookById();
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du commentaire:', error);
            }
        },
        async editComment(commentId){
            this.editCommentMode = !this.editCommentMode;
            this.isEditing[commentId] = !this.isEditing[commentId];
            const button = document.getElementById("editCommentButton");
            button.classList.toggle("btn-danger");
            button.classList.toggle("btn-info");

            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/comments/${commentId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const comment = await response.json();
                    this.commentToUpdate = comment.comment.text;
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du commentaire à éditer:', error);
            }
        },
        async updateComment(commentId){
            this.isEditingLoading = true;
            const button = document.getElementById("editCommentButton");
            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/comments`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ commentId: commentId, newText: this.oldComment })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    this.getBookById();
                    setTimeout(async () => {
                        this.editCommentMode = !this.editCommentMode;
                        this.isEditing[commentId] = !this.isEditing[commentId];
                        button.classList.toggle("btn-info");
                        button.classList.toggle("btn-danger");
                        this.oldCommentIsTheSame = true;
                        const comment = await response.json();
                        if(comment){
                            this.isEditingLoading = false;
                        }
                    }, 3000);
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour du commentaire:', error);
            }
        }
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

#authorChoice {
    width: 25%;
}

@media (max-width: 768px) {
    .book-image {
        width: 50%;
        height: auto;
    }

    .secondButton {
        margin-top: 1%;
    }

    #authorChoice {
        width: 75%;
    }

}
</style>