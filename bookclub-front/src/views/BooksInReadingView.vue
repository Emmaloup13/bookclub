<template>
    <div class="bookstoread-view">
        <BookList :title="title" :books="books" :boutons="boutons" @a-lire="addToToRead" @lu="addToRead"></BookList>
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
            books: [],
            boutons: [{ title: "À lire", action: "a-lire" }, { title: "Lu", action: "lu" }],
            title: "Lectures en cours"
        };
    },
    created() {
        this.getBooksInReading();
    },
    methods: {
        async getBooksInReading() {
            try {
                const status = "En cours";
                const response = await fetch(`https://bookclub-api.vercel.app/api/books?status=${status}`);
                const data = await response.json();
                this.books = data.books;
            } catch (error) {
                console.error('Erreur lors de la récupération des livres en cours:', error);
            }
        },
        async addToToRead(bookIdToAdd) {
            try {
                //get statusId of "En cours"
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
                this.getBooksToRead();
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut du livre:', error);
            }
        },
        async addToRead(bookIdToAdd) {
            //get statusId of "En cours"
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
                this.getBooksToRead();
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut du livre:', error);
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