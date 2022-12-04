<template>
	<div class="container mt-5">
    <p v-if="(user == null)">loading...</p>
    <div v-else>
      <h3 class="mt-5">Teams</h3>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in user.teams" :key="team.id">
            <td>
                {{ team.id }}
            </td>
            <td>
                {{ team.title }}
            </td>
            <td>
                {{ team.text }}
            </td>
            <td>
              <router-link :to="{ path: `/dashboard/teams/${team.id}` }">view</router-link> <span style="color: red" class="cursor-pointer" @click="removeFromTeam(team.id)">remove</span>
            </td>
          </tr>
        </tbody>
      </table>



      <h3 class="mt-5">Articles</h3>
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
          <tr v-for="article in user.articles" :key="article.id">
            <td>{{ article.id }}</td>
            <td>{{ article.title }}</td>
            <td>{{ article.text.substring(0, 70) + "..." }}</td>
            <td>{{ formatDate(article.created_at) }}</td>
            <td>
              <router-link :to="{ path: `/dashboard/articles/${article.id}` }">
                view
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
	</div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
	name: 'users-index',
	computed: {
		...mapGetters({
			token: 'auth/token',
		}),
    id() {
      return parseInt(this.$route.params.id);
    },
  },
  data() {
    return {
      isLoading: false,
      user: null,
    }
  },
  async created() {
    this.isLoading = true;
    this.user = await this.$store.dispatch('dashboard/getUser', { userId: this.id, token: this.token });
    this.isLoading = false;
  },
  methods: {
    formatDate(datetime) {
      return moment(datetime).format('h:mm a, MMM. D, YYYY');
    },
    removeFromTeam(teamId) {
      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: `User will be removed from the team`,
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Confirm',
            handler: () => {
              this.confirmRemoveUserFromTeam(teamId)
              this.$modal.hide('dialog')
            }
          },
        ]
      });
    },
    async confirmRemoveUserFromTeam(teamId) {
      await this.$store.dispatch('dashboard/removeUserFromTeam', { userId: this.id, teamId: teamId, token: this.token });
      //await this.$router.push({ path: '/admin/users' });
      window.location.reload();
    },
  }
}
</script>