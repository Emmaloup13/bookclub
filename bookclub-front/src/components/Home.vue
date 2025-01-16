<template>
<div class="container mt-5">
    <div class="row">
      <div class="col-md-4">
        <h2 class="text-center">Présentation du Club</h2>
        <p>Bienvenue au club de lecture. Nous nous réunissons chaque semaine pour discuter de nos lectures préférées.</p>
      </div>
      <div class="col-md-4">
        <CurrentBook :currentBook="currentBook" />
      </div>
      <div class="col-md-4 text-center">
        <h2 >Résumé et Caractéristiques</h2>
        <p><strong>Auteur(e):</strong> {{ currentBook ? currentBook.author : '' }}</p>
        <p><strong>Genre :</strong> {{ currentBook ? currentBook.genre['title'] : '' }}</p>
        <p><strong>Nombre de pages :</strong> {{ currentBook ? currentBook.pages : ''}}</p>
        <p><strong>Résumé :</strong> {{ currentBook ? currentBook.summary : '' }}</p>
        <label for="bookSelector">Changer de livre : </label>
        <select id="bookSelector" v-model="selectedBook" @change="changeBook">
          <option v-for="book in books" :key="book._id" :value="book._id">{{ book.title }}</option>
        </select>
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
            currentBook: null
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

#bookSelector {
  margin: 10px;
}

</style>