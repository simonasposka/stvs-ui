<template>
    <div>
        <Navbar @onLogout="logout()" :authenticated="false" />
        <p v-if="loading" class="text-center">loading...</p>
        <p v-if="error" style="color: red;">{{ error }}</p>
        <div v-if="articles != null" class="w-100" style="padding-top: 35px">
          <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Home/Navbar';

import { mapGetters } from 'vuex';

export default {
  name: 'home-wrapper',
  components: { Navbar },
  data() {
    return {
      loading: false,
      error: false,
    }
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('articles/getPublicArticles');
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      articles: 'articles/articles',
    })
  },

  methods: {
    async logout() {
      this.loading = true;

      try {
        await this.$store.dispatch('logout');
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
