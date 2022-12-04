<template>
  <div>
    <h1 class="mt-5">Edit Team</h1>
    <div class="form-control mt-3" v-if="(team != null)">
      <div class="mb-3">
        <label class="form-label">Title:</label>
        <input type="text" class="form-control" v-model="team.title">
      </div>

      <div class="mb-3">
        <label class="form-label">Description:</label>
        <input type="text" class="form-control" v-model="team.description">
      </div>

      <button class="mt-2 btn btn-primary" @click="updateTeam()">Update</button>
      <p class="mt-2" v-if="error" style="color:red">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'teams-create',
  computed: {
    ...mapGetters({
      token: 'auth/token',
      teams: 'dashboard/myTeams',
    }),
    id() {
      return parseInt(this.$route.params.id);
    },
    team() {
      if (this.teams == null) return null;
      return this.teams.filter(team => team.id === this.id)[0];
    }
  },
  data() {
    return {
      isLoading: false,
      error: null,
    }
  },
  async created() {
    if (this.teams == null) {
      this.isLoading = true;
      await this.$store.dispatch('dashboard/getMyTeams', this.token);
      this.isLoading = false;
    }
  },
  methods: {
    async updateTeam() {
      try {
        this.isLoading = true;
        if (this.isTeamValid()) {
          await this.$store.dispatch('dashboard/updateTeam', { team: this.team, token: this.token });
          this.$store.dispatch('dashboard/getMyTeams', this.token);
          await this.$router.push({ path: `/dashboard/teams` });
        }
      } catch (e) {
        this.error = e.message;
      } finally {
        this.isLoading = false;
      }
    },
    isTeamValid() {
      if (this.team.title == null || this.team.title.length == 0) {
        this.error = 'Title is required';
        return false;
      }

      return true;
    }
  }
}
</script>