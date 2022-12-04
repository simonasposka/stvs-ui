<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{ path: '/' }">
                <img src="/logo.svg" alt="logo" style="height: 15px;">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li v-if="!authenticated" class="nav-item">
                        <router-link :to="{ path: '/auth/register' }" class="nav-link">Register</router-link>
                    </li>
                    <li v-if="!authenticated" class="nav-item">
                        <router-link :to="{ path: '/auth/login' }" class="nav-link">Login</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    props: ['authenticated'],
    methods: {        
        onLogout() {
            this.$emit('onLogout');
        }
    }
}
</script>