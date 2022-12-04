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
                    <li class="nav-item">
                        <small class="nav-link">{{ name }}</small>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{ path: '/dashboard/' }" class="nav-link">Articles</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{ path: '/dashboard/teams' }" class="nav-link">Teams</router-link>
                    </li>

                    <li v-if="isAdmin" class="nav-item">
                        <router-link :to="{ path: '/dashboard/admin' }" class="nav-link">Admin</router-link>
                    </li>

                    <li v-if="authenticated" class="nav-item">
                        <span v-if="authenticated" @click="onLogout" class="nav-link cursor-pointer">logout</span>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    props: ['authenticated', 'isAdmin', 'name'],
    methods: {        
        onLogout() {
            this.$emit('onLogout');
        }
    }
}
</script>