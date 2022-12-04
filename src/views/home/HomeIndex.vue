<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h1>Become a publisher</h1>
        <router-link :to="{ path: '/auth/register' }" class="d-inline-block my-3">
          <button class="btn btn-lg btn-primary">Join</button>
        </router-link>
        <p>Already have an account? <router-link :to="{ path: '/auth/login' }">Log in</router-link></p>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12 mb-4 text-center">
        <h1>Featured Articles:</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4" v-for="article in articles" :key="article.id">
          <img :src="article.thumbnail" class="img-fluid">
          <router-link :to="{ path: `/articles/${article.id}` }">
            <h3>{{article.title}}</h3>
          </router-link>
          <p>{{article.text.substring(0, 150)}}...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import WButton from '@/components/Buttons/WButton';
// import NewslettersCarousel from '@/components/Carousels/Home/NewslettersCarousel';
// import TestimonialsCarousel from '@/components/Carousels/Home/TestimonialsCarousel';
// import WFooter from '@/components/Footers/Home/WFooter';

export default {
  name: 'home-index',
   computed: {
    ...mapGetters({
      articles: 'articles/articles',
    })
  },
//   components: { WButton, NewslettersCarousel, TestimonialsCarousel, WFooter },
}
</script>

<!--<style lang="scss" scoped> 
@import "../../sass/views/home-index";
</style>-->