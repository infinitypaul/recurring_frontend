<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">ACE</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link
                  to="/"
                  v-slot="{ href, route, navigate, isActive }"
                >
                    <li
                      class="nav-item"
                      :class="[isActive && 'active']"
                    >
                        <a :href="href" class="nav-link" @click="navigate">Home <span class="sr-only">(current)</span></a>
                    </li>
                </router-link>

                <router-link
                  to="/about"
                  v-slot="{ href, route, navigate, isActive }"
                >
                    <li
                      class="nav-item"
                      :class="[isActive && 'active']"
                    >
                        <a :href="href" class="nav-link" @click="navigate">About</a>
                    </li>
                </router-link>


            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <template v-if="authenticated">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Welcome {{ user.firstName}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Dashboard</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" @click.prevent="signOutNow">Logout</a>
                    </div>
                </li>
            </ul>
            </template>
        </div>
    </nav>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Header",
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            })
        },
        methods:{
            ...mapActions({
                signOut: 'auth/logOut'
            }),

            signOutNow () {
                this.signOut().then(() => {
                    this.$router.replace({
                        name: 'Home'
                    })
                })
            }
        }
    }
</script>

<style scoped>
    nav {
        padding: 20px;
        margin-bottom: 20px;
    }
</style>