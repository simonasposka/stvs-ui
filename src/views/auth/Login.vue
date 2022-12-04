<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-6 offset-lg-3">
        <h1>Login</h1>
        <pre>
          email: admin@gmail.com
          password: password
          --------------------
          email: simple@gmail.com
          password: password
        </pre>
        <p v-if="loading">loading...</p>

        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input type="email" class="form-control" v-model="user.email">
        </div>

        <div class="mb-3">
          <label class="form-label">Password:</label>
          <input type="password" class="form-control" v-model="user.password">
        </div>

        <button class="btn btn-primary" @click="login">Login</button>
        <p v-if="error" style="color:red" class="mt-2">{{ error }}</p>
        <p>Don't have an account? <router-link :to="{ path: '/auth/register' }">Register</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',

  data() {
    return {
      user: {
        email: null,
        password: null
      },
      loading: false,
      error: null
    }
  },

  methods: {
    async login() {
      this.error = null;

      try {
        if (this.user.email != null && this.user.password != null) {
          await this.$store.dispatch('auth/login', this.user);
          window.location.reload();
        } else {
          this.error = 'Email & password required!';
        }
      } catch (error) {
        if (error.status == '404') {
          this.error = 'User not found';
        } else {
          this.error = error.error;
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
