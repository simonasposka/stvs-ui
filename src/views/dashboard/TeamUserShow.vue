<template>
    <div>
        <h1 class="mt-5 mb-0">User: {{ userId }} articles for team: {{ id }}</h1>
        <p v-if="(articles != null && articles.length == 0)">No articles</p>
        
        <table v-if="(articles != null && articles.length > 0)" class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Snippet</th>
              <th scope="col">Date</th>
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
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'team-user-show',
  computed: {
    ...mapGetters({
      token: 'auth/token',
    }),
    id() {
      return parseInt(this.$route.params.id);
    },
    userId() {
        return parseInt(this.$route.params.userId);
    }
  },
  data() {
    return {
        articles: null
    }
  },
  async created() {
    this.articles = await this.$store.dispatch('dashboard/getUserDataPerTeam', { teamId: this.id, userId: this.userId, token: this.token });
  },
  methods: {
    formatDate(datetime) {
      return moment(datetime).format('h:mm a, MMM. D, YYYY');
    },
  }
}
</script>