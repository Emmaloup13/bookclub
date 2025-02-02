<template>
  <div class="edit-view">
    <h3 class="text-center mt-4">Éditer l'utilisateur</h3>
    <form @submit.prevent="updateUser" class="form">
      <div class="form-group">
        <label class="form-label mt-4" for="username">Nom du lecteur</label>
        <input type="text" class="form-control" id="username" v-model="updatedUser.username" required>
      </div>
      <div class="form-group">
        <label class="form-label mt-4" for="genres">Genres littéraires préférés</label>
        <select class="form-control" id="genres" v-model="updatedUser.genres" multiple>
          <option v-for="genre in genres" :key="genre._id" :value="genre._id">{{ genre.title }}</option>
        </select>
      </div>
      <div>
        <label for="formFile" class="form-label mt-4">Photo de profil</label>
        <input class="form-control" type="file" id="formFile" @change="onFileChange">
      </div>
      <button type="button" class="btn btn-info mt-4" @click="this.$emit('cancel-edit')">Retour</button>
      <button type="submit" class="btn btn-primary mt-4 ms-2">Enregistrer</button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'EditUser',
  props: {
    id: {
      type: String,
      required: true
    },
    genres: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      updatedUser: {
        genres: [],
      }
    };
  },
  created() {
    this.getUserById();
  },
  methods: {
    async getUserById() {
      try {
        const response = await fetch(`https://bookclub-api.vercel.app/api/users/${this.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const resp = await response.json();
        this.updatedUser = resp.user;
        this.updatedUser.genres = resp.user.genres.map(genre => genre._id);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateUser() {
      try {
        const userToUpdate = {
          userId: this.updatedUser._id,
          newUsername: this.updatedUser.username,
          newGenres: this.updatedUser.genres,
          newImageUrl: this.updatedUser.imageUrl
        };
        const response = await fetch('https://bookclub-api.vercel.app/api/users', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userToUpdate)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedUserToPass = await response.json();
        this.$emit('user-updated', updatedUserToPass.user);

      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    }
    ,
    submitForm() {
      // Logique pour soumettre le formulaire
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.updatedUser.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>

<style scoped>
div {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input,
select {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
}

button {
  padding: 0.5em 1em;
}

.form {
  margin: 0 auto;
  width: 80%;
}
</style>