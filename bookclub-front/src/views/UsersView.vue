<template>
    <div class="users-view">
        <ManageUsers ref="manageUsers" :users="users" :genres="genres" @user-added="addUserToList"
            @user-deleted="removeUserFromList" />
    </div>
</template>

<script>
import ManageUsers from '@/components/ManageUsers.vue';

export default {
    components: {
        ManageUsers
    },
    data() {
        return {
            users: [],
            genres: [],
            isLoading: true
        };
    },
    created() {
        this.fetchUsers();
        this.fetchGenres();
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
        addUserToList(newUser) {
            this.users.push(newUser);
            this.$refs.manageUsers.setPage(1);


        },
        removeUserFromList(userId) {
            this.users = this.users.filter(user => user._id !== userId);
            this.$refs.manageUsers.setPage(1);

        }
    }
};
</script>

<style scoped>
.users-view {
    width: 100%;
    min-height: 110vh;
    background-color: #a3454b9a;
    overflow-y: hidden;
    padding: 20px;
}
</style>