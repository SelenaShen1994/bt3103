<template>
  <div id="app">
<<<<<<< HEAD
    <img width="25%" src="./assets/logo.png">
    <HelloWorld/>
=======
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
>>>>>>> b5e2234d45c08484783dce7c2da2e9086fa141af
  </div>
</template>

<script>
<<<<<<< HEAD
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
=======
export default {
  name: "App",
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
>>>>>>> b5e2234d45c08484783dce7c2da2e9086fa141af
  }
};
</script>

<style>
<<<<<<< HEAD
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
=======
body {
  background-color: #f0f0f0;
}
h1 {
  padding: 0;
  margin-top: 0;
}
#app {
  width: 1024px;
  margin: auto;
>>>>>>> b5e2234d45c08484783dce7c2da2e9086fa141af
}
</style>
