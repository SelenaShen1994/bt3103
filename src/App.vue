<template>
  <div id="app">
    <!-- <img width="25%" src="./assets/logo.png"> -->
    <PersonalInfo /> <AcademicProgress />
  </div>
</template>

<script>
import PersonalInfo from "./components/PersonalInfo.vue";
import AcademicProgress from "./components/AcademicProgress.vue";

export default {
  name: "App",
  components: {
    PersonalInfo,
    AcademicProgress
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
