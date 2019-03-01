<template>
  <div>
    <div class="sidebar"><sidebar /></div>
    <div><AcademicProgress /></div>
  </div>
</template>

<script>
import AcademicProgress from "@/components/AcademicProgress.vue";
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "profile_page",
  components: {
    AcademicProgress,
    sidebar
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #ffffff;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 20%;
  float: left;
}
</style>
