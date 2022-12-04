<template>
  <div>
    <h1 class="mt-5 mb-0">Articles</h1>
    <button class="btn btn-primary btn-sm my-3" @click="createNewArticle()">Create New</button>
    
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col">Snippet</th>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>
            <router-link :to="{ path: `/dashboard/articles/${article.id}` }" class="nav-link">
              {{ article.id }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/articles/${article.id}` }" class="nav-link">
              {{ article.title }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/articles/${article.id}` }" class="nav-link">
              {{ article.text.substring(0, 70) + "..." }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/articles/${article.id}` }" class="nav-link">
              {{ formatDate(article.created_at) }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/articles/${article.id}/edit` }">edit</router-link>
             | <span style="color: red" class="cursor-pointer" @click="deleteArticle(article.id)">delete</span></td>
        </tr>
      </tbody>
    </table>

    <p v-if="loading">loading...</p>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex'

export default {
  name: 'articles-index',
  computed: {
    ...mapGetters({
      token: 'auth/token',
      articles: 'dashboard/articles',
    })
  },
  data() {
    return {
      loading: false,
      error: false,
      deleteArticleId: null,
    }
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('dashboard/getArticles', this.token);
    this.loading = false;
  },
  methods: {
    async createNewArticle() {
      await this.$router.push({ path: '/dashboard/articles/create' })
    },
    formatDate(datetime) {
      return moment(datetime).format('h:mm a, MMM. D, YYYY');
    },
    deleteArticle(articleId) {
      this.deleteArticleId = articleId;
      
      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: 'Action cannot be undone',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.deleteArticleId = null;
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Confirm',
            handler: () => {
              this.confirmDelete(articleId)
              this.$modal.hide('dialog')
            }
          },
        ]
      });
    },
    async confirmDelete(articleId) {
      this.loading = true;
      await this.$store.dispatch('dashboard/deleteArticle', { id: articleId, token: this.token });
      await this.$store.dispatch('dashboard/getArticles', this.token);
      this.loading = false;
    }
  }
//   components: { WButton, NewslettersCarousel, TestimonialsCarousel, WFooter },
}
</script>