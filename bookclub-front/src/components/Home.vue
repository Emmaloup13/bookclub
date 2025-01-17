<template>
<div class="container mt-5">
    <div v-if="isLoading" class="loading">
      <p>Assemblage de neurones en cours...</p>
    </div>
    <div v-else class="row">
      <div class="col-md-4 colonne_gauche">
        <h2 class="text-center">Présentation du Club</h2>
        <p id="presentation_text">Bienvenue sur le site du club de lecture "Le Cercle de Lecture des Amies Imaginaires". Il est composé de membres fabuleuses, dont l'écrivaine très connue Nina Fleur (Delacour) et Hei Heimma, une lectrice qui n'a pas froid aux yeux. Vous pourrez trouver sur cette application une liste exhaustive de toutes leurs lectures, de la fantasy (fantasie aussi) aux enquêtes. </p>
        
      </div>
      <div class="col-md-4 ">
        <CurrentBook :currentBook="currentBook" />
      </div>
      <div class="col-md-4 text-center colonne_droite">
        <h2 >Résumé et Caractéristiques</h2>
        <label for="bookSelector"><strong>Changer de livre :</strong></label>
        <select id="bookSelector" v-model="selectedBook" @change="changeBook">
          <option v-for="book in books" :key="book._id" :value="book._id">{{ book.title }}</option>
        </select>
        <p><strong>Auteur(e):</strong> {{ currentBook ? currentBook.author : '' }}</p>
        <p><strong>Genre :</strong> {{ currentBook ? currentBook.genre['title'] : '' }}</p>
        <p><strong>Nombre de pages :</strong> {{ currentBook ? currentBook.pages : ''}}</p>
        <p><strong>Résumé :</strong> {{ currentBook ? currentBook.summary : '' }}</p>
        
      </div>
    </div>
  </div>
</template>

<script>
import CurrentBook from './CurrentBook.vue';


export default {
    name: "MyHome",
    components: {
        CurrentBook
    },
    data() {
        return {
            selectedBook: null,
            books: [
                
            ],
            currentBook: null,
            isLoading: true
        }
    },
    computed: {
        
    },
    methods: {
      async getBooks() {
            try {
                const response = await fetch('https://bookclub-api.vercel.app/api/books');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.books = await response.json();
                if (this.books.length > 0) {
                    this.selectedBook = this.books[0]._id;
                    this.changeBook();
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des livres:', error);
            } finally {
                this.isLoading = false;
            }
        },
        changeBook() {
            this.currentBook = this.books.find(book => book._id === this.selectedBook);
            }
        },
      mounted() {
          
          this.getBooks();
      
      }
    
}

</script>


<style scoped>

.container {
  background-color: rgba(255, 255, 255, 0.70);
  border-radius: 10px;
}

.loading {
  text-align: center;
  font-weight: bolder;
  font-size: 1.5em;
  margin-top: 50px;
}

#bookSelector {
  margin: 10px;
}

.colonne_gauche {
  padding-right: 5%;
}

.colonne_droite {
  padding-left: 5%;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

#presentation_text {
  text-align: justify;
  font-size: large;
}
</style>