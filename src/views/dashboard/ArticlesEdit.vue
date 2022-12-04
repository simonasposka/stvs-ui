<template>
    <div>
        <h1 class="mt-5">Edit Article</h1>
        
        <p v-if="isLoading">loading...</p>

        <div class="form-control mt-3" v-if="article != null">
            <div class="mb-3">
                <label class="form-label">Thumbnail URL:</label>
                <input type="text" class="form-control" v-model="article.thumbnail">
            </div>

            <div class="mb-3">
                <label class="form-label">Title:</label>
                <input type="text" class="form-control" v-model="article.title">
            </div>

            <div class="mb-3">
                <label class="form-label">Text:</label>
                <textarea class="form-control" v-model="article.text"></textarea>
            </div>
        </div>
        <p v-if="error" style="color:red" class="mt-2">{{ error }}</p>
        <button class="btn btn-primary mt-4" @click="updateArticle">Update</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: 'articles-edit',
        computed: {
            ...mapGetters({
                token: 'auth/token',
                teams: 'dashboard/myTeams',
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
                error: null,
            }
        },
        async created() {
            this.isLoading = true;
            await this.$store.dispatch('dashboard/getMyTeams', this.token);
            await this.$store.dispatch('dashboard/getArticles', this.token);
            console.log(this.articles);
            this.isLoading = false;
        },
        methods: {
            async updateArticle() {
                try {
                    this.loading = true;
                    if (this.isArticleValid()) {
                        await this.$store.dispatch('dashboard/updateArticle', { article: this.article, token: this.token });
                        alert('Article updated!');
                        await this.$router.push({ path: '/dashboard' })
                    }
                } catch (e) {
                    this.error = e;
                } finally {
                    this.loading = false;
                }
            },
            isArticleValid() {
                if (this.article.team_id == null) {
                    this.error = 'Article team_id cannot be empty';
                    return false;
                }

                if (this.article.title == null || this.article.title.length == 0) {
                    this.error = 'Article title cannot be empty';
                    return false;
                }

                if (this.article.text == null || this.article.text.length == 0) {
                    this.error = 'Article text cannot be empty';
                    return false;
                }

                return true;
            }
        }
    }
</script>