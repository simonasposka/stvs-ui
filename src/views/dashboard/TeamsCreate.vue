<template>
  <div>
    <h1 class="mt-5">New Team</h1>
    <div class="form-control mt-3">
      <div class="mb-3">
        <label class="form-label">Title:</label>
        <input type="text" class="form-control" v-model="team.title">
      </div>

      <div class="mb-3">
        <label class="form-label">Description:</label>
        <input type="text" class="form-control" v-model="team.description">
      </div>

      <button class="mt-2 btn btn-primary" @click="createTeam()">Create</button>
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
    }),
   
  },
  data() {
    return {
      isLoading: false,
      error: null,
      team: {
        title: null,
        description: null
      }
    }
  },
  methods: {
    async createTeam() {
      try {
        this.isLoading = true;
        if (this.isTeamValid()) {
          await this.$store.dispatch('dashboard/createTeam', { team: this.team, token: this.token });
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