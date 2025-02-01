<template>
    <nav class="navbar navbar-expand-lg " data-bs-theme="dark">
        <div class="container-fluid">
            <img src="../assets/logo_CLAI_2.png" alt="Logo" class="navbar-logo">
            <a class="navbar-brand d-block d-lg-none" href="#">
                Le Cercle des Amies Imaginaires
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" @click="closeNavbar">Accueil

                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/booksToRead" @click="closeNavbar">Livres à lire</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/booksInReading" @click="closeNavbar">Lectures en
                            cours</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Livres lus</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Paramètres</a>
                        <transition id="dropdown">
                            <div class="dropdown-menu">
                                <router-link class="dropdown-item" to="/users" @click="closeNavbar">Gérer les
                                    lecteurs</router-link>
                                <a class="dropdown-item" href="#">Ajouter un livre</a>
                                <a class="dropdown-item" href="#">Ajouter un genre littéraire</a>
                            </div>
                        </transition>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-sm-2" type="search" placeholder="Rechercher un livre"
                        aria-label="Search">
                    <button class="btn btn-info my-2 my-sm-0 w-50" type="submit">Accio livre</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "MyNavBar",
    data() {
        return {
        };
    },
    methods: {
        closeNavbar() {
            const navbarCollapse = document.getElementById('navbarColor01');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    }
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.5s;
}

.dropdown-enter,
.dropdown-leave-to {
    opacity: 0;
}

.navbar-logo {
    width: 40px;
    /* Ajustez cette valeur selon vos besoins */
    height: 40px;
    /* Ajustez cette valeur selon vos besoins */
    margin-right: 5px;
    /* Espace entre l'image et le texte */
}

.navbar {
    /* background-color: #7B8360; */
    background-color: #A54B50;
}

@media (max-width: 768px) {}
</style>