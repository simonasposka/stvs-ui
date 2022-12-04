<template>
    <div>
        <Navbar @onLogout="logout()" :authenticated="authenticated" :is-admin="user.is_admin" :name="user.name" v-if="(user != null)"/>
        <p v-if="loading" class="text-center">loading...</p>
        <div class="container">
          <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Dashboard/Navbar';

import { mapGetters } from 'vuex';

export default {
  name: 'dashboard-wrapper',
  components: { Navbar },
  data() {
    return {
      loading: false,
      error: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      authenticated: 'auth/authenticated',
    })
  },

  methods: {
    async logout() {
      this.loading = true;

      try {
        await this.$store.dispatch('auth/logout');
        await this.$router.push({ name: 'login' })
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
