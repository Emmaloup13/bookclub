<template>
    <div class="users-view">
        <ManageUsers v-if="!isEditing" ref="manageUsers" :users="users" :genres="genres" @user-added="addUserToList"
            @user-deleted="removeUserFromList" @edit-user="editUser" />
        <EditUser v-if="isEditing" :id="editingUserId" :genres="genres" @user-updated="updateUserInList"
            @cancel-edit="cancelEdit" />
    </div>
</template>

<script>
import EditUser from '@/components/EditUser.vue';
import ManageUsers from '@/components/ManageUsers.vue';

export default {
    components: {
        ManageUsers,
        EditUser
    },
    data() {
        return {
            users: [

            ],
            genres: [],
            isLoading: true,
            isEditing: false,
            editingUserId: null
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

        },
        editUser(userId) {
            this.isEditing = true;
            this.editingUserId = userId;
        },
        updateUserInList(updatedUser) {
            const index = this.users.findIndex(user => user._id === updatedUser._id);
            if (index !== -1) {
                this.users.splice(index, 1, updatedUser);
            }
            this.isEditing = false;
            this.editingUserId = null;
        },
        cancelEdit() {
            this.isEditing = false;
            this.editingUserId = null;
        },
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