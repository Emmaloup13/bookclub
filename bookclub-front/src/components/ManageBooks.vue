<template>
    <div>
        <form @submit.prevent="addBook" class="form">
            <h3 class="text-center">Ajouter un livre</h3>
            <div class="form-group">
                <label class="form-label mt-4" for="title">Titre du livre</label>
                <input type="text" class="form-control" id="title" v-model="newBook.title" @blur=""
                    required>
                <!-- <div v-if="usernameExists" class="alert alert-warning mt-2">
                    Ce nom d'utilisateur existe déjà. Veillez en choisir un autre.
                </div> -->
            </div>
            <div class="form-group">
                <label class="form-label mt-4" for="author">Auteur.ice</label>
                <input type="text" class="form-control" id="author" v-model="newBook.author" @blur=""
                    required>
                <!-- <div v-if="usernameExists" class="alert alert-warning mt-2">
                    Ce nom d'utilisateur existe déjà. Veillez en choisir un autre.
                </div> -->
            </div>
            <div class="form-group">
                <label class="form-label mt-4" for="nbPages">Nombre de pages</label>
                <div>
                    <label class="form-label small-label" for="summary">Approximativement bien sûr...</label>
                </div>
                <input type="number" class="form-control" id="nbPages" v-model="newBook.pages" min="1" required>
            </div>
            <div class="form-group">
                <label class="form-label mt-4" for="genre">Genre littéraire</label>
                <select class="form-control" id="genre" v-model="newBook.genre">
                    <option value="" disabled selected>Fantaisie :) ?</option>
                    <option v-for="genre in genres" :key="genre._id" :value="genre._id">{{ genre.title }}</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label mt-4" for="summary">Résumé du livre</label>
                <textarea type="text" class="form-control" id="summary" v-model="newBook.summary" rows="4" required></textarea>
            </div>
            <div>
                <label for="imageUrl" class="form-label mt-4">1ère de couverture</label>
                <input class="form-control" type="file" id="imageUrl" @change="onFileChange" ref="fileInput">
            </div>
            <div class="form-group">
                <label class="form-label mt-4" for="readers">Lectrices</label>
                <select class="form-control" id="readers" v-model="newBook.readers" multiple>
                    <option value="" disabled>Puisse le sort vous être favorable !</option>
                    <option v-for="reader in users" :key="reader._id" :value="reader._id">{{ reader.username }}</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label mt-4" for="status">Statut de lecture</label>
                <div>
                    <label class="form-label small-label" for="summary">Vite vite vite, il se passe un truc de fou à la page 28 !</label>
                </div>
                <select class="form-control" id="status" v-model="newBook.status">
                    <option value="" disabled selected>Let's go</option>
                    <option v-for="status in statuses" :key="status._id" :value="status._id">{{ status.title }}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary mt-4">Ajouter</button>
        </form>

    </div>
</template>

<script>


export default {
    name: 'ManageBooks',
    props: {
        users: {
            type: Array,
            required: true
        },
        genres: {
            type: Array,
            required: true
        },
        statuses: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            newBook: {
                status: '',
                imageUrl: '',
                title: '',
                readers: [],
                author: '',
                pages: 0,
                genre: '',
                summary: '',
                comments: []

            },
            currentPage: 1,
            perPage: 5,
            showModal: false,
            confirmedBookId: null,
            usernameExists: false
        };
    },
    computed: {
        // paginatedUsers() {
        //     const start = (this.currentPage - 1) * this.perPage;
        //     const end = start + this.perPage;
        //     return this.users.slice(start, end);
        // },
        // totalPages() {
        //     return this.users.length === 0 ? 0 : Math.ceil(this.users.length / this.perPage);
        // }
    },
    methods: {
        // async checkTitle() {
        //     try {
        //         const response = await fetch(`https://bookclub-api.vercel.app/api/users?username=${this.newBook.username}`);
        //         const data = await response.json();
        //         this.usernameExists = data.exists;
        //     } catch (error) {
        //         console.error('Erreur lors de la vérification du nom d\'utilisateur:', error);
        //     }
        // },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newBook.imageUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async addBook() {
            try {
                const response = await fetch('https://bookclub-api.vercel.app/api/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newBook)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const newBook = await response.json();
                this.$emit('book-added', newBook.book);
                this.resetForm();
            } catch (error) {
                console.error('Erreur lors de l\'ajout du livre:', error);
            }
        },
        // confirmDelete(userId) {
        //     this.showModal = true;
        //     this.confirmedUserId = userId;
        // },
        // async deleteUser(userId) {
        //     this.showModal = false;
        //     try {
        //         const response = await fetch(`https://bookclub-api.vercel.app/api/users?userId=${userId}`, {
        //             method: 'DELETE'
        //         });
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         this.$emit('user-deleted', userId);
        //     } catch (error) {
        //         console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        //     }
        // },
        resetForm() {
            this.newBook = {
                status: '',
                imageUrl: '',
                title: '',
                readers: [],
                author: '',
                pages: 0,
                genre: '',
                summary: '',
                comments: []
            };
            this.$refs.fileInput.value = null;
        },
        // setPage(page) {
        //     this.currentPage = page;
        // },
        // prevPage() {
        //     if (this.currentPage > 1) {
        //         this.currentPage--;
        //     }
        // },
        // nextPage() {
        //     if (this.currentPage < this.totalPages) {
        //         this.currentPage++;
        //     }
        // }
    }
};
</script>

<style scoped>
.small-label {
    font-size: 0.8rem;
    color: #343638;
}
table {
    width: 100%;
    border-collapse: collapse;

}

.table-bordered {
    border: 1px solid #dee2e6;
}

.rounded-table {
    border-radius: 10px;
    overflow: hidden;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    background-color: #f2f2f2;


}



.table,
.form {
    margin: 0 auto;
    width: 80%;

}

.form {
    margin-top: 4%;
}

.button-edit {
    padding: 1%;
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

.profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: white;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
</style>