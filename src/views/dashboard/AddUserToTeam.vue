<template>
	<div class="row">
		<div class="col-12 col-lg-8 offset-lg-2">
			<h1 class="mt-5 mb-0">Add user to team: {{ team == null ? 'loading' : team.id }}</h1>
			<div class="mt-4">
				<select v-model="user" class="form-control">
					<option :value="null">Please select user</option>
					<option v-if="(users == null)" :value="-1">loading...</option>
					<option v-else v-for="user in users" :key="user.id" :value="user.id">{{ user.id }}. {{ user.name }}({{ user.email }})</option>
				</select>
				<button class="btn btn-primary mt-3" v-if="!loadingAdd" @click="add">Add</button>
				<p v-if="loadingAdd">loading...</p>
				<p v-if="error" class="mt-2" style="color: red">{{ error }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'add-user-to-team',
	computed: {
		...mapGetters({
			token: 'auth/token',
			myTeams: 'dashboard/myTeams',
			users: 'dashboard/users'
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
      isLoading: false,
			user: null,
			loadingAdd: false,
			error: null
    }
  },
	async created() {
    if (this.myTeams == null) {
      this.isLoading = true;
      await this.$store.dispatch('dashboard/getMyTeams', this.token);
      this.isLoading = false;
    }

		if (this.users == null) {
      this.isLoading = true;
      await this.$store.dispatch('dashboard/getUsers', this.token);
      this.isLoading = false;
		}
  },
	methods: {
		async add() {
			try {
				this.error = null;
				if (this.user == null) {
					this.error = 'Please select user';
					return;
				}

				this.loadingAdd = true;
				await this.$store.dispatch('dashboard/addUserToTeam', { teamId: this.id, userId: this.user, token: this.token })
				await this.$router.push({ path: `/dashboard/teams/${this.id}` })
			} catch (e) {
				this.error = e.message;
			} finally {
				this.loadingAdd = false;
			}
		}
	}
}
</script>