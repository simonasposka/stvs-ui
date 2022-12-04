<template>
	<div>
    <h1 class="mt-5 mb-0">Users</h1>
		
    <p v-if="(adminUsers == null)">loading...</p>
    <table class="table" v-if="(adminUsers != null && adminUsers.length > 0)">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in adminUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <router-link :to="{ path: `/dashboard/users/${user.id}` }">view</router-link> <span style="color: red" class="cursor-pointer" @click="deleteUser(user)">delete</span>
          </td>
        </tr>
      </tbody>
    </table>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'users-index',
	computed: {
		...mapGetters({
			token: 'auth/token',
      adminUsers: 'dashboard/adminUsers',
		}),
  },
  async created() {
    await this.$store.dispatch('dashboard/getAllUsers', this.token);
  },
  methods: {
    deleteUser(user) {
      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: 'Action cannot be undone',
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
              this.confirmDelete(user.id)
              this.$modal.hide('dialog')
            }
          },
        ]
      });
    },
    async confirmDelete(userId) {
      await this.$store.dispatch('dashboard/deleteUser', { userId, token: this.token });
      await this.$store.dispatch('dashboard/getAllUsers', this.token);
      await this.router.push({ path: '/dashboard/users' });
    }
  }
}
</script>