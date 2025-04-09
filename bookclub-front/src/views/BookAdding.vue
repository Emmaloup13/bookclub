<template>
    <div class="book-adding-view">
        <ManageBooks :users="users" :genres="genres" :statuses="statuses" />
    </div>
    <!-- @user-added="addUserToList"
            @user-deleted="removeUserFromList" @edit-user="editUser"  -->
</template>

<script>
import ManageBooks from '@/components/ManageBooks.vue';

export default {
    components: {
        ManageBooks
    },
    data() {
        return {
            users: [

            ],
            genres: [],
            statuses: [],
            isLoading: true,
            isEditing: false,
            editingUserId: null
        };
    },
    created() {
        this.fetchUsers();
        this.fetchGenres();
        this.fetchStatuses();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await fetch('https://bookclub-api.vercel.app/api/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.users = await response.json();
            } catch (error) {
                console.error('Erreur lors de la récupération des users:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchGenres() {
            try {
                const response = await fetch('https://bookclub-api.vercel.app/api/genres');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.genres = await response.json();
            } catch (error) {
                console.error('Erreur lors de la récupération des genres:', error);
            }
        },
        async fetchStatuses() {
            try {
                const response = await fetch('https://bookclub-api.vercel.app/api/statuses');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.statuses = await response.json();
            } catch (error) {
                console.error('Erreur lors de la récupération des statuts:', error);
            }
        },
        // addUserToList(newUser) {
        //     this.users.push(newUser);
        //     this.$refs.manageUsers.setPage(1);


        // },
        // removeUserFromList(userId) {
        //     this.users = this.users.filter(user => user._id !== userId);
        //     this.$refs.manageUsers.setPage(1);

        // },
        // editUser(userId) {
        //     this.isEditing = true;
        //     this.editingUserId = userId;
        // },
        // updateUserInList(updatedUser) {
        //     const index = this.users.findIndex(user => user._id === updatedUser._id);
        //     if (index !== -1) {
        //         this.users.splice(index, 1, updatedUser);
        //     }
        //     this.isEditing = false;
        //     this.editingUserId = null;
        // },
        // cancelEdit() {
        //     this.isEditing = false;
        //     this.editingUserId = null;
        // },
    }
};
</script>

<style scoped>
.book-adding-view{
    width: 100%;
    min-height: 110vh;
    background-color: #a3454b9a;
    overflow-y: hidden;
    padding: 20px;
}
</style>