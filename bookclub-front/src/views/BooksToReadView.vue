<template>
    <div class="bookstoread-view">
        <BookList :books="books"></BookList>
    </div>
</template>

<script>
import BookList from '@/components/BookList.vue';

export default {
    name: "BooksToReadView",
    components: {
        BookList
    },
    data() {
        return {
            books: []
        };
    },
    created() {
        this.getBooksToRead();
    },
    methods: {
        async getBooksToRead() {
            try {
                const status = "À lire";
                const response = await fetch(`https://bookclub-api.vercel.app/api/books?status=${status}`);
                const data = await response.json();
                this.books = data.books;
                console.log('Livres à lire:', this.books);
            } catch (error) {
                console.error('Erreur lors de la récupération des livres à lire:', error);
            }
        }
    }
};
</script>

<style scoped>
.bookstoread-view {
    width: 100%;
    min-height: 100vh;
    height: auto;
    background-color: #a3454b9a;
    padding: 20px;
}
</style>