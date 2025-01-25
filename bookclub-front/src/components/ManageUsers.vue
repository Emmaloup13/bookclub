<template>
    <div>
        <h3 class="text-center mt-4 mb-4">Gérer les lecteurs</h3>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Photo de profil</th>
                        <th>Nom</th>
                        <th>Genres</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in paginatedUsers" :key="user._id">
                        <td><img :src="user.imageUrl" alt="Photo de profil" class="profile-image"></td>
                        <td>{{ user.username }}</td>
                        <td>
                            <span class="badge bg-primary me-2" v-for="genre in user.genres" :key="genre">{{genre.title}}</span>
                        </td>
                        <td>
                            <router-link :to="{ name: 'EditUser', params: { id: user._id }}" class="me-2">Modifier</router-link>
                            <a href="#"  @click.prevent="confirmDelete(user._id)">Supprimer</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div v-if="showModal" class="modal">
            <div  class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="showModal = false">Non</button>
                        <button type="button" class="btn btn-primary" @click="deleteUser(confirmedUserId)">Oui</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <button class="btn btn-primary" @click="prevPage" :disabled="currentPage === 1">Précédent</button>
            <span>Page {{ currentPage }} sur {{ totalPages }}</span>
            <button class="btn btn-primary" @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
        </div>
        <form @submit.prevent="addUser" class="form">
            <h3 class="text-center">Ajouter un lecteur</h3>
            <div class="form-group">
                <label class="form-label mt-4" for="username">Nom du lecteur</label>
                <input type="text" class="form-control" id="username" v-model="newUser.username" @blur="checkUsername" required>
                <div v-if="usernameExists" class="alert alert-warning mt-2">
                    Ce nom d'utilisateur existe déjà. Veillez en choisir un autre.
                </div>
            </div>
            <div class="form-group">
                <label class="form-label mt-4" for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="newUser.email" required>
            </div>
            <div class="form-group">
                <label class="form-label mt-4" for="genres">Genres littéraires préférés</label>
                <select class="form-control" id="genres" v-model="newUser.genres" multiple>
                    <option v-for="genre in genres" :key="genre._id" :value="genre._id">{{ genre.title }}</option>
                </select>
            </div>
            <div>
                <label for="formFile" class="form-label mt-4">Photo de profil</label>
                <input class="form-control" type="file" id="formFile" @change="onFileChange" ref="fileInput">
            </div>
            <button type="submit" class="btn btn-primary mt-4">Ajouter</button>
        </form>
        
    </div>
</template>

<script>


export default {
    name: 'ManageUsers',
    props: {
        users: {
            type: Array,
            required: true
        },
        genres: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            newUser: {
                imageUrl: '',
                username: '',
                password: 'xxxxxx',
                email: '',
                genres: []
            },
            currentPage: 1,
            perPage: 5,
            showModal: false,
            confirmedUserId: null,
            usernameExists: false
        };
    },
    computed: {
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.users.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.users.length / this.perPage);
        }
    },
    methods: {
        async checkUsername() {
            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/users?username=${this.newUser.username}`);
                const data = await response.json();
                this.usernameExists = data.exists;
            } catch (error) {
                console.error('Erreur lors de la vérification du nom d\'utilisateur:', error);
            }
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newUser.imageUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        async addUser() {
            try {
                const response = await fetch('https://bookclub-api.vercel.app/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newUser)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const newUser = await response.json();
                this.$emit('user-added', newUser.user);
                console.log(this.paginatedUsers);
                this.resetForm();
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            }
        },
        confirmDelete(userId) {
            this.showModal = true;
            this.confirmedUserId = userId;
        },
        async deleteUser(userId) {
            this.showModal = false;
            try {
                const response = await fetch(`https://bookclub-api.vercel.app/api/users?userId=${userId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.$emit('user-deleted', userId);
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            }
        },
        resetForm() {
            this.newUser = {
                imageUrl: '',
                username: '',
                password: 'xxxxxx',
                email: '',
                genres: []
            };
            this.$refs.fileInput.value = null;
        },
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
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    background-color: #f2f2f2;
    

}



.table, .form {
    margin: 0 auto;
    width: 80%;
    
}

.form {
    margin-top: 4%;
}

a {
    text-decoration: underline;
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