<template>
  <div id="app">
  <div class = "header">
    <page-header />
  </div>
    <div id="nav">
      <router-link
        v-if="authenticated"
        to="/login"
        v-on:click.native="logout();"
        replace
        >Logout</router-link
      >
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
import PageHeader from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    PageHeader
  },
  data() {
    return {
      authenticated: false,
      mockAccount: {
        username: "admin",
        password: "password"
      }
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    }
  }
};
</script>

<style>
#app {
  margin: auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}
#header {
  color: #2c3e50;
}
</style>
