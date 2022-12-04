<template>
    <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-lg-8 offset-lg-2" v-if="(team != null)">
            <h3 class="mt-5">Team: {{ team.id }}</h3>
            <p class="mb-0"><strong>Title:</strong> {{ team.title }}</p>
            <p class="mb-0"><strong>Description:</strong> {{ team.description }}</p>
          </div>          
        </div>

        <div class="row">
          <div class="col-12 col-lg-8 offset-lg-2">
              <h3 class="mt-5">Users</h3>
              <button v-if="(profile.is_admin == true)" class="btn btn-primary btn-sm my-3" @click="addUserToTeam()">Add To Team</button>

              <p v-if="(users == null)">loading...</p>
              <table class="table" v-else>
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <router-link :to="{ path: `/dashboard/teams/${id}/users/${user.id}/data` }" v-if="(profile.is_admin == true || profile.id == user.id)">
                        view
                      </router-link>
                    
                      <span v-if="(profile.is_admin == true && profile.id != user.id)" style="color: red" class="cursor-pointer" @click="deleteUserFromTeam(user)">remove</span>
                    
                    </td>
                  </tr>
                </tbody>
              </table>

          </div>
        </div>

        <div class="row">
          <div class="col-12 col-lg-8 offset-lg-2">
              <h3 class="mt-5">Articles</h3>
              <p v-if="(articles == null)">loading...</p>
              <table class="table" v-else>
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
                    <td>{{ article.id }}</td>
                    <td>{{ article.title }}</td>
                    <td>{{ article.text.substring(0, 70) + "..." }}</td>
                    <td>{{ formatDate(article.created_at) }}</td>
                    <td>
                      <router-link :to="{ path: `/dashboard/articles/${article.id}` }" v-if="(profile.is_admin == true || article.user_id == profile.id)">
                        view
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>

          </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'teams-show',
  computed: {
    ...mapGetters({
      profile: 'auth/user',
      token: 'auth/token',
      myTeams: 'dashboard/myTeams' 
    }),
    id() {
      return parseInt(this.$route.params.id);
    },
    team() {
      if (this.myTeams == null) return null;
      return this.myTeams.filter(team => team.id === this.id)[0];
    }
  },
  data() {
    return {
      users: null,
      articles: null,
      isLoading: false,
      deleteTeamId: null,
    }
  },
  async created() {
    if (this.myTeams == null) {
      this.isLoading = true;
      await this.$store.dispatch('dashboard/getMyTeams', this.token);
      this.isLoading = false;
    }

    this.users = await this.$store.dispatch('dashboard/getTeamUsers', {id: this.id, token: this.token});
    this.articles = await this.$store.dispatch('dashboard/getTeamArticles', {id: this.id, token: this.token});
  },
  methods: {
    async addUserToTeam() {
      await this.$router.push({ path: `/dashboard/teams/${this.id}/users/add` });
    },
    formatDate(datetime) {
      return moment(datetime).format('h:mm a, MMM. D, YYYY');
    },
    deleteArticle(teamId) {
      this.deleteTeamId = teamId;
      
      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: 'Action cannot be undone',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.deleteTeamId = null;
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Confirm',
            handler: () => {
              this.confirmDelete(teamId)
              this.$modal.hide('dialog')
            }
          },
        ]
      });
    },
    deleteUserFromTeam(user) {
      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: `User ${user.name} will be removed from the team`,
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
              this.confirmRemoveUserFromTeam(user.id)
              this.$modal.hide('dialog')
            }
          },
        ]
      });
    },
    async confirmRemoveUserFromTeam(userId) {
      await this.$store.dispatch('dashboard/removeUserFromTeam', { userId, teamId: this.id, token: this.token });
      this.users = await this.$store.dispatch('dashboard/getTeamUsers', {id: this.id, token: this.token});
    },
    async confirmDelete(teamId) {
      this.isLoading = true;
      await this.$store.dispatch('dashboard/deleteTeam', { id: teamId, token: this.token });
      await this.$router.push({ path: '/dashboard/' });
      this.isLoading = false;
    }
  },
}
</script>