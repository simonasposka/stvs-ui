<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-6 offset-lg-3" v-if="article">
                <img :src="article.thumbnail" class="img-fluid">
                <p class="text-center mb-1 mt-2">
                    <small>{{article.created_at.substring(0, 10)}}</small> <br>
                    <small>by: {{article.user.name}}</small>
                </p>
                <h3>{{article.title}}</h3>
                <p>{{article.text}}</p>
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
                articles: 'articles/articles' 
            }),
            id() {
                return parseInt(this.$route.params.id);
            },
            article() {
                return this.articles.filter(article => article.id === this.id)[0];
            }
        },
    }
</script>