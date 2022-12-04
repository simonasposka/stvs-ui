<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-3" v-if="(!isLoading && article != null)">
                <img :src="article.thumbnail" class="img-fluid">
                <h3>{{article.title}}</h3>
                <p>{{article.text}}</p>
                <hr>
                <p class="text-center">
                    <router-link :to="{ path: `/dashboard/articles/${article.id}/edit` }">edit</router-link> | 
                    <span style="color: red" class="cursor-pointer" @click="deleteArticle(article.id)">delete</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    name: 'articles-show',
    computed: {
      ...mapGetters({
        token: 'auth/token',
        articles: 'dashboard/articles' 
      }),
      id() {
        return parseInt(this.$route.params.id);
      },
      article() {
        if (this.articles == null) return null;
        return this.articles.filter(article => article.id === this.id)[0];
      }
    },
    data() {
      return {
        isLoading: false,
        deleteArticleId: null,
      }
    },
    async created() {
      if (this.articles == null) {
        this.isLoading = true;
        await this.$store.dispatch('dashboard/getArticles', this.token);
        this.isLoading = false;
      }
    },
    methods: {
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
        this.isLoading = true;
        await this.$store.dispatch('dashboard/deleteArticle', { id: articleId, token: this.token });
        await this.$router.push({ path: '/dashboard/' });
        this.isLoading = false;
      }
    },
  }
</script>