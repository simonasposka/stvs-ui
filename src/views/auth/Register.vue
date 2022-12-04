<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-6 offset-lg-3">
        <h1>Register</h1>
        <p v-if="loading" class="text-center">loading...</p>

        <div class="mb-3">
          <label class="form-label">Name:</label>
          <input type="text" class="form-control" v-model="user.name" required autofocus>
        </div>

        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input type="email" class="form-control" v-model="user.email" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Password:</label>
          <input type="password" class="form-control" v-model="user.password" required>
        </div>

        <button class="btn btn-primary" @click="register">Register</button>
        <p v-if="error" style="color:red" class="mt-2">{{ error }}</p>
        <p>Already have an account? <router-link :to="{ path: '/auth/login' }">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'register',

  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null
      },
      loading: false,
      error: null
    }
  },

  methods: {
    async register() {
      this.error = null;
      this.loading = true;

      try {
        await this.$store.dispatch('auth/register', this.user);
        alert('Account created! Log in');
        this.user = { name: null, email: null, password: null };
      } catch (error) {
        console.log(error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
