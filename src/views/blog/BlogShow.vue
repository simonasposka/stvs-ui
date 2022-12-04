<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-4 offset-lg-4">
                <img :src="blog.thumbnail" class="img-fluid">
                <h3>{{blog.title}}</h3>
                <p>{{blog.description}}</p>
            </div>
        </div>
        <div class="row">
            <h1 class="text-center">Explore Articles:</h1>
        </div>
        <div class="row">
            <div class="col-12 col-md-4 col-lg-3" v-for="article in blog.articles" :key="article.id">
            <img :src="article.thumbnail" class="img-fluid">
            <div v-for="category in article.categories" :key="category.name" class="badge text-bg-secondary me-1">{{category.name}}</div>

            <router-link :to="{ path: `/blogs/${blog.id}/articles/${article.id}` }">
                <h3>{{article.title}}</h3>
            </router-link>
            <p class="text-center">
                <small>{{article.created_at.substring(0, 10)}}</small>
            </p>
            <p>{{article.text.substring(0, 100)}}...</p>
            <small>{{article.comments.length + `${article.comments.length > 1 ? ' comments' : ' comment'}`}}</small>
      </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: 'blog-show',
        computed: {
            ...mapGetters({
               blogs: 'blogs/blogs' 
            }),
            id() {
                return parseInt(this.$route.params.id);
            },
            blog() {
                return this.blogs.filter(blog => blog.id === this.id)[0];
            }
        },
    }
</script>