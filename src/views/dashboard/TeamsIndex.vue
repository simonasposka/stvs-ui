<template>
  <div>
    <h1 class="mt-5 mb-0">Teams</h1>
    <button class="btn btn-primary btn-sm my-3" @click="createNewTeam()">Create New</button>
    
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
        <tr v-for="team in myTeams" :key="team.id">
          <td>
            <router-link :to="{ path: `/dashboard/teams/${team.id}` }" class="nav-link">
              {{ team.id }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/teams/${team.id}` }" class="nav-link">
              {{ team.title }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/teams/${team.id}` }" class="nav-link">
              {{ team.text }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ path: `/dashboard/teams/${team.id}/edit` }" v-if="(profile.is_admin == true || profile.id == team.user_id)">edit</router-link> <span style="color: red" class="cursor-pointer" @click="deleteTeam(team.id)" v-if="(profile.is_admin == true || team.user_id == profile.id)">delete</span>
          </td>
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
  name: 'teams-index',
  computed: {
    ...mapGetters({
      token: 'auth/token',
      profile: 'auth/user',
      myTeams: 'dashboard/myTeams',
    })
  },
  data() {
    return {
      loading: false,
      error: false,
      deleteTeamId: null,
    }
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch('dashboard/getMyTeams', this.token);
    console.log(this.myTeams);
    this.loading = false;
  },
  methods: {
    async createNewTeam() {
      await this.$router.push({ path: '/dashboard/teams/create' })
    },
    formatDate(datetime) {
      return moment(datetime).format('h:mm a, MMM. D, YYYY');
    },
    deleteTeam(teamId) {
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
    async confirmDelete(teamId) {
      this.loading = true;
      await this.$store.dispatch('dashboard/deleteTeam', { id: teamId, token: this.token });
      await this.$store.dispatch('dashboard/getMyTeams', this.token);
      this.loading = false;
    }
  }
}
</script>