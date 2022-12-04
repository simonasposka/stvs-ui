<template>
    <div>
        <h1 class="mt-5">New Article</h1>
        
        <div class="form-control mt-3">
            <div class="mb-3">
                <label class="form-label">Thumbnail URL:</label>
                <input type="text" class="form-control" v-model="article.thumbnail">
            </div>

            <div class="mb-3">
                <label class="form-label">Team:</label>

                <p v-if="isLoading">Loading...</p>

                <select v-model="article.team_id" class="form-control">
                    <option :value="null">Please select a team</option>
                    <option v-if="isLoading" :value="null">loading...</option>
                    <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.title }}</option>
                </select>
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
        <button class="btn btn-primary mt-4" @click="createArticle">Create</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: 'articles-create',
        computed: {
            ...mapGetters({
                token: 'auth/token',
                teams: 'dashboard/myTeams'
            }),
        },
        data() {
            return {
                isLoading: false,
                error: null,
                article: {
                    thumbnail: 'https://cdn.dribbble.com/users/1215894/screenshots/3654697/dribbble-matthew-beasley-72.jpg',
                    title: '',
                    text: '',
                    team_id: null
                }
            }
        },
        async created() {
            this.isLoading = true;
            await this.$store.dispatch('dashboard/getMyTeams', this.token);
            this.isLoading = false;
        },
        methods: {
            resetArticle() {
              this.article = {
                    thumbnail: 'https://cdn.dribbble.com/users/1215894/screenshots/3654697/dribbble-matthew-beasley-72.jpg',
                    title: '',
                    text: '',
                    team_id: null
                };
            },
            async createArticle() {
                try {
                    this.loading = true;
                    if (this.isArticleValid()) {
                        await this.$store.dispatch('dashboard/createArticle', { article: this.article, token: this.token });
                        this.resetArticle();
                        this.error = null;
                        await this.$router.push({path: '/dashboard/' });
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