<template>
  <div id="app">
  <div class = "header">
    <page-header />
  </div>
    <div id="nav">
      <router-link
        v-if="authenticated"
        to="/login"
        v-on:click.native="Logout();"
        replace
        >Logout</router-link
      >
    </div>
    <div class="quotes" v-show="logout">
      <img src=./assets/quotes.jpg width=100% height=100% />
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
      logout:false,
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
    Logout() {
      this.authenticated = false;
      this.logout = true;
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
