<template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Le cercle de lecture des amies imaginaires</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Accueil

                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Livres à lire</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Lectures en cours</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Livres lus</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Paramètres</a>
                        <transition id="dropdown">
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Ajouter/modifier un lecteur</a>
                                <a class="dropdown-item" href="#">Ajouter/modifier un livre</a>
                                <a class="dropdown-item" href="#">Ajouter un genre littéraire</a>
                            </div>
                        </transition>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-sm-2" type="search" placeholder="Rechecher un livre"
                        aria-label="Search">
                    <button class="btn btn-secondary my-2 my-sm-0 w-50" type="submit">Accio livre</button>
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

    }
};
</script>

<style>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.5s;
}

.dropdown-enter,
.dropdown-leave-to {
    opacity: 0;
}
</style>